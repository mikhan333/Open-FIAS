import json
from .models import Object
from django import forms
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import Http404
import requests
from django.conf import settings
from django.http import JsonResponse


# Authorization on front
# <a href="{% url "social:begin" "google-oauth2" %}">Google+</a>
# <a href="/login/vk-oauth2"><img src="/static/lvk.png" class="avatar-3" data-toggle="tooltip" title="{% trans 'Login via VKontakte' %}"></a>


@csrf_exempt
def create_new_object(request):
    """Create new object; send to DB and OSM"""
    if request.method == 'POST':
        data = json.loads(request.body)
        form = ObjectForm(data=data)
        if form.is_valid():
            send_to_osm(form)

    else:
        return Http404('Wrong request method')


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


@csrf_exempt
def get_list_suggest(request):
    """Do request to suggest"""
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['name']

        rank = 4
        if data['rank']:
            rank = data['rank']

        url = '{}fias?'.format(getattr(settings, 'FIAS_URL_SUGGEST')) + \
              'api_key={}'.format(getattr(settings, 'FIAS_API_KEY')) + \
              '&format=geojson' + \
              '&rank={}&q='.format(rank) + \
              '%20'.join(name.replace(',', ' ').split())

        response = requests.get(url)
        data_json = response.features.properties

        return JsonResponse(data_json)

    else:
        return Http404('Wrong request method')
