from django.shortcuts import render
from django.views import View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.filters import SearchFilter
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from .filters import OrderFilter
from .serializers import *
from rest_framework.authtoken.models import Token
from django.http import StreamingHttpResponse
import time


def index(request):  # Возвращает index с React
    return render(request, 'index.html')


"""API"""


class FreelancerView(ModelViewSet):
    """Для работы с таблицей Freelancer"""
    serializer_class = FreelancerSerializer
    permission_classes = [IsAuthenticated]  # Доступ для аутентифицированных пользователей
    authentication_classes = (TokenAuthentication,)  # Аутентификация по токену
    parser_classes = [MultiPartParser, JSONParser]

    def get_queryset(self):
        """Фрилансер будет получать инф-цию только о себе"""
        user = self.request.user  # Определяем пользователя, к-й направил запрос
        return Freelancer.objects.filter(user_id=user)  # Производим фильтрацию по данному пользователю


class UploadImageFreelancerView(ModelViewSet):
    """Для загрузки аватара фрилансером"""
    queryset = Freelancer.objects.all()
    serializer_class = UploadImageFreelancerSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    parser_classes = [MultiPartParser]


class CompanyView(ModelViewSet):
    """Для работы с таблицей Company"""
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    parser_classes = [MultiPartParser, JSONParser]

    def get_queryset(self):
        user = self.request.user
        return Company.objects.filter(user_id=user)


class UploadImageCompanyView(ModelViewSet):
    """Для загрузки аватара компанией"""
    queryset = Company.objects.all()
    serializer_class = UploadImageCompanySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    parser_classes = [MultiPartParser]


class UserView(ReadOnlyModelViewSet):
    """Для предоставлении инф-ции о пользователе"""
    serializer_class = UserViewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):

        return User.objects.filter(username=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        """Убираем лишние списки и передаем соот-щую типу пользователя инф-цию: 0 - фрилансер, 1 - компания"""
        if serializer.data[0]["freelancer_info"] == None:
            user_info = serializer.data[0]["company_info"]
            user_info["user_type"] = 1
        else:
            user_info = serializer.data[0]["freelancer_info"]
            user_info["user_type"] = 0
        return Response(user_info)


class AllFreelancerView(ReadOnlyModelViewSet):
    """Инф-ция о всех фрилансерах"""
    queryset = Freelancer.objects.all()
    serializer_class = FreelancerSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class AllCompanyView(ReadOnlyModelViewSet):
    """Инф-ция о всех компаниях"""
    queryset = Company.objects.all()
    serializer_class = CompaniesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class AllOrderView(ReadOnlyModelViewSet):
    """Инф-ция о всех заказах (для страницы поиска заказов)"""
    queryset = Order.objects.filter(status=0)  # Свободные заказы
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['title', 'description']  # Поиск в названии и описании заказа
    filterset_class = OrderFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        price_list, deadline_list, date_list = set(), set(), set()
        for order in Order.objects.all():
            price_list.add(float(order.price))
            deadline_list.add(float(order.deadline))
            date_list.add(order.publication_date)
        data = {"orders": serializer.data, "priceLims": [min(price_list, default="EMPTY"), max(price_list, default="EMPTY")],
                "durationLims": [min(deadline_list, default="EMPTY"), max(deadline_list, default="EMPTY")],
                "dateLims": [min(date_list, default="EMPTY"), max(date_list, default="EMPTY")]}
        return Response(data)


class OrderView(ModelViewSet):
    """Для работы с заказами"""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):

        user = self.request.user
        company = Company.objects.get(user_id=user)
        return Order.objects.filter(customer=company)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.validated_data['customer'] = Company.objects.get(user_id=user)
        serializer.save()


class UserRegisterView(ModelViewSet):
    """Регистрация"""
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = User.objects.get(username=request.data.get("username"))
        user_type = request.data.get("user_type")
        topics = request.data.get("topics")
        if user_type == "0":
            freelancer = Freelancer.objects.create(user_id=user)
            freelancer.first_name = request.data.get("first_name")
            freelancer.last_name = request.data.get("last_name")
            for topic in topics:
                freelancer.topics.add(topic)
            freelancer.save()
        else:
            company = Company.objects.create(user_id=user)
            company.name = request.data.get('first_name')
            for topic in topics:
                company.topics.add(topic)
            company.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserLogin(ObtainAuthToken):
    """Вход в систему"""
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        if Freelancer.objects.filter(user_id=user).exists():
            userData = FreelancerSerializer(Freelancer.objects.get(user_id=user)).data
            userData["user_type"] = 0
        else:
            userData = CompanySerializer(Company.objects.get(user_id=user)).data
            userData["user_type"] = 1
        return Response({'token': token.key, 'userData': userData})


