from django.shortcuts import render, redirect
from django.contrib.auth.models import User

from .decorators import unathenticated_user
from .forms import CreateUserForm
from .models import Freelancer, Company
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import FreelancerSerializer


@login_required(login_url='login')
def index(request):
    return render(request, 'main/index.html')


@unathenticated_user
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
            return redirect('login')

    context = {'form': form}
    return render(request, 'main/register.html', context)


@unathenticated_user
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

    queryset = Freelancer.objects.get(user_id=)
    serializer_class = FreelancerSerializer
    permission_classes = [IsAuthenticated]