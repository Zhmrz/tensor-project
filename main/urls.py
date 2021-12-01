from django.urls import path, include, re_path
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register('user', UserView, basename='user')
router.register('freelancer', FreelancerView, basename='freelancer')
router.register('company', CompanyView, basename='company')
router.register('freelancers', AllFreelancerView, basename='freelancers')
router.register('companies', AllCompanyView, basename='companies')
router.register('orders', AllOrderView, basename='orders')
router.register('order', OrderView, basename='order')
router.register('register', UserRegisterView, basename='register')
router.register('respondingfreelancers', RespondingFreelancersView, basename='respondingfreelancers')


urlpatterns = [
    path('', index, name='home'),
    path('api/', include(router.urls)),
    path('auth/', UserLogin.as_view()),
    re_path(r'^(?:.*)/?$', index, name='home'),
]