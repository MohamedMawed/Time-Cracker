from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator



class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    is_user_manager = models.BooleanField(default=False, verbose_name='user manager status')

    def __str__(self):
        return self.username


class Setting(models.Model):
    owner = models.ForeignKey(User, unique=True, on_delete=models.CASCADE)
    prefferedWorkingHours = models.IntegerField(default=1,validators=[MinValueValidator(1),
                                       MaxValueValidator(24)])  
        
    def __str__(self):
        return str(self.owner)

