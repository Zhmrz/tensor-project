from rest_framework import serializers
from rest_framework.serializers import raise_errors_on_nested_writes
from rest_framework.utils import model_meta

from .models import Freelancer, Company, Order, RespondingFreelancers
from django.contrib.auth.models import User


class FreelancerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Freelancer
        fields = ('id', 'first_name', 'last_name', 'description', 'image', 'link_to_resume', 'topics')


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'image', 'link_to_resume', 'topics')


class UserViewSerializer(serializers.ModelSerializer):

    freelancer_info = FreelancerSerializer()
    company_info = CompanySerializer()

    class Meta:
        model = User
        fields = ['freelancer_info', 'company_info']


class OrderSerializer(serializers.ModelSerializer):

    customer = serializers.ReadOnlyField(source='customer.name')
    #topic = serializers.RelatedField(many=False)

    class Meta:
        model = Order
        fields = ('id', 'customer', 'title', 'description', 'price',
                  'deadline', 'status', 'performer', 'publication_date', 'topic')

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

        if validated_data["performer"].id:
            freelancer_id = validated_data["performer"].id
            order_id = instance.id
            response_to_order = RespondingFreelancers.objects.get(freelancer=freelancer_id, order=order_id)
            response_to_order.status = True
            response_to_order.save()
            instance.status = True
            instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password']

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}

    def create(self, validated_data):

        user = User.objects.create_user(**validated_data)
        return user


class RespondingFreelancersSerializer(serializers.ModelSerializer):

    freelancer = serializers.StringRelatedField(many=False, read_only=True)
    id_freelancer = serializers.ReadOnlyField(source='freelancer.id')
    order_title = serializers.ReadOnlyField(source='order.title')

    class Meta:
        model = RespondingFreelancers
        fields = ('id_freelancer', 'freelancer', 'order', 'order_title', 'responding_date', 'status')