from django.urls import path, include
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register('freelancer', FreelancerView)

urlpatterns = [
    path('', index, name='home'),
    path('register/', registerPage, name='register'),
    path('login/', loginPage, name='login'),
    path('logout/', logoutUser, name='logout'),
    path('api/', include(router.urls))
]