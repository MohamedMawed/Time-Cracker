from django.db import models
from accounts.models import User
from django.utils import timezone

from django.core.validators import MinValueValidator, MaxValueValidator

class WorkingDay(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(("date"), default=timezone.now)
    hours = models.IntegerField(default=1,validators=[MinValueValidator(1),
                                       MaxValueValidator(24)])
    preferredWorkingHours = models.IntegerField(default=0,validators=[MinValueValidator(0),
                                       MaxValueValidator(24)]) # 0 mean that he is not working with this setting toay
    
    class Meta:
        unique_together = ['owner', 'date']
        ordering = ['date']
    def __str__(self):
        return str(self.date)

class Note(models.Model):
    workingDay = models.ForeignKey(WorkingDay, related_name='dayNotes', on_delete=models.CASCADE)
    note = models.TextField("Note")

    def __str__(self):
        return str(self.note)
