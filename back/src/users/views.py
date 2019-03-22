from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout
from django.views.decorators.csrf import csrf_exempt
from maps.models import Object
from django.core.serializers import serialize
from django.contrib.sessions.backends.db import SessionStore
from django.contrib.sessions.models import Session


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
    if 'email' in extra_data:
        data['email'] = extra_data['email']
    user_obj = Object.objects.all().filter(author=user).order_by("-created")
    data['points'] = serialize('json', user_obj)
    return JsonResponse(data)


@csrf_exempt
def check_auth(request):
    response = JsonResponse({'authorization': False})
    if request.user.is_authenticated():
        return JsonResponse({'authorization': True})
    elif request.session.__getitem__('sessionid') is None:
        session = SessionStore()
        session['points'] = []
        session.save()
        response.set_cookie('sessionid', session.session_key)
    return response


@csrf_exempt
def get_list_objects(request):
    data = Object.objects.all().filt_del(request.user).filter(is_archive=False)
    return JsonResponse(serialize('json', data))
