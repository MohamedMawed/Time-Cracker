from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from .views import CreateNote, NoteRUD, NoteList
urlpatterns = [
    url(r'^note/$', NoteList.as_view(), name='note_list'),
    url(r'^note/(?P<pk>\d+)/$', NoteList.as_view(), name='note_RUD'),
    url(r'^note/$', NoteList.as_view(), name='note_create'),
]