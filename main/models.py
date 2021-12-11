from django.db import models
from django.contrib.auth.models import User

"""БД включает в себя следующие таблицы: фрилансеры, компании, заказы, темы (направления), отклики"""


class Freelancer(models.Model):
    """Фрилансер"""
    user_id = models.OneToOneField(User, verbose_name="id аккаунта", on_delete=models.CASCADE, related_name="freelancer_info")
    first_name = models.CharField(max_length=100, verbose_name='Имя пользователя')
    last_name = models.CharField(max_length=100, verbose_name='Фамилия пользователя')
    # rating
    personal_account = models.DecimalField(verbose_name='Лицевой счет', max_digits=9, decimal_places=2, default=0)
    description = models.TextField(verbose_name='О себе', null=True, blank=True)
    image = models.ImageField(verbose_name='Аватар', null=True, blank=True)
    topics = models.ManyToManyField("Topic", verbose_name="Интересующие направления")
    link_to_resume = models.CharField(max_length=200, verbose_name='Ссылка на резюме', null=True, blank=True)
    completed_orders = models.PositiveIntegerField(verbose_name="Кол-во выполненных заказов", default=0)


    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Company(models.Model):
    """Компания"""
    user_id = models.OneToOneField(User, verbose_name="id аккаунта", on_delete=models.CASCADE, related_name="company_info")
    name = models.CharField(max_length=100, verbose_name='Название компании')
    # rating
    personal_account = models.DecimalField(verbose_name='Лицевой счет', max_digits=9, decimal_places=2, default=0)
    description = models.TextField(verbose_name='Описание компании', null=True, blank=True)
    image = models.ImageField(verbose_name='Аватар', null=True, blank=True)
    topics = models.ManyToManyField("Topic", verbose_name="Интересующие направления", blank=True)
    link_to_resume = models.CharField(max_length=200, verbose_name='Ссылка на резюме')

    def __str__(self):
        return self.name


class Order(models.Model):
    """Заказ"""
    customer = models.ForeignKey(Company, verbose_name="Заказчик", on_delete=models.CASCADE)
    title = models.CharField(max_length=100, verbose_name='Название заказа')
    description = models.TextField(verbose_name='Описание заказа')
    price = models.DecimalField(verbose_name='Стоимость заказа', max_digits=9, decimal_places=2)
    deadline = models.IntegerField(verbose_name='Время на выполнение заказа (кол-во дней)')
    status = models.IntegerField(default=0, verbose_name="Статус заказа")  # 0 - заказ свободен, 1 - занят, 2 - закрыт
    performer = models.ForeignKey(Freelancer, verbose_name='Исполнитель заказа',
                                  on_delete=models.CASCADE, related_name='related_performer', null=True, blank=True)
    publication_date = models.DateField(verbose_name='Время публикации')  # auto_now=True,
    publication_date.editable = True
    topic = models.ForeignKey('Topic', verbose_name='Тема', on_delete=models.CASCADE)

    def __str__(self):
        return f"Заказчик: {self.customer} - заказ: {self.title}"


class RespondingFreelancers(models.Model):
    """Отклики (откликнувшиеся фрилансеры)"""
    freelancer = models.ForeignKey(Freelancer, verbose_name="Пользователь", on_delete=models.CASCADE)
    order = models.ForeignKey(Order, verbose_name='Заказ', on_delete=models.CASCADE)
    responding_date = models.DateField(auto_now=True, verbose_name='Дата отклика')
    adoption_date = models.DateField(verbose_name="Дата принятия отклика", null=True, blank=True)
    status = models.IntegerField(default=0, verbose_name="Статус отклика")  #  0 - откликнулся, 1 - в работе,
                                            # 2 - отклик (работа) на проверке, 3 - принято, 4 - на доработку, -1 - отклонен
    completed_order = models.FileField(verbose_name="Прикрепленная работа", null=True, blank=True)

    def __str__(self):
        return f"{self.order} - откликнулся {self.freelancer}"


class Topic(models.Model):
    """Темы: программирование, 3D-моделирование, фотография, типографика, образование, графика"""
    title = models.CharField(max_length=100, verbose_name='Название темы')

    def __str__(self):
        return self.title
