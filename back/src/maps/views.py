import json
import requests
import re
import xml.etree.ElementTree as ET
from urllib import parse
from jsonrpc import jsonrpc_method

from .models import Object
from django import forms
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import JsonResponse, HttpResponseNotFound, HttpResponse


@csrf_exempt
def create_note(request):
    if request.method == 'POST':
        data = request.POST

        if 'lat' and 'lon' and 'address' in data:
            lat = float(data['lat'])
            lon = float(data['lon'])
        else:
            return HttpResponseNotFound('Wrong request method')

        address_obj = check_addr(data)
        if address_obj is None:
            return JsonResponse({'error': 'wrong address'})

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
            data_json = {
                'error': response.status_code
            }
        else:
            root = ET.fromstring(response.content)
            data_json = {
                'status_code': response.status_code,
            }

            for child in root[0]:
                if child.tag != 'comments':
                    data_json[str(child.tag)] = child.text

            data_json['status_db'] = send_db(lat, lon, address_obj)

        return JsonResponse(data_json)

    else:
        return HttpResponseNotFound('Wrong request method')


@csrf_exempt
def create_object(request):  # TODO for auth users
    pass


@jsonrpc_method('api.send_osm')
def send_osm(data):
    pass


@jsonrpc_method('api.send_db')
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
        return 'success'

    return 'error'


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
def get_suggest(request):
    if request.method == 'GET':
        data_json = suggester(request.GET)

        return JsonResponse(data_json)

    else:
        return HttpResponseNotFound('Wrong request method')


@jsonrpc_method('api.suggester')
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

    data_json = response.json()

    return data_json


@csrf_exempt
def get_geocoder(request):
    if request.method == 'GET':
        data_json = geocoder(request.GET)

        return JsonResponse(data_json)

    else:
        return HttpResponseNotFound('Wrong request method')


@jsonrpc_method('api.geocoder')
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

    data_json = response.json()

    return data_json


@csrf_exempt
def get_rev_geocoder(request):
    if request.method == 'GET':
        data_json = rev_geocoder(request.GET)

        return JsonResponse(data_json)

    else:
        return HttpResponseNotFound('Wrong request method')


@jsonrpc_method('api.rev_geocoder')
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

    data_json = response.json()

    return data_json


@jsonrpc_method('api.build_url')
def build_url(baseurl, path, args_dict=None):
    dirty_url = parse.urljoin(baseurl + "/", path)
    url_parts = list(parse.urlparse(dirty_url))
    if args_dict:
        url_parts[4] = parse.urlencode(args_dict)
    return parse.urlunparse(url_parts)
