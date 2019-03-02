import json
import requests
import re

from .models import Object
from django import forms
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import JsonResponse, HttpResponseNotFound, HttpResponse
from jsonrpc import jsonrpc_method
from django.core.serializers import serialize

import xml.etree.ElementTree as ET


# Authorization on front
# <a href="{% url "social:begin" "google-oauth2" %}">Google+</a>
# <a href="/login/vk-oauth2"><img src="/static/lvk.png" class="avatar-3" data-toggle="tooltip" title="{% trans 'Login via VKontakte' %}"></a>


@csrf_exempt
def create_note(request):
    """Create new object; send to DB and OSM"""
    if request.method == 'GET':
        data = request.GET

        if 'lat' and 'lon' and 'text' in data:
            lat = data['lat']
            lon = data['lon']
            text = data['text']
        else:
            return HttpResponseNotFound('Wrong request method')

        url = 'https://api.openstreetmap.org/api/0.6/notes?' + \
              'lat={}&lon={}&'.format(lat, lon) + \
              'text={}'.format(text)

        response = requests.post(url)
        if response.status_code != 200:
            data_json = {'error': response.status_code}
        else:
            root = ET.fromstring(response.content)
            data_json = {
                'status_code': response.status_code,
            }

            for child in root[0]:
                if child.tag != 'comments':
                    data_json['%s' % child.tag] = child.text

        return JsonResponse(data_json)

    else:
        return HttpResponseNotFound('Wrong request method')


@csrf_exempt
def create_new_object(request):
    """Create new note"""
    if request.method == 'POST':
        data = json.loads(request.body)
        data_json = suggester(data)

        if data_json['features'][1]:
            return HttpResponseNotFound('Wrong request method')

        data = data_json['features'][0]
        form = ObjectForm(data=data)
        if form.is_valid():
            pass
            # send_to_osm(form)

    else:
        return HttpResponseNotFound('Wrong request method')


def send_to_osm(form):
    """Do request to OSM"""
    url = 'https://www.openstreetmap.org/api/0.6/changeset/create'
    headers = {
        'Connection': 'close',
        'Content-Type': 'text/xml',
        'Authorization': 'OAuth oauth_token="GMoVMoGglKOeMdsjK3QZY1a6d285OvN4Q4kzX4xz"'
    }
    data = '<osm>' \
           '<changeset version="0.6" generator="iD">' \
           '<tag k="comment" v="newlol"/><tag k="created_by" v="iD 2.14.3"/>' \
           '<tag k="host" v="https://www.openstreetmap.org/edit"/>' \
           '<tag k="locale" v="en-GB"/>' \
           '<tag k="imagery_used" v="Bing aerial imagery"/>' \
           '<tag k="changesets_count" v="5"/>' \
           '</changeset>' \
           '</osm>'
    res = requests.put(url, data=data, headers=headers)
    print(res.text)


class ObjectForm(forms.ModelForm):
    """Form for Object"""

    class Meta:
        """Settings"""
        model = Object
        fields = (
            'country',
            'region',
            'subregion',
            'locality',
            'suburb',
            'street',
            'building'
        )


@jsonrpc_method('api.get_suggest')
@csrf_exempt
def get_suggest(request):
    """Do request to suggest"""
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

    # rank = 4
    # if 'rank' in data:
    #     rank = data['rank']

    url = '{}?'.format(getattr(settings, 'FIAS_URL_SUGGEST')) + \
          'api_key={}'.format(getattr(settings, 'FIAS_API_KEY')) + \
          '&format=json' + \
          '&q=' + \
          '%20'.join(mas)
    # '&rank={}&q='.format(rank) + \

    response = requests.get(url)
    if response.status_code != 200:
        return {'error': response.status_code}

    data_json = response.json()

    return data_json


@jsonrpc_method('api.get_geocoder')
@csrf_exempt
def get_geocoder(request):
    """Do request to suggest"""
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

    url = '{}?'.format(getattr(settings, 'FIAS_URL_GEOCODER')) + \
          'api_key={}'.format(getattr(settings, 'FIAS_API_KEY')) + \
          '&q=' + \
          '%20'.join(mas)

    response = requests.get(url)
    if response.status_code != 200:
        return {'error': response.status_code}

    data_json = response.json()

    return data_json


@jsonrpc_method('api.get_rev_geocoder')
@csrf_exempt
def get_rev_geocoder(request):
    """Do request to suggest"""
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

    url = '{}?'.format(getattr(settings, 'FIAS_URL_REV_GEOCODER')) + \
          'api_key={}'.format(getattr(settings, 'FIAS_API_KEY')) + \
          '&q={},{}'.format(lat, lon)

    response = requests.get(url)
    if response.status_code != 200:
        return {'error': response.status_code}

    data_json = response.json()

    return data_json


@jsonrpc_method('api.hello')
def hello(request, name='Sam'):
    return "Hello %s" % name
