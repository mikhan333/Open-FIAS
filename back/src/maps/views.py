from .external_api.maps_api import suggester, rev_geocoder, geocoder, check_addr
from .external_api.osm_api import create_note, create_object
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.core.serializers import serialize
from rest_framework import serializers
from .models import Object
from users.models import User
from django.db import models
from django import forms
from cent import Client, CentException
from django.conf import settings
import json
import datetime


@csrf_exempt
@require_http_methods("POST")
def create_point(request):
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

    user = request.user
    point_db_id = send_db(lat, lon, address_obj, user)
    if point_db_id is None:
        return HttpResponseBadRequest('Wrong request data - db')
    data = {'status_db': True}
    if user.is_authenticated:
        data.update(create_object(lat, lon, address_obj, user))
        if not data['status_osm']:
            return HttpResponseBadRequest('Wrong request data - osm - can not create note')
        obj_osm_id = int(data['node']['new_id'])
    else:
        data.update(create_note(lat, lon, address_obj))
        if not data['status_osm']:
            return HttpResponseBadRequest('Wrong request data - osm - can not create object')
        note_osm_id = int(data['info']['id'])
        if request.session.session_key is not None:
            session = request.session
            session['points'].append(point_db_id)
            session.save()
    # TODO unite obj_osm_id with point_db_id

    client = Client(
        getattr(settings, 'CENTRIFUGE_URL'),
        api_key=getattr(settings, 'CENTRIFUGE_APIKEY'),
        timeout=getattr(settings, 'CENTRIFUGE_TIMEOUT'),
    )
    point = get_object_or_404(Object, id=point_db_id)
    dict_point = PointsModelSerializer(point).data
    if point.author is not None:
        dict_point['author'] = point.author.username
    data['status_cent'] = True
    try:
        client.publish("last_points", dict_point)
    except CentException:
        data['status_cent'] = False
    return JsonResponse(data)


def send_db(lat, lon, address_obj, user):
    address_details = address_obj['address_details']
    form = ObjectForm(data=address_details)
    if form.is_valid():
        object_new = form.save(commit=False)
        object_new.latitude = lat
        object_new.longitude = lon
        if 'rank' in address_obj:
            object_new.rank = int(address_obj['rank'])
        if 'postalcode' in address_obj:
            object_new.postcode = int(address_obj['postalcode'])
        if user.is_authenticated:
            object_new.author = user
        object_new.save()
        return object_new.id
    return None


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
@login_required
@require_http_methods("POST")
def add_points_from_cookie(request):
    if request.session.session_key is not None:
        session = request.session
        if 'points' not in session:
            return HttpResponseBadRequest('Wrong request data - there are no points')
        if len(session['points']) == 0:
            return HttpResponseBadRequest('Wrong request data - there are no points')
        try:
            data = json.loads(request.body)
            points = list(data['points'])
        except (json.decoder.JSONDecodeError, KeyError, ValueError):
            return HttpResponseBadRequest('Wrong request count of fields - bad fields')

        for item in points:
            if 'points' not in session:
                return HttpResponseBadRequest('Wrong request data - should be session')
            if item not in session['points']:
                return HttpResponseBadRequest('Wrong request data - not correct id')
            obj = get_object_or_404(Object, id=item)
            obj.author = request.user
            obj.save()
        del session['points']
        return HttpResponse('OK')
    return HttpResponseBadRequest('Wrong request data - should be session')


class PointsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Object
        fields = "__all__"


@csrf_exempt
def get_list_last_points(request):
    data = {'points': []}
    objects_point = Object.objects.select_related('author')
    points = objects_point.filt_del(request.user).order_by('-created')[:20]
    for point in points:
        dict_point = PointsModelSerializer(point).data
        if point.author is not None:
            dict_point['author'] = point.author.username
        data['points'].append(dict_point)
    return JsonResponse(data)


@csrf_exempt
def get_list_points(request):
    data = {'points': []}
    points = Object.objects.all().filt_del(request.user)
    for point in points:
        dict_point = PointsModelSerializer(point).data
        data['points'].append(dict_point)
    return JsonResponse(data)


@csrf_exempt
def get_statistic(request):
    data = {}
    objects_point = Object.objects.select_related('author')
    data['points_count'] = objects_point.count()

    objects_user = User.objects
    data['users_count'] = objects_user.count()
    users = objects_user.annotate(num_points=models.Count('maps'))
    data['users_top'] = list(users.order_by('-num_points')[:20].values('username'))

    data['points_count_days'] = []
    time_now = datetime.datetime.now()
    for i in range(100):
        data['points_count_days'].append({
            'count': objects_point.filter(created__lte=time_now - datetime.timedelta(days=i)).count(),
            'days': i,
        })
    return JsonResponse(data)


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
