from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='home'),
    path('register/', registerPage, name='register'),
    path('login/', loginPage, name='login'),
    path('logout/', logoutUser, name='logout')
]