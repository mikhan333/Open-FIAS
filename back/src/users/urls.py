from users import views
from django.urls import path

urlpatterns = [
    path('logout', views.logout, name='logout'),
    path('get_user_detail', views.get_user_detail, name='user_detail'),
    path('check_auth', views.check_auth, name='check_auth'),
    path('get_list_objects', views.get_list_objects, name='get_list_objects'),
]
