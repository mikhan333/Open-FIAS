import json


from social_core.actions import do_auth, do_complete
from django.conf import settings
from django.http import JsonResponse
from social_django.utils import load_strategy
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout, login
from social_django.utils import psa, load_strategy
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def logout(request):
    auth_logout(request)
    return JsonResponse({'ok': 123})


@csrf_exempt
def info(request):
    if request.user.is_authenticated:
        data = {'name': request.user.username}
    else:
        data = {'error': 'anonymous'}
    return JsonResponse(data)
