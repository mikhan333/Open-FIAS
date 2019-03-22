from users import views
from django.urls import path

urlpatterns = [
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('get_user_detail', views.get_user_detail, name='user_detail'),
    path('check_auth', views.check_auth, name='check_auth'),
    path('add_points_from_cookie', views.add_points_from_cookie, name='add_points_from_cookie'),
    path('get_list_last_points', views.get_list_last_points, name='get_list_last_points'),
    path('get_list_points', views.get_list_points, name='get_list_points'),
]
