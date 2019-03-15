from maps import views
from users import views
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('logout', views.logout),
    path('get', views.info)
]
