from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User, Group
from django import forms


class CreateUserForm(UserCreationForm):

    group = forms.ChoiceField(choices=(("0", "Фрилансер"), ("1", "Компания")))

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']