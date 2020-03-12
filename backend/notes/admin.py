from django.contrib import admin
from .models import Note
from django import forms
from django.core.exceptions import ValidationError
# Register your models here.

class NoteAdmin(admin.ModelAdmin):
    list_display = ('note','owner', 'date', 'hours')

admin.site.register(Note, NoteAdmin)