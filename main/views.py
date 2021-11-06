from django.shortcuts import render
from django.contrib.auth.models import User
from .forms import CreateUserForm
from .models import Freelancer, Company

def index(request):
    return render(request, 'main/index.html',)

def register(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            group = form.cleaned_data.get('group')
            username = form.cleaned_data.get('username')
            user = User.objects.get(username=username)
            print(group)
            if group == '0':
                Freelancer.objects.create(user_id=user, name=username)
            else:
                Company.objects.create(user_id=user, name='Компания')

    context = {'form': form}
    return render(request, 'main/register.html', context)