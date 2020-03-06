from .models import *
from rest_framework.views import APIView
from .serializers import *
from rest_framework import generics
from .models import Note
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response

# for filtering the user manager from being able to control the other the notes
class NotUserManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or (not request.user.is_user_manager) 

class CreateNote(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,NotUserManager,) 


class NoteRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,NotUserManager,) 


class NoteList(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,NotUserManager,) 
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = Note.objects.filter(owner=request.user)
        serializer = NoteSerializer(queryset, many=True)
        return Response(serializer.data)