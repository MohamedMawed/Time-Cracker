from django.contrib import admin
from .models import Note
from django import forms
from django.core.exceptions import ValidationError
# Register your models here.

class NoteForm(forms.ModelForm):

    class Meta:
        fields = ('note','owner', 'start', 'end')
        model = Note
    def clean_end(self):
        print(self.cleaned_data['start'])
        print(self.cleaned_data['end'])
        if(self.cleaned_data['start'] >= self.cleaned_data['end']):
            raise forms.ValidationError("the start date can't be after the end date")
        return self.cleaned_data['end']



class NoteAdmin(admin.ModelAdmin):
    list_display = ('note','owner', 'start', 'end')
    form = NoteForm

admin.site.register(Note, NoteAdmin)