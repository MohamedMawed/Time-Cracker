from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from .views import  WorkingDaysListCreate, workingDayUpdateDestory, SendReport
urlpatterns = [
    url(r'^working-days/$', WorkingDaysListCreate.as_view(), name='working-days-list-create'),
    url(r'^working-days/send-report$', SendReport.as_view(), name='working-days-report'),
    url(r'^working-days/(?P<pk>\d+)/$', workingDayUpdateDestory.as_view(), name='working-days-update-destroy'),
]