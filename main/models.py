from django.db import models
from django.contrib.auth.models import User

class Freelancer(models.Model):

    user_id = models.ForeignKey(User, verbose_name="id аккаунта", on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100, verbose_name='Имя пользователя')
    #rating = models.IntegerField()
    description = models.TextField(verbose_name='О себе')
    image = models.ImageField(verbose_name='Аватар')

    def __str__(self):
        return self.name


class Company(models.Model):

    user_id = models.ForeignKey(User, verbose_name="id аккаунта", on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100, verbose_name='Название компании')
    # rating
    description = models.TextField(verbose_name='Описание компании')
    image = models.ImageField(verbose_name='Аватар')

    def __str__(self):
        return self.name


class Order(models.Model):

    customer = models.ForeignKey(Company, verbose_name="Заказчик", on_delete=models.CASCADE)
    title = models.CharField(max_length=100, verbose_name='Название заказа')
    description = models.TextField(verbose_name='Описание заказа')
    price = models.FloatField(verbose_name='Стоимость заказа')
    deadline = models.DateField(verbose_name='Дата сдачи заказа')
    status = models.BooleanField(default=False)  # 0 - заказ свободен, 1 - если performer != Null
    performer = models.ForeignKey('RespondingFreelancers', verbose_name='Исполнитель заказа',
                                  on_delete=models.CASCADE, related_name='related_performer', null=True, blank=True)

    # Можно предусмотреть разрешение создания заказа только для компании (permissions)


    def __str__(self):
        return f"Заказчик: {self.customer} - заказ: {self.title}"


class RespondingFreelancers(models.Model):

    freelancer = models.ForeignKey(Freelancer, verbose_name="Пользователь", on_delete=models.CASCADE)
    order = models.ForeignKey(Order, verbose_name='Заказ', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.order} - откликнулся {self.freelancer}"