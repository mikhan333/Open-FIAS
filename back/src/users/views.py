from django.http import JsonResponse, HttpResponseBadRequest
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout
from social_django.views import auth as auth_login
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import get_object_or_404
from maps.models import Object, points_serializer
from datetime import datetime, date, time


@csrf_exempt
def login(request):
    return auth_login(request, 'openstreetmap')


@csrf_exempt
def logout(request):
    auth_logout(request)
    return JsonResponse({'status': 200})


@csrf_exempt
@login_required
def get_user_detail(request):  # TODO get info about points from OSM
    user = request.user
    data = {'username': user.username}
    extra_data = user.social_auth.get(provider='openstreetmap').extra_data
    data['uid'] = extra_data['id']
    data['avatar'] = extra_data['avatar']
    if 'email' in extra_data:
        data['email'] = extra_data['email']
    user_obj = Object.objects.all().filter(author=user).order_by("-created")
    data['points'] = points_serializer(user_obj)
    # data['points'] = serialize('json', user_obj)
    return JsonResponse(data)


@csrf_exempt
def check_auth(request):
    response = JsonResponse({'authorization': False})
    if request.user.is_authenticated:
        session = request.session
        if session.session_key is None:
            return HttpResponseBadRequest('Wrong request data - should be session')
        data = {'authorization': True, 'points': []}
        if 'points' in session:
            session_points = session['points']
            if len(session_points) == 0:
                del session['points']
            else:
                mas_points = []
                for item in session_points:
                    mas_points.append(get_object_or_404(Object, id=item))
                    # data['points'] = serialize('json', mas_points)
                    data['points'] = points_serializer(mas_points)
        return JsonResponse(data)
    if request.session.session_key is None:
        session = SessionStore()
        session['points'] = []
        session.set_expiry(
            (datetime.combine(date.today(), time.max) - datetime.now()).seconds
        )
        session.save()
        response.set_cookie('sessionid', session.session_key, httponly=True)
    return response


def clear_sessions():
    SessionStore.clear_expired()
