from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from .views import  NoteRUD, NoteListCreate
urlpatterns = [
    url(r'^note/$', NoteListCreate.as_view(), name='note_list'),
    url(r'^note/(?P<pk>\d+)/$', NoteRUD.as_view(), name='note_RUD'),
]