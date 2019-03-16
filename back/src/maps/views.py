import requests
import xml.etree.ElementTree as xml
import json

from .validators import build_url, suggester, rev_geocoder, geocoder, check_addr
from .models import Object
from django import forms
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from requests_oauthlib import OAuth1


@csrf_exempt
@require_http_methods("POST")
def create_point(request):
    try:
        data = (json.loads(request.body))
    except json.decoder.JSONDecodeError:
        return HttpResponseBadRequest('Wrong request count of fields - bad fields')
    if data.get('address') is None:
        return HttpResponseBadRequest('Wrong request count of fields - address')
    try:
        lat = float(data['lat'])
        lon = float(data['lon'])
    except KeyError:
        return HttpResponseBadRequest('Wrong request count of fields - lat, lon')
    except ValueError:
        return HttpResponseBadRequest('Wrong request types of data')

    address_obj = check_addr(data)
    if address_obj is None:
        return HttpResponseBadRequest('Wrong request address')

    user = request.user
    if user.is_authenticated:
        data = create_object(lat, lon, address_obj, user)
    else:
        data = create_note(lat, lon, address_obj)
    if data['status_osm'] is False:
        return HttpResponseBadRequest('Wrong request data - osm')
    data['status_db'] = send_db(lat, lon, address_obj, user)
    if data['status_db'] is False:
        return HttpResponseBadRequest('Wrong request data - db')
    return JsonResponse(data)


def create_note(lat, lon, address_obj):
    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_NOTE'),
        {
            'lat': lat,
            'lon': lon,
            'text': address_obj['address'],
        }
    )
    response = requests.post(url)
    if not response.ok:
        return {'status_osm': False}
    data_json = {'status_osm': True}
    root = xml.fromstring(response.content)
    data_json['info'] = {}
    for child in root[0]:
        if child.tag != 'comments':
            data_json['info'][str(child.tag)] = child.text
    return data_json


def create_object(lat, lon, address_obj, user):
    extra_data = user.social_auth.get(provider='openstreetmap').extra_data
    access_token = extra_data['access_token']
    address = address_obj['address_details']
    auth = OAuth1(
        getattr(settings, 'SOCIAL_AUTH_OPENSTREETMAP_KEY'),
        getattr(settings, 'SOCIAL_AUTH_OPENSTREETMAP_SECRET'),
        access_token['oauth_token'],
        access_token['oauth_token_secret']
    )

    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_OBJECT_CREATE'),
    )
    data = '<osm>' \
           '<changeset version="0.6" generator="iD">' \
           '<tag k="comment" v="SqS"/>' \
           '<tag k="created_by" v="Open-FIAS v.1.0"/>' \
           '<tag k="host" v="https://open-fias.ru"/>' \
           '<tag k="locale" v="ru"/>' \
           '<tag k="changesets_count" v="1"/>' \
           '</changeset>' \
           '</osm>'

    response = requests.put(url, data=data, headers={"Content-Type": "text/xml"}, auth=auth)
    if not response.ok:
        return {'status_osm': False}
    commit_id = int(response.content)

    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_OBJECT_UPLOAD').format(commit_id),
    )
    data = '<osmChange version="0.6" generator="iD">' \
           '<create>' \
           f'<node id="-1" lon="{lon}" lat="{lat}" version="0" changeset="{commit_id}">'
    if 'name' in address_obj:
        data += f"""<tag k="name" v="{address_obj['name']}"/>"""
    if 'building' in address:
        data += f"""<tag k="addr:housenumber" v="{address['building']}"/>"""
    if 'street' in address:
        data += f"""<tag k="addr:street" v="{address['street']}"/>"""
    if 'postalcode' in address_obj:
        data += f"""<tag k="addr:postcode" v="{address_obj['postalcode']}"/>"""
    if 'country' in address:
        data += f"""<tag k="addr:country" v="{address['country']}"/>"""
    data += '</node>' \
            '</create>' \
            '<modify/>' \
            '<delete if-unused="true"/>' \
            '</osmChange>'
    response_info = requests.post(url, data=data.encode('utf-8'), headers={"Content-Type": "text/xml"}, auth=auth)
    if not response_info.ok:
        return {'status_osm': False}

    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_OBJECT_CLOSE').format(commit_id),
    )
    response = requests.put(url, headers={"Content-Type": "text/xml"}, auth=auth)
    if not response.ok:
        return {'status_osm': False}
    data_json = {'status_osm': True}
    root = xml.fromstring(response_info.content)
    data_json['node'] = {}
    for child in root[0].attrib.items():
        data_json['node'][str(child[0])] = int(child[1])
    return data_json


def send_db(lat, lon, address_obj, user):
    address_details = address_obj['address_details']
    form = ObjectForm(data=address_details)
    if form.is_valid():
        object_new = form.save(commit=False)
        object_new.latitude = float(lat)
        object_new.longitude = float(lon)
        if 'rank' in address_obj:
            object_new.rank = int(address_obj['rank'])
        if 'postalcode' in address_obj:
            object_new.postcode = int(address_obj['postalcode'])
        if user.is_authenticated:
            object_new.author = user
        object_new.save()
        return True
    return False


class ObjectForm(forms.ModelForm):
    class Meta:
        """Settings"""
        model = Object
        fields = [
            'name',
            'country',
            'region',
            'subregion',
            'locality',
            'suburb',
            'street',
            'building',
            'rank',
            'postcode',
        ]


@csrf_exempt
@require_http_methods("GET")
def get_suggest(request):
    data_json = suggester(request.GET)
    return JsonResponse(data_json)


@csrf_exempt
@require_http_methods("GET")
def get_geocoder(request):
    data_json = geocoder(request.GET)
    return JsonResponse(data_json)


@csrf_exempt
@require_http_methods("GET")
def get_rev_geocoder(request):
    data_json = rev_geocoder(request.GET)
    return JsonResponse(data_json)
