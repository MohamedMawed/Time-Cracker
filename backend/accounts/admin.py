from django.contrib import admin
from .models import *
# from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
# Register your models here.



class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_user_manager')
    fields = ['username', 'email', 'is_user_manager', 'is_staff']
    list_filter = ('is_staff', 'is_user_manager')

admin.site.register(User, UserAdmin)


admin.site.site_header = "Time Cracker Administration"
admin.site.site_title = "Time Cracker Administration"
admin.site.index_title = "Welcome to Time Cracker Administration"
admin.site.unregister(Group)