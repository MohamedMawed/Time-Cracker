from django.contrib import admin
from .models import WorkingDay, Note
from django import forms
from django.core.exceptions import ValidationError
# Register your models here.


class NoteInline(admin.TabularInline):
    model = Note


class WorkingDayAdmin(admin.ModelAdmin):
    inlines = [
        NoteInline,
    ]
    list_display = ('id', 'date', 'owner', 'hours', 'preferredWorkingHours')

admin.site.register(WorkingDay, WorkingDayAdmin)

class NoteAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'workingDay', 'note')

admin.site.register(Note, NoteAdmin)