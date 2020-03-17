from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *
from django.core.files.base import ContentFile
import base64, uuid


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
