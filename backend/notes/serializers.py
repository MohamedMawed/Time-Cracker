
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *

class NoteSerializer(serializers.ModelSerializer):
    underPWH = serializers.SerializerMethodField()
    class Meta:
        model = Note
        fields = ('id', 'note', 'date', 'hours', 'underPWH')
    def get_underPWH(self, obj):
        try:
            current_user = self.context['request'].user # access current user    
            ch = PwhPerDay.objects.get(owner=current_user, date=obj.date)
            return True
        except:
            return False


class PWHSerializer(serializers.ModelSerializer):
    class Meta:
        model = PwhPerDay
        fields = ('date',)