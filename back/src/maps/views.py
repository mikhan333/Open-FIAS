import requests
import re
import xml.etree.ElementTree as ET
import json
from urllib import parse

from .models import Object
from django import forms
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods


@csrf_exempt
@require_http_methods("POST")
def create_note(request):
    try:
        data = json.loads(request.body)
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

    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_CREATE_NOTE'),
        {
            'lat': lat,
            'lon': lon,
            'text': address_obj['address'],
        }
    )
    response = requests.post(url)
    if not response.ok:
        HttpResponseBadRequest(f'Wrong send data to OSM - {response.status_code}')
    else:
        data_json = {'status_osm': response.status_code}
        root = ET.fromstring(response.content)
        for child in root[0]:
            if child.tag != 'comments':
                data_json[str(child.tag)] = child.text

        if send_db(lat, lon, address_obj) is False:
            HttpResponseBadRequest('Wrong send data to DB - 405')
        else:
            data_json = {'status_db': 200}
            return JsonResponse(data_json)


@csrf_exempt
def create_object(request):  # TODO for auth users
    pass


def send_osm(data):
    pass


def send_db(lat, lon, address_obj):  # TODO for auth users
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
        object_new.save()
        return True
    return False


def check_addr(data):  # TODO check addresses via local DB FIAS
    data_json = suggester(data)
    addresses = data_json['results']
    return addresses[0]


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


def suggester(data):
    address = 'россия москва'
    if 'address' in data:
        address = data['address']
    mas = re.findall(r"[\w']+", address.lower())

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_SUGGEST'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'format': 'json',
            'q': ' '.join(mas),
        }
    )
    response = requests.get(url)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


@csrf_exempt
@require_http_methods("GET")
def get_geocoder(request):
    data_json = geocoder(request.GET)
    return JsonResponse(data_json)


def geocoder(data):
    address = 'россия москва'
    if 'address' in data:
        address = data['address']
    mas = re.findall(r"[\w']+", address)

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_GEOCODER'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'q': ' '.join(mas),
        }
    )
    response = requests.get(url)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


@csrf_exempt
@require_http_methods("GET")
def get_rev_geocoder(request):
    data_json = rev_geocoder(request.GET)
    return JsonResponse(data_json)


def rev_geocoder(data):
    lat = '55'
    lon = '37'
    if 'lat' and 'lon' in data:
        lat = data['lat']
        lon = data['lon']

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_REV_GEOCODER'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'q': f'{lat},{lon}',
        }
    )
    response = requests.get(url)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


def build_url(baseurl, path, args_dict=None):
    dirty_url = parse.urljoin(baseurl + "/", path)
    url_parts = list(parse.urlparse(dirty_url))
    if args_dict:
        url_parts[4] = parse.urlencode(args_dict)
    return parse.urlunparse(url_parts)
