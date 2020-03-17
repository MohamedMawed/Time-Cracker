from django.contrib import admin
from .models import *
from django.contrib.auth.models import Group



class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'email', 'username', 'is_user_manager')
    fields = ['username', 'email', 'is_user_manager', 'is_staff']
    list_filter = ('is_staff', 'is_user_manager')

admin.site.register(User, UserAdmin)

class SettingAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'prefferedWorkingHours', )
    fields = ['owner', 'prefferedWorkingHours', ]
    
admin.site.register(Setting, SettingAdmin)

admin.site.site_header = "Time Cracker Administration"
admin.site.site_title = "Time Cracker Administration"
admin.site.index_title = "Welcome to Time Cracker Administration"
admin.site.unregister(Group)