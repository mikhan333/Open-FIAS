from .external_api.maps_api import suggester, rev_geocoder, geocoder, check_addr
from .external_api.osm_api import create_note, create_object
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Object, ObjectSerializer, points_serializer
from django.utils import timezone
from django.db.models.functions import TruncDay
from users.models import User
from django.db import models
from cent import Client, CentException
from django.conf import settings
from django.views.decorators.cache import cache_page
from django.contrib.auth.models import AnonymousUser
import datetime
import json
import math


@csrf_exempt
@require_http_methods("POST")
def create_point(request):
    try:
        data = json.loads(request.body)
    except json.decoder.JSONDecodeError:
        return HttpResponseBadRequest('Wrong fields')
    if data.get('address') is None:
        return HttpResponseBadRequest('Wrong address field')
    try:
        lat = float(data['lat'])
        lon = float(data['lon'])
    except KeyError:
        return HttpResponseBadRequest('Wrong lat or/and lon fields')
    except ValueError:
        return HttpResponseBadRequest('Wrong types of data - lat, lon')

    if request.session.session_key is None:
        return HttpResponseBadRequest('There is not session')
    session = request.session

    address_obj = check_addr(data)
    if address_obj is None:
        return HttpResponseBadRequest('Wrong address data')

    user = request.user
    data = {}
    if user.is_authenticated:
        data.update(create_object(lat, lon, address_obj, user))
        if not data['status_osm']:
            return HttpResponseBadRequest('Osm: can not create changeset')
        changeset_id = data['changeset_id']
        new_point = Object.objects.create_object(lat, lon, address_obj, user, changeset=changeset_id)
    else:
        if 'points' not in session:
            return HttpResponseBadRequest('Wrong session')
        if len(session['points']) >= 3:
            return HttpResponseBadRequest('You done too many points')

        data.update(create_note(lat, lon, address_obj))
        if not data['status_osm']:
            return HttpResponseBadRequest('Osm: can not create note')
        note_id = int(data['info']['id'])
        new_point = Object.objects.create_object(lat, lon, address_obj, user, note=note_id)
        session['points'].append(new_point.id)
        session.save()

    data['status_cent'] = send_centrifuge(new_point)
    return JsonResponse(data)


def send_centrifuge(point):
    client = Client(
        getattr(settings, 'CENTRIFUGE_URL'),
        api_key=getattr(settings, 'CENTRIFUGE_APIKEY'),
        timeout=getattr(settings, 'CENTRIFUGE_TIMEOUT'),
    )
    dict_point = ObjectSerializer(point).data
    if point.author is not None:
        dict_point['author'] = point.author.username
    try:
        client.publish('latest_points', dict_point)
    except CentException:
        return False
    return True


@csrf_exempt
@login_required
@require_http_methods("POST")
def remove_point(request):
    try:
        data = json.loads(request.body)
        point_pk = int(data['point'])
    except (json.decoder.JSONDecodeError, KeyError, ValueError):
        return HttpResponseBadRequest('Wrong request count of fields - bad fields')
    obj = get_object_or_404(Object, id=point_pk)
    if obj.author is not request.user:
        return HttpResponseNotAllowed('Wrong request id')
    obj.is_archive = True
    obj.save()


@csrf_exempt
@login_required
@require_http_methods("POST")
def add_points_from_cookie(request):
    if request.session.session_key is not None:
        session = request.session
        if 'points' not in session:
            return HttpResponseBadRequest('Wrong session')
        if len(session['points']) == 0:
            return HttpResponseBadRequest('Wrong points')
        try:
            data = json.loads(request.body)
            points = list(data['points'])
        except (json.decoder.JSONDecodeError, KeyError, ValueError):
            return HttpResponseBadRequest('Wrong fields')

        for item in points:
            if item not in session['points']:
                return HttpResponseNotAllowed('Wrong request id')
            obj = get_object_or_404(Object, id=item)
            obj.author = request.user
            obj.save()
        del session['points']
        return HttpResponse('OK')
    return HttpResponseBadRequest('There is not session')


@csrf_exempt
def get_list_points(request):
    try:
        data = json.loads(request.body)
        start = int(data['start'])
    except (json.decoder.JSONDecodeError, KeyError, ValueError):
        start = 0
    data = {'points': []}
    points = Object.objects.filt_del(request.user).order_by('-created')[start:start+100]
    data['points'] = points_serializer(points)
    return JsonResponse(data)


@csrf_exempt
def get_last_points(request):
    objects_point = Object.objects.select_related('author')
    points = objects_point.filt_statistic().order_by('-created')[:20]
    data = {'latest_points': points_serializer(points)}
    return JsonResponse(data)


@csrf_exempt
@cache_page(60 * 60, key_prefix='statistic')
def get_statistic(request):
    time_now = timezone.now()
    objects_point = Object.objects.filt_statistic()
    data = {
        'points_count': objects_point.count(),
        'points_count_total': Object.objects.count(),
        'latest_points': [],
        'points_count_for_year': objects_point.filter(created__gte=time_now - datetime.timedelta(days=365)).count(),
        'points_count_for_month': objects_point.filter(created__gte=time_now - datetime.timedelta(days=30)).count(),
        'points_count_for_week': objects_point.filter(created__gte=time_now - datetime.timedelta(days=7)).count(),
    }

    objects_user = User.objects
    data['users_count'] = objects_user.count()
    users = objects_user.annotate(count_points=models.Count('maps'))
    data['users_top'] = list(users.order_by('-count_points')[:20].values('username', 'count_points'))

    points_for_days = []
    length_points = 100
    prev_days = 0
    objects_dates = objects_point\
        .annotate(date=TruncDay('created'))\
        .values('date')\
        .annotate(created_count=models.Count('id'))\
        .order_by('-date')[:length_points]
    for elem in objects_dates:
        days = (time_now - elem['date']).days
        count = elem['created_count']
        if days >= length_points:
            for i in range(prev_days, 100):
                points_for_days.append({'count': 0, 'days': i})
            break
        for i in range(prev_days, days):
            points_for_days.append({'count': 0, 'days': i})
        points_for_days.append({'count': count, 'days': days})
        prev_days = days + 1

    # Fix massive of points_count_days
    prev_count_points = objects_point.filter(created__lte=time_now - datetime.timedelta(days=length_points)).count()
    data['points_count_days'] = []
    for elem in reversed(points_for_days):
        prev_count_points += elem['count']
        new_elem = {'count': prev_count_points, 'days': elem['days']}
        data['points_count_days'].append(new_elem)
    data['points_count_days'] = data['points_count_days'][::-1]

    return JsonResponse(data)


@csrf_exempt
@require_http_methods("GET")
def get_suggest(request):
    data_json = suggester(request.GET)
    return JsonResponse(data_json)


@csrf_exempt
@require_http_methods("GET")
def get_geocoder(request):
    geo_data = geocoder(request.GET)
    # return JsonResponse(geo_data)
    return JsonResponse(get_mode(geo_data, request.user, True))


@csrf_exempt
@require_http_methods("GET")
def get_rev_geocoder(request):
    geo_data = rev_geocoder(request.GET)
    return JsonResponse(get_mode(geo_data, request.user, False))


def get_mode(geo_data, user, mode_geocoder):
    geo_data['status'] = {
        'osm': 'none',
        'db': False,
        'done': 'nothing'
    }

    # If we use rev_geocoder
    if not mode_geocoder:
        geo_result = geo_data['results'][0]
        geo_address = geo_result['address_details']
        # Check existence building on this point
        if 'building' not in geo_address:
            geo_data['status']['done'] = 'nothing#not_building'
            return geo_data
        if geo_result['weight'] != 1 or 'related' not in geo_result:
            geo_data['status']['done'] = 'nothing#can_geocode'
            return geo_data
        coordinates = geo_result['related'][0]['coordinates']
        address = geo_result['address']
    # If we use geocoder
    else:
        geo_result = geo_data['features'][0]
        geo_address = geo_result['properties']['address']
        # Check existence building on this address
        if 'building' not in geo_address:
            geo_data['status']['done'] = 'nothing#not_building'
            return geo_data
        if geo_result['weight'] != 1 or 'geometry' not in geo_result:
            geo_data['status']['done'] = 'nothing#can_geocode'
            return geo_data
        coordinates = geo_result['geometry']['coordinates']
        address = geo_data['request']

    sug_result = suggester({'address': address})['results'][0]
    sug_address = sug_result['address_details']
    if geo_address['building'] != sug_address.get('building'):
        geo_data['status']['done'] = 'nothing#bad_suggest'
        return geo_data

    # Define state of DB
    fias_id = sug_result['id']
    db_objects = list(Object.objects.filter(fias_id=fias_id))
    db_object = None
    if len(db_objects) != 0:
        geo_data['status']['db'] = True
        db_object = db_objects[0]

    # Define state of OSM
    geo_data['status']['osm'] = 'full'
    for name in sug_address:
        if name not in geo_address:  # or geo_address[name] != sug_address[name]:
            geo_data['status']['osm'] = 'nfull'
            break

    # TODO delete, need For DEBUG
    geo_data['sug_address'] = sug_address
    geo_data['geo_address'] = geo_address

    # Return answer
    # If information in OSM NOT full
    if geo_data['status']['osm'] == 'nfull':
        geo_data['sug_address'] = sug_address
        geo_data['geo_address'] = geo_address
    # If information in OSM full
    else:
        # If there isn't in DB
        if not geo_data['status']['db']:
            Object.objects.create_object(coordinates[0], coordinates[1], sug_result, AnonymousUser())
            geo_data['status']['done'] = 'add_db'
        # If there is in DВ
        else:
            # Check coordinates
            if not math.isclose(coordinates[0], db_object.latitude, abs_tol=1e-6) or \
                    not math.isclose(coordinates[1], db_object.longitude, abs_tol=1e-6):
                db_object.latitude = coordinates[0]
                db_object.longitude = coordinates[1]
                db_object.save()
                geo_data['status']['done'] = 'change_db'
    return geo_data
