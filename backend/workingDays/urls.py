from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from .views import  WorkingDaysListCreate, workingDayUpdateDestory, SendReport, ListWorkingDaysForUser
urlpatterns = [
    url(r'^working-days/$', WorkingDaysListCreate.as_view(), name='working-days-list-create'),
    url(r'^working-days/sendreport/$', SendReport.as_view(), name='working-days-report'),
    url(r'^working-days/user/(?P<pk>\d+)/$', ListWorkingDaysForUser.as_view(), name='working-days-byUser'),
    url(r'^working-days/(?P<pk>\d+)/$', workingDayUpdateDestory.as_view(), name='working-days-update-destroy'),
]