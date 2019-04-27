from .external_api.maps_api import suggester, rev_geocoder, geocoder, check_addr
from .external_api.osm_api import create_note, create_object
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Object, ObjectSerializer, points_serializer
from users.models import User
from django.db import models
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
        return HttpResponseBadRequest('Wrong fields')
    if data.get('address') is None:
        return HttpResponseBadRequest('Wrong address field')
    try:
        lat = float(data['lat'])
        lon = float(data['lon'])
    except KeyError:
        return HttpResponseBadRequest('Wrong lat or (and) lon fields')
    except ValueError:
        return HttpResponseBadRequest('Wrong types of data - lat, lon')

    address_obj, exist_db, exist_osm = check_addr(data)
    if address_obj is None:
        return HttpResponseBadRequest('Wrong address data')

    data = {
        'exist_db': exist_db,
        'exist_osm': exist_osm
    }
    # When address exists in DB
    if exist_db:
        return JsonResponse(data)
    # When address doesn't exist in DB
    user = request.user
    if user.is_authenticated:
        changeset_id = None
        if exist_osm is 'none' or exist_osm is 'none_chg':
            data.update(create_object(lat, lon, address_obj, user))
            if not data['status_osm']:
                return HttpResponseBadRequest('Osm: can not create changeset')
            changeset_id = data['changeset_id']
        point_db_id = Object.objects.create_object(lat, lon, address_obj, user, changeset=changeset_id)
    else:
        if request.session.session_key is None:
            return HttpResponseBadRequest('There is not session')
        session = request.session
        if 'points' not in session:
            return HttpResponseBadRequest('Wrong session')
        if len(session['points']) >= 3:
            return HttpResponseBadRequest('You done too many points')

        note_id = None
        if exist_osm is 'none' or exist_osm is 'none_chg':
            data.update(create_note(lat, lon, address_obj))
            if not data['status_osm']:
                return HttpResponseBadRequest('Osm: can not create note')
            note_id = int(data['info']['id'])
        point_db_id = Object.objects.create_object(lat, lon, address_obj, user, note=note_id)
        session['points'].append(point_db_id)
        session.save()

    data['status_cent'] = send_centrifuge(point_db_id)
    return JsonResponse(data)


def send_centrifuge(point_id):
    client = Client(
        getattr(settings, 'CENTRIFUGE_URL'),
        api_key=getattr(settings, 'CENTRIFUGE_APIKEY'),
        timeout=getattr(settings, 'CENTRIFUGE_TIMEOUT'),
    )
    point = get_object_or_404(Object, id=point_id)
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
    data = {'points': []}
    points = Object.objects.all().filt_del(request.user)
    data['points'] = points_serializer(points)
    return JsonResponse(data)


@csrf_exempt
def get_statistic(request):
    objects_point = Object.objects.select_related('author')
    data = {'points_count': objects_point.count()}
    points = objects_point.filt_del(request.user).order_by('-created')[:20]
    data['latest_points'] = points_serializer(points)

    objects_user = User.objects
    data['users_count'] = objects_user.count()
    users = objects_user.annotate(count_points=models.Count('maps'))
    data['users_top'] = list(users.order_by('-count_points')[:20].values('username', 'count_points'))

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
