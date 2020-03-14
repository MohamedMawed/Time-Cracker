from django.contrib import admin
from .models import Note, PwhPerDay
from django import forms
from django.core.exceptions import ValidationError
# Register your models here.

class NoteAdmin(admin.ModelAdmin):
    list_display = ('note','owner', 'date', 'hours',)

admin.site.register(Note, NoteAdmin)

class PWHAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'owner', )
admin.site.register(PwhPerDay, PWHAdmin)