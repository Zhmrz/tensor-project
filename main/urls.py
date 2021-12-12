from django.urls import path, include, re_path
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()  # Содержит в себе все urls API
router.register('user', UserView, basename='user')  # Получение личной информации пользователя
router.register('freelancer', FreelancerView, basename='freelancer')  # Изменение личной инф-ции фрилансера
router.register('company', CompanyView, basename='company')  # Изменение личной инф-ции компании
router.register('freelancers', AllFreelancerView, basename='freelancers')  # Все фрилансеры
router.register('companies', AllCompanyView, basename='companies')  # Все компании
router.register('orders', AllOrderView, basename='orders')  # Информации о всех свободных заказах
router.register('order', OrderView, basename='order')  # Заказы компании
router.register('register', UserRegisterView, basename='register')  # Регистрация
router.register('respondingfreelancers', RespondingFreelancersView, basename='respondingfreelancers')  # Отклики
router.register('uploadimagef', UploadImageFreelancerView, basename='uploadimagef')  # Загрузка аватара фрилансера
router.register('uploadimagec', UploadImageCompanyView, basename='uploadimagec')  # Загрузка аватара фрилансера
router.register('uploadfile', UploadFileView, basename='uploadfile')  # Загрузка файла работы фрилансером
router.register('downloadfile', DownloadFileView, basename='downloadfile')  # Скачивание файла работы компанией


urlpatterns = [
    path('', index, name='home'),  # Фронт
    path('api/', include(router.urls)),  # urls API
    path('auth/', UserLogin.as_view()),  # url аутентификации
    re_path(r'^(?:.*)/?$', index, name='home'),  # Перенаправление на фронт (иначе Django ловит url и не находит его)
]