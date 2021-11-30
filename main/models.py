from django.db import models
from django.contrib.auth.models import User


class Freelancer(models.Model):

    user_id = models.OneToOneField(User, verbose_name="id аккаунта", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, verbose_name='Имя пользователя')
    last_name = models.CharField(max_length=100, verbose_name='Фамилия пользователя')
    # rating
    description = models.TextField(verbose_name='О себе')
    image = models.ImageField(verbose_name='Аватар')
    topics = models.ManyToManyField("Topic", verbose_name="Интересующие направления")
    link_to_resume = models.CharField(max_length=200, verbose_name='Ссылка на резюме')
    completed_orders = models.PositiveIntegerField(verbose_name="Кол-во выполненных заказов", default=0)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Company(models.Model):

    user_id = models.OneToOneField(User, verbose_name="id аккаунта", on_delete=models.CASCADE)
    name = models.CharField(max_length=100, verbose_name='Название компании')
    # rating
    description = models.TextField(verbose_name='Описание компании')
    image = models.ImageField(verbose_name='Аватар')
    topics = models.ManyToManyField("Topic", verbose_name="Интересующие направления")
    link_to_resume = models.CharField(max_length=200, verbose_name='Ссылка на резюме')

    def __str__(self):
        return self.name


class Order(models.Model):

    customer = models.ForeignKey(Company, verbose_name="Заказчик", on_delete=models.CASCADE)
    title = models.CharField(max_length=100, verbose_name='Название заказа')
    description = models.TextField(verbose_name='Описание заказа')
    price = models.DecimalField(verbose_name='Стоимость заказа', max_digits=9, decimal_places=2)
    deadline = models.IntegerField(verbose_name='Время на выполнение заказа')
    status = models.BooleanField(default=False)  # 0 - заказ свободен, 1 - если performer != Null
    performer = models.ForeignKey('RespondingFreelancers', verbose_name='Исполнитель заказа',
                                  on_delete=models.CASCADE, related_name='related_performer', null=True, blank=True)
    publication_date = models.DateField(verbose_name='Время публикации')  # auto_now=True,
    publication_date.editable = True
    topic = models.ForeignKey('Topic', verbose_name='Тема', on_delete=models.CASCADE)

    def __str__(self):
        return f"Заказчик: {self.customer} - заказ: {self.title}"


class RespondingFreelancers(models.Model):

    freelancer = models.ForeignKey(Freelancer, verbose_name="Пользователь", on_delete=models.CASCADE)
    order = models.ForeignKey(Order, verbose_name='Заказ', on_delete=models.CASCADE)
    responding_date = models.DateField(auto_now=True, verbose_name='Время отклика')
    status = models.BooleanField(default=False)  #  0 - откликнулся, 1 - в работе

    def __str__(self):
        return f"{self.order} - откликнулся {self.freelancer}"


class Topic(models.Model):

    title = models.CharField(max_length=100, verbose_name='Название темы')

    def __str__(self):
        return self.title