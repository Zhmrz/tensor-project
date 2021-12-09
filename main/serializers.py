from rest_framework import serializers
from rest_framework.serializers import raise_errors_on_nested_writes
from rest_framework.utils import model_meta
from .models import Freelancer, Company, Order, RespondingFreelancers
from django.contrib.auth.models import User

"""Для каждой таблицы из БД создается свой сериализатор, который преобразует данные в формат JSON"""


class FreelancerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Freelancer
        fields = ('id', 'first_name', 'last_name', 'description', 'image', 'link_to_resume', 'topics', 'personal_account')


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'image', 'link_to_resume', 'topics', 'personal_account')


class UserViewSerializer(serializers.ModelSerializer):
    """Для просмотра личной информации пользователя (фрилансера либо компании)"""
    freelancer_info = FreelancerSerializer()
    company_info = CompanySerializer()

    class Meta:
        model = User
        fields = ['freelancer_info', 'company_info']


class OrderSerializer(serializers.ModelSerializer):

    customer = serializers.ReadOnlyField(source='customer.name')

    class Meta:
        model = Order
        fields = ('id', 'customer', 'title', 'description', 'price',
                  'deadline', 'status', 'performer', 'publication_date', 'topic')

    """Дополним метод обновления заказа"""
    def update(self, instance, validated_data):

        raise_errors_on_nested_writes('update', self, validated_data)
        info = model_meta.get_field_info(instance)
        m2m_fields = []
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                m2m_fields.append((attr, value))
            else:
                setattr(instance, attr, value)

        instance.save()

        for attr, value in m2m_fields:
            field = getattr(instance, attr)
            field.set(value)

        """Обновление статуса отклика и статуса заказа после назначения исполнителя заказа"""
        if validated_data["performer"].id:
            freelancer_id = validated_data["performer"].id  # Получим id фрилансера для выбора соот-щего отклика
            order_id = instance.id  # Также получим id заказа
            response_to_order = RespondingFreelancers.objects.get(freelancer=freelancer_id, order=order_id)  # Находим отклик
            response_to_order.status = 1  # Статус отклика 1 - отклик в работе
            response_to_order.save()
            instance.status = 1  # Заказ занят и не будет появляться в поиске
            instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    """Для регистрации пользователей"""
    class Meta:
        model = User
        fields = ['username', 'password']
        """Скрытие пароля"""
        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}

    def create(self, validated_data):

        user = User.objects.create_user(**validated_data)
        return user


class RespondingFreelancersSerializer(serializers.ModelSerializer):
    """Для работы с откликами"""
    freelancer = serializers.StringRelatedField(many=False, read_only=True)  # Строковое представление фрилансера
    id_freelancer = serializers.ReadOnlyField(source='freelancer.id')
    order_title = serializers.ReadOnlyField(source='order.title')

    class Meta:
        model = RespondingFreelancers
        fields = ('id', 'id_freelancer', 'freelancer', 'order', 'order_title',
                  'responding_date', 'status', 'completed_order')
    """Добавим логику взаимодействия фрилансера с компанией при обновлении отклика"""
    """Взаимодействие будет осуществляться посредством изменения статуса отклика"""
    def update(self, instance, validated_data):

        raise_errors_on_nested_writes('update', self, validated_data)
        info = model_meta.get_field_info(instance)
        m2m_fields = []
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                m2m_fields.append((attr, value))
            else:
                setattr(instance, attr, value)

        instance.save()

        for attr, value in m2m_fields:
            field = getattr(instance, attr)
            field.set(value)

        """Обновление статуса отклика после загрузки выполненной работы (файла) фрилансером и ее отправки на проверку"""
        if validated_data.get("completed_order", False):  # Если фрилансер загрузил работу (=был PATCH-запрос с "completed_order")
            instance.status = 2  # Статус отклика 2 - на проверке
            instance.save()

        """Компания принимает работу (осуществляется перевод денег)"""
        if validated_data.get("status", False) and validated_data["status"] == 3:  # Если компания принимает работу (=меняет статус отклика на 3)
            if instance.order.status != 2:  # Для предотвращения повторного перевода
                freelancer = instance.freelancer  # Определяем фрилансера
                company = instance.order.customer  # Определяем компанию
                """Проведение транзакции"""
                company.personal_account -= instance.order.price  # Списание со счета компании денежных средств в размере равном стоимости заказа
                freelancer.personal_account += instance.order.price  # Пополнение счета фрилансера
                freelancer.completed_orders += 1  # Увеличение счетчика выполненных заказов фрилансера
                freelancer.save()
                company.save()
                instance.order.status = 2  # Статус заказа "закрыт"
                instance.order.save()

        return instance