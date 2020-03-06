from .models import *
from rest_framework.views import APIView
from .serializers import *
from rest_framework import generics
from .models import Note
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse


# for filtering the user manager from being able to control the other the notes
class NotUserManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or (not request.user.is_user_manager) 



class NoteRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,NotUserManager,) 


class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,NotUserManager,) 
    def list(self, request):
        queryset = Note.objects.filter(owner=request.user)
        serializer = NoteSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            note, created = Note.objects.get_or_create(
                note=serializer.validated_data['note'],
                start=serializer.validated_data['start'],
                end=serializer.validated_data['end'],
                owner=request.user,
            )
            if not created:
                return JsonResponse({'details': "Note name already exist."}, status=400)
            return JsonResponse({'message': "Note Created Successfully"}, status=201)
        return JsonResponse({'details': "Invalid Note."}, status=400)