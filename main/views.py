import django_filters
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from rest_framework.authtoken.models import Token


def index(request):
    return render(request, 'index.html')


class FreelancerView(ModelViewSet):

    serializer_class = FreelancerSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):

        user = self.request.user
        return Freelancer.objects.filter(user_id=user)


class CompanyView(ModelViewSet):

    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class UserView(ReadOnlyModelViewSet):

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

        """Убираем лишнюю инф-цию о пользователе, а также указываем его тип: 0 - фрилансер, 1 - компания"""
        if serializer.data[0]["freelancer_info"]==None:
            user_info = serializer.data[0]["company_info"]
            user_info["user_type"] = 1
        else:
            user_info = serializer.data[0]["freelancer_info"]
            user_info["user_type"] = 0
        return Response(user_info)


class AllFreelancerView(ReadOnlyModelViewSet):

    queryset = Freelancer.objects.all()
    serializer_class = FreelancerSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class AllCompanyView(ReadOnlyModelViewSet):

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class OrderFilter(django_filters.FilterSet):

    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    start_date = django_filters.DateFilter(field_name="publication_date", lookup_expr="gte")
    end_date = django_filters.DateFilter(field_name="publication_date", lookup_expr="lte")
    min_deadline = django_filters.NumberFilter(field_name="deadline", lookup_expr="gte")
    max_deadline = django_filters.NumberFilter(field_name="deadline", lookup_expr="lte")
    topic = django_filters.BaseInFilter(field_name="topic")

    class Meta:
        model = Order
        fields = ['topic', 'price', 'deadline', 'publication_date']


class AllOrderView(ReadOnlyModelViewSet):

    queryset = Order.objects.filter(status=False)
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend]
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

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = User.objects.get(username=request.data.get("username"))
        user_type = request.data.get("type")
        topics = request.data.get("topics")
        if user_type == "0":
            freelancer = Freelancer.objects.create(user_id=user)
            freelancer.first_name = request.data.get("firstName")
            freelancer.last_name = request.data.get("lastName")
            for topic in topics:
                freelancer.topics.add(topic)
            freelancer.save()
        else:
            company = Company.objects.create(user_id=user)
            company.name = request.data.get('firstName')
            for topic in topics:
                company.topics.add(topic)
            company.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserLogin(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        if Freelancer.objects.filter(user_id=user).exists():
            userData = Freelancer.objects.filter(user_id=user).values()
        else:
            userData = Company.objects.filter(user_id=user).values()
        return Response({'token': token.key, 'userData': userData[0]})


class RespondingFreelancersView(ModelViewSet):

    queryset = RespondingFreelancers.objects.all()
    serializer_class = RespondingFreelancersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):

        user = self.request.user
        if Freelancer.objects.filter(user_id=user).exists():
            freelancer = Freelancer.objects.get(user_id=user)
            return RespondingFreelancers.objects.filter(freelancer=freelancer)
        else:
            company = Company.objects.get(user_id=user)
            return RespondingFreelancers.objects.filter(order__customer=company)

    def perform_create(self, serializer):

        user = self.request.user
        serializer.validated_data['freelancer'] = Freelancer.objects.get(user_id=user)
        serializer.save()
