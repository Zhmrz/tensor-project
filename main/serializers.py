from rest_framework import serializers
from .models import Freelancer, Company, Order


class FreelancerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Freelancer
        fields = ('name', 'description', 'image')


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('name', 'description', 'image')


class OrderSerializer(serializers.ModelSerializer):

    #performer = serializers.PrimaryKeyRelatedField()

    class Meta:
        model = Order
        fields = ('customer', 'title', 'description', 'price',
                  'deadline', 'status', 'performer')