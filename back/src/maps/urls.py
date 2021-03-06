from maps import views
from django.urls import path

urlpatterns = [
    path('suggester', views.get_suggest, name='suggester'),
    path('geocoder', views.get_geocoder, name='geocoder'),
    path('rev_geocoder', views.get_rev_geocoder, name='rev_geocoder'),
    path('create_point', views.create_point, name='create_point'),
    path('remove_point', views.remove_point, name='remove_point'),
    path('get_list_points', views.get_list_points, name='get_list_points'),
    path('add_points_from_cookie', views.add_points_from_cookie, name='add_points_from_cookie'),
    path('get_statistic', views.get_statistic, name='get_statistic'),
    path('get_last_points', views.get_last_points, name='get_last_points'),
]
