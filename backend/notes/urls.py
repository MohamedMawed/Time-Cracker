from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from .views import  NoteRUD, NoteListCreate, PWHCreate, PWHToday, SendReport
urlpatterns = [
    url(r'^notes/$', NoteListCreate.as_view(), name='note_list'),
    url(r'^notes/sendreport/$', SendReport.as_view(), name='note_list'),
    url(r'^pwh/$', PWHCreate.as_view(), name='note_create_delete'),
    url(r'^pwh/today/$', PWHToday.as_view(), name='note_get_today'),
    url(r'^notes/(?P<pk>\d+)/$', NoteRUD.as_view(), name='note_RUD'),
]