from maps import views
from django.urls import path

urlpatterns = [
    path('suggester', views.get_suggest, name='suggester'),
    path('geocoder', views.get_geocoder, name='geocoder'),
    path('rev_geocoder', views.get_rev_geocoder, name='rev_geocoder'),
    path('create_point', views.create_point, name='create_point'),
]
