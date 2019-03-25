from users import views
from django.urls import path

urlpatterns = [
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('get_user_detail', views.get_user_detail, name='user_detail'),
    path('check_auth', views.check_auth, name='check_auth'),
]
