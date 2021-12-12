import datetime
from decimal import Decimal
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
        extra_kwargs = {'image': {
            'read_only': True
        }}


class UploadImageFreelancerSerializer(serializers.ModelSerializer):
    """Для загрузки аватара фрилансером"""
    class Meta:
        model = Freelancer
        fields = ('image',)
        extra_kwargs = {'image': {
            'write_only': True
        }}


class UploadImageCompanySerializer(serializers.ModelSerializer):
    """Для загрузки аватара компанией"""
    class Meta:
        model = Company
        fields = ('image',)
        extra_kwargs = {'image': {
            'write_only': True
        }}


class CompanySerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(source='name')

    class Meta:
        model = Company
        fields = ('id', 'first_name', 'description', 'image', 'link_to_resume', 'topics', 'personal_account')
        extra_kwargs = {'image': {
            'read_only': True
        }}

    """Добавим логику пополнения счета"""
    def update(self, instance, validated_data):
        raise_errors_on_nested_writes('update', self, validated_data)
        info = model_meta.get_field_info(instance)
        m2m_fields = []

        """Пополнение счета"""
        if validated_data.get("personal_account", False):
            sum_amount = Decimal(validated_data.get("personal_account", False))
            instance.personal_account += sum_amount
            instance.save()
            return instance

        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                m2m_fields.append((attr, value))
            else:
                setattr(instance, attr, value)

        instance.save()

        for attr, value in m2m_fields:
            field = getattr(instance, attr)
            field.set(value)

        return instance


class CompaniesSerializer(serializers.ModelSerializer):
    """Для просмотра инф-ции о компаниях"""
    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'image', 'link_to_resume', 'topics')


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
                  'responding_date', 'status')


class UploadFileSerializer(serializers.ModelSerializer):
    """Для загрузки файла работы фрилансером"""
    class Meta:
        model = RespondingFreelancers
        fields = ['completed_order']
        extra_kwargs = {'completed_order': {
            'write_only': True,
            'required': True
        }}


class DownloadFileSerializer(serializers.ModelSerializer):
    """Для скачивания файла работы компанией"""
    class Meta:
        model = RespondingFreelancers
        fields = ['completed_order']
        extra_kwargs = {'completed_order': {
            'read_only': True,
            'required': True
        }}