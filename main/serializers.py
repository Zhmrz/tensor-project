from rest_framework import serializers
from .models import Freelancer, Company, Order


class FreelancerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Freelancer
        fields = ('name', 'description', 'image')