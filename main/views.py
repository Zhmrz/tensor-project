from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend

from .decorators import unathenticated_user
from .forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwner
from .serializers import *


#@login_required(login_url='login')
def index(request):
    return render(request, 'index.html')


#@unathenticated_user
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


#@unathenticated_user
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

    #queryset = Freelancer.objects.all()
    serializer_class = FreelancerSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):

        user = self.request.user
        return Freelancer.objects.filter(user_id=user)


class CompanyView(ModelViewSet):

    serializer_class = CompanySerializer
    permission_classes = [IsOwner]

    def get_queryset(self):

        user = self.request.user
        return Company.objects.filter(user_id=user)


class AllFreelancerView(ModelViewSet):

    queryset = Freelancer.objects.all()
    serializer_class = FreelancerSerializer
    permission_classes = [IsAuthenticated]


class AllCompanyView(ModelViewSet):

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]


class AllOrderView(ModelViewSet):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    #permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['topic', 'id']


class OrderView(ModelViewSet):

    serializer_class = OrderSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):

        user = self.request.user
        company = Company.objects.get(user_id=user)
        return Order.objects.filter(customer=company)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.validated_data['customer'] = Company.objects.get(user_id=user)
        serializer.save()