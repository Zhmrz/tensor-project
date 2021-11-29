from rest_framework import serializers
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

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}

    def create(self, validated_data):

        user = User.objects.create_user(**validated_data)
        return user


class RespondingFreelancersSerializer(serializers.ModelSerializer):

    freelancer = serializers.ReadOnlyField(source='freelancer.first_name')

    class Meta:
        model = RespondingFreelancers
        fields = ('freelancer', 'order', 'responding_date')