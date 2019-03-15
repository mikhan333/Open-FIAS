from django.contrib import admin
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('maps.urls')),
    # path('', include('users.urls')),

    path('', include('social_django.urls', namespace='social')),
]
