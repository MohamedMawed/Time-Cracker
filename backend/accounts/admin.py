from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
# Register your models here.



admin.site.register(User ,UserAdmin)



admin.site.site_header = "Time Cracker Administration"
admin.site.site_title = "Time Cracker Administration"
admin.site.index_title = "Welcome to Time Cracker Administration"
admin.site.unregister(Group)