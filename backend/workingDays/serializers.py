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
        fields = ['date', 'hours', 'owner', 'preferredWorkingHours', 'dayNotes']
    
    def update(self, instance, validated_data):
        print(validated_data)
        Note.objects.filter(workingDay_id=instance.id).delete()
        notes_validated_data = validated_data.pop('dayNotes')
        instance.date = validated_data.get('date', instance.date)
        instance.hours = validated_data.get('hours', instance.hours)
        instance.preferredWorkingHours = validated_data.get('preferredWorkingHours', instance.preferredWorkingHours)
        instance.save()
        for each in notes_validated_data:
            each['workingDay'] = instance
        notes_set_serializer = self.fields['dayNotes']
        notes_set_serializer.create(notes_validated_data)
        return instance

    # def create(self, validated_data):
    #     try:
    #         notes_validated_data = validated_data.pop('dayNotes')
    #         user = None
    #         request = self.context.get("request")
    #         if request and hasattr(request, "user"):
    #             user = request.user
    #         print(validated_data)
    #         validated_data['owner'] = user
    #         workingDay = WorkingDay.objects.create(**validated_data)
    #         notes_set_serializer = self.fields['dayNotes']
    #         for each in notes_validated_data:
    #             each['workingDay'] = workingDay
    #         choices = notes_set_serializer.create(notes_validated_data)
    #         return workingDay
    #     except:
    #         return None
