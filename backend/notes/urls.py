from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from .views import  NoteRUD, NoteListCreate, PWHCreate, PWHToday, SendReport
urlpatterns = [
    url(r'^note/$', NoteListCreate.as_view(), name='note_list'),
    url(r'^note/sendreport/$', SendReport.as_view(), name='note_list'),
    url(r'^pwh/$', PWHCreate.as_view(), name='note_create_delete'),
    url(r'^pwh/today/$', PWHToday.as_view(), name='note_get_today'),
    url(r'^note/(?P<pk>\d+)/$', NoteRUD.as_view(), name='note_RUD'),
]