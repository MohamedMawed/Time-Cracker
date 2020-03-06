from django.db import models
from accounts.models import User
from django.utils import timezone

class Note(models.Model):
    note = models.TextField(("Note Description"))
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    start = models.DateTimeField(("starting date"), default=timezone.now)
    end = models.DateTimeField(("ending date"), default=timezone.now)
    def __str__(self):
        return self.note