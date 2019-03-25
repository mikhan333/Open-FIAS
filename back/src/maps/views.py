from .external_api.maps_api import suggester, rev_geocoder, geocoder, check_addr
from .external_api.osm_api import create_note, create_object
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.core.serializers import serialize
from .models import Object
from django import forms
import json


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
        return HttpResponse(True)
    return HttpResponseBadRequest('Wrong request data - should be session')


@csrf_exempt
def get_list_last_points(request):
    points = Object.objects.all().filt_del(request.user).order_by("-created")[:10]
    data = {'points': serialize('json', points)}
    return JsonResponse(data)


@csrf_exempt
def get_list_points(request):
    points = Object.objects.all().filt_del(request.user)
    data = {'points': serialize('json', points)}
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