class RespondingFreelancersView(ModelViewSet):
    """Работа с откликами"""
    queryset = RespondingFreelancers.objects.all()
    serializer_class = RespondingFreelancersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    parser_classes = [MultiPartParser, JSONParser]

    def get_queryset(self):
        """Фильтр по пользователю"""
        user = self.request.user
        if Freelancer.objects.filter(user_id=user).exists():  # Фрилансер получает свои отклики
            freelancer = Freelancer.objects.get(user_id=user)
            return RespondingFreelancers.objects.filter(freelancer=freelancer)
        else:
            company = Company.objects.get(user_id=user)
            return RespondingFreelancers.objects.filter(order__customer=company)  # Компания видит откликнувшихся на своих заказы

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        """Проверка на повторный отклик"""
        order = serializer.validated_data['order']
        if not RespondingFreelancers.objects.filter(freelancer__user_id=self.request.user, order=order).exists():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({"Отклик уже существует"}, status=status.HTTP_400_BAD_REQUEST)


    def perform_create(self, serializer):
        """Фрилансер при создании отклика указывается автоматически исходя из запроса (request.user)"""
        serializer.validated_data['freelancer'] = Freelancer.objects.get(user_id=self.request.user)
        serializer.save()

    def perform_destroy(self, instance):
        """Изменение статуса заказа при отказе фрилансера от работы"""
        if instance.status == 1 or instance.status == "1":  # Если заказ был в работе
            instance.order.performer = None  # Данный фрилансер больше не является исполнителем заказа
            instance.order.status = 0
            instance.order.save()
        instance.delete()

    """Добавим логику взаимодействия фрилансера с компанией при обновлении отклика"""
    def perform_update(self, serializer):
        """Взаимодействие будет осуществляться посредством изменения статуса отклика"""

        """Компания одобряет отклик"""
        if self.request.user == serializer.instance.order.customer and serializer.validated_data.get("status", False) \
                and serializer.validated_data["status"] == 1:
            serializer.instance.order.status = 1  # Заказ занят и не будет появляться в поиске
            serializer.instance.order.performer = serializer.instance.freelancer  # Назначается исполнитель заказа
            serializer.instance.adoption_date = datetime.date.today()
            serializer.instance.save()  # Проверить
            serializer.instance.order.save()

        """Компания принимает работу (осуществляется перевод денег)"""
        if self.request.user == serializer.instance.order.customer and serializer.validated_data.get("status", False) \
                and serializer.validated_data["status"] == 3:  # Если компания принимает работу (=меняет статус отклика на 3)
            if serializer.instance.order.status != 2:  # Для предотвращения повторного перевода
                freelancer = serializer.instance.freelancer  # Определяем фрилансера
                company = serializer.instance.order.customer  # Определяем компанию
                """Проведение транзакции"""
                company.personal_account -= serializer.instance.order.price  # Списание со счета компании денежных средств в размере равном стоимости заказа
                freelancer.personal_account += serializer.instance.order.price  # Пополнение счета фрилансера
                freelancer.completed_orders += 1  # Увеличение счетчика выполненных заказов фрилансера
                freelancer.save()
                company.save()
                serializer.instance.order.status = 2  # Статус заказа "закрыт"
                serializer.instance.order.save()

        serializer.save()


class UploadFileView(ModelViewSet):
    """Для загрузки файла работы фрилансером"""
    queryset = RespondingFreelancers.objects.all()
    serializer_class = UploadFileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    parser_classes = [MultiPartParser]


class DownloadFileView(ModelViewSet):
    """Для скачивания файла работы компанией"""
    queryset = RespondingFreelancers.objects.all()
    serializer_class = DownloadFileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    parser_classes = [MultiPartParser]


"""Server sent events"""
"""Сервер отвечает при изменении статуса отклика либо изменении кол-ва откликов > фронт направляет запрос на API откликов"""
def event_status(token):
    """Проверка статуса откликов/их количества"""
    token = token[6:]
    user = Token.objects.get(key=token).user
    initial_statuses = []  # Статусы отклика на момент запроса (исходный список статусов)
    """Фильтрация откликов либо для фрилансера, либо для компании"""
    if Freelancer.objects.filter(user_id=user).exists():
        flag = True
        freelancer = Freelancer.objects.get(user_id=user)
        respondings = RespondingFreelancers.objects.filter(freelancer=freelancer)
        for responding in respondings:
            initial_statuses.append(responding.status)
    else:
        flag = False
        company = Company.objects.get(user_id=user)
        respondings = RespondingFreelancers.objects.filter(order__customer=company)
        for responding in respondings:
            initial_statuses.append(responding.status)

    while True:

        current_statuses = []  # Текущий список статусов (обновляется каждую сек.)

        if flag:
            respondings = RespondingFreelancers.objects.filter(freelancer=freelancer)
        else:
            respondings = RespondingFreelancers.objects.filter(order__customer=company)

        for responding in respondings:
            current_statuses.append(responding.status)

        if not initial_statuses == current_statuses:  # Если изменилось кол-во статусов(=откликов)
            yield 1

        for i in range(len(initial_statuses)):  # Иначе сравниваем каждый статус
            if initial_statuses[i] - current_statuses[i] != 0:
                yield 1

        time.sleep(1)


class PostStreamView(View):
    """Возвращает 1 при изменении статуса"""
    def get(self, request):

        response = StreamingHttpResponse(event_status(request.headers["Authorization"]))
        response['Content-Type'] = 'text/event-stream'
        return response