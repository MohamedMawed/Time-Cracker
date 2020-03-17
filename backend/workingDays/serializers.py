from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *
from django.forms.models import model_to_dict
from rest_framework.fields import CurrentUserDefault

class DayNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'note',]
class WorkingDaySerializer(serializers.ModelSerializer):
    dayNotes = DayNoteSerializer(many=True)
    class Meta:
        model = WorkingDay
        fields = ['id', 'date', 'hours', 'owner', 'dayNotes']
    
    def update(self, instance, validated_data):
        Note.objects.filter(workingDay_id=instance.id).delete()
        notes_validated_data = validated_data.pop('dayNotes')
        instance.date = validated_data.get('date', instance.date)
        instance.hours = validated_data.get('hours', instance.hours)
        instance.save()
        for each in notes_validated_data:
            each['workingDay'] = instance
        notes_set_serializer = self.fields['dayNotes']
        notes_set_serializer.create(notes_validated_data)
        return instance