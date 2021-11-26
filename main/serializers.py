from rest_framework import serializers
from .models import Freelancer, Company, Order
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token


class FreelancerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Freelancer
        fields = ('first_name', 'last_name', 'description', 'image', 'link_to_resume')


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

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}


    def create(self, validated_data):

        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

        """user_type = validated_data.get(["type"])
        topics = validated_data.get(["topics"])
        if user_type == 0:            
            freelancer = Freelancer.objects.create(user_id=user)
            freelancer.first_name = validated_data["firstName"]
            freelancer.last_name = validated_data["lastName"]
            for topic in topics:
                freelancer.topics.add(topic)
            return freelancer, token
        else:
            company = Company.objects.create(user_id=user)
            company.name = validated_data['firstName']
            for topic in topics:
                company.topics.add(topic)
            return company, token"""