from django.urls import path, include
from .views import *
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token


router = routers.DefaultRouter()
router.register('freelancer', FreelancerView, basename='freelancer')
router.register('company', CompanyView, basename='company')
router.register('freelancers', AllFreelancerView, basename='freelancers')
router.register('companies', AllCompanyView, basename='companies')
router.register('orders', AllOrderView, basename='orders')
router.register('order', OrderView, basename='order')
router.register('register', OrderView, basename='order')

urlpatterns = [
    path('', index, name='home'),
    #path('register/', registerPage, name='register'),
    #path('login/', loginPage, name='login'),
    #path('logout/', logoutUser, name='logout'),
    path('api/', include(router.urls)),
    path('auth/', obtain_auth_token)
]