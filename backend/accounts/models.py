from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

import uuid


class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    password_unhashed = models.CharField(max_length=100, blank=True,)
    is_user_manager = models.BooleanField(default=False, verbose_name='user manager status')

    def __str__(self):
        return self.username
