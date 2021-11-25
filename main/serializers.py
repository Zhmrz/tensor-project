from rest_framework import serializers
from .models import Freelancer, Company, Order
from django.contrib.auth.models import User


class FreelancerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Freelancer
        fields = ('name', 'description', 'image', 'link_to_resume')


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('name', 'description', 'image', 'link_to_resume')


class OrderSerializer(serializers.ModelSerializer):

    customer = serializers.ReadOnlyField(source='customer.name')
    #topic = serializers.RelatedField(many=False)

    class Meta:
        model = Order
        fields = ('id', 'customer', 'title', 'description', 'price',
                  'deadline', 'status', 'performer', 'publication_date', 'topic')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password']