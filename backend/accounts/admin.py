from django.contrib import admin
from .models import *
# from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
# Register your models here.



class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'password_unhashed', 'is_user_manager')
    list_filter = ('is_staff', 'is_user_manager')


# admin.site.unregister(User)
admin.site.register(User, UserAdmin)


admin.site.site_header = "Time Cracker Administration"
admin.site.site_title = "Time Cracker Administration"
admin.site.index_title = "Welcome to Time Cracker Administration"
admin.site.unregister(Group)