import django_filters
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import TokenAuthentication


from .forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from .serializers import *


def index(request):
    return render(request, 'index.html')



def registerPage(request):

    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            group = form.cleaned_data.get('group')
            username = form.cleaned_data.get('username')
            user = User.objects.get(username=username)
            if group == '0':
                Freelancer.objects.create(user_id=user, name=username)
            else:
                Company.objects.create(user_id=user, name='Компания')
            messages.success(request, 'Регистрация прошла успешно!')
            #return ыфва Вернуть либо ошибку, либо результат API

    context = {'form': form}
    return render(request, 'main/register.html', context)



def loginPage(request):

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'Логин или пароль неверный')

    context = {}
    return render(request, 'main/login.html', context)


def logoutUser(request):

    logout(request)
    return redirect('login')


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

    def get_queryset(self):

        user = self.request.user
        return Company.objects.filter(user_id=user)


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

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter


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


class UserView(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

