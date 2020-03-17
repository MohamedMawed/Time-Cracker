from django.contrib import admin
from .models import WorkingDay, Note
from django import forms
from django.core.exceptions import ValidationError
# Register your models here.


class NoteInline(admin.TabularInline):
    extra = 1
    initial_num = 1
    model = Note


class WorkingDayAdmin(admin.ModelAdmin):
    extra = 0
    min_num = 3
    inlines = [
        NoteInline,
    ]
    list_display = ('id', 'date', 'owner', 'hours', 'preferredWorkingHours')

admin.site.register(WorkingDay, WorkingDayAdmin)

class NoteAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'workingDay', 'note')

admin.site.register(Note, NoteAdmin)