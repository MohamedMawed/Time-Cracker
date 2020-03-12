from django.db import models
from accounts.models import User
from django.utils import timezone

from django.core.validators import MinValueValidator, MaxValueValidator

class Note(models.Model):
    note = models.TextField(("Note Description"))
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(("date"), default=timezone.now)
    hours = models.IntegerField(default=1,validators=[MinValueValidator(1),
                                       MaxValueValidator(24)])
    def __str__(self):
        return self.note