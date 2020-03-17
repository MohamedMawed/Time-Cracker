from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model   = User
        fields  = ('user_id', 'password', 'username','email', 'is_user_manager','is_staff')

        extra_kwargs = {
            'password'  : {'write_only': True},
        }

        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class settingsSerializer(serializers.ModelSerializer):
    class Meta:
        model   = Setting
        fields  = ('prefferedWorkingHours',)