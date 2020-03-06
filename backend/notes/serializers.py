
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'note', 'start', 'end')