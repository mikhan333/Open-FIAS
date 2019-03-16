from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout
from django.views.decorators.csrf import csrf_exempt
from maps.models import Object
from django.core.serializers import serialize


@csrf_exempt
def logout(request):
    auth_logout(request)
    return JsonResponse({'status': 200})


@csrf_exempt
@login_required
def get_user_detail(request):
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
    if request.user.is_authenticated():
        return JsonResponse({'authorization': True})
    return JsonResponse({'authorization': False})


@csrf_exempt
def get_list_objects(request):
    data = Object.objects.all().filt_del(request.user).filter(is_archive=False)
    return JsonResponse(serialize('json', data))
