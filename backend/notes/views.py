from .models import *
from rest_framework.views import APIView
from .serializers import *
from rest_framework import generics
from .models import Note, PwhPerDay
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
import django.utils.timezone


# for filtering the user manager from being able to control the other the notes
class NotUserManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or (not request.user.is_user_manager) 



class NoteRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,NotUserManager,) 


class PWHCreate(generics.CreateAPIView):
    queryset = PwhPerDay.objects.all()
    serializer_class = PWHSerializer
    permission_classes = (IsAuthenticated,NotUserManager,)

    def create(self, request):
        serializer = PWHSerializer(data=request.data)
        if serializer.is_valid():
            PWH, created = PwhPerDay.objects.get_or_create(
                date=serializer.validated_data['date'],
                owner=request.user,
            )
            if not created:
                PWH.delete()
                return JsonResponse({'message': "PWH Deleted"}, status=201)
            return JsonResponse({'message': "PWH Created Successfully"}, status=201)
        return JsonResponse({'message': "Invalid PWH."}, status=400)


class PWHToday(APIView):
    permission_classes = (IsAuthenticated,NotUserManager,)

    def get(self, request, format=None):
        try:
            pwh = PwhPerDay.objects.get(owner=request.user, date=timezone.now())
            return JsonResponse({'underPWH':True})
        except:
            return JsonResponse({'underPWH':False})
            




class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,NotUserManager,)
     
    def list(self, request):
        queryset = Note.objects.filter(owner=request.user)
        fromDate = self.request.query_params.get('from')
        toDate = self.request.query_params.get('to')
        if fromDate:
            queryset = queryset.filter(date__gte=fromDate)
        if toDate:
            queryset = queryset.filter(date__lte=toDate)
        serializer = NoteSerializer(queryset, context= {'request': request,}, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            note, created = Note.objects.get_or_create(
                note=serializer.validated_data['note'],
                date=serializer.validated_data['date'],
                hours=serializer.validated_data['hours'],
                owner=request.user,
            )
            if not created:
                return JsonResponse({'details': "Note name already exist."}, status=400)
            return JsonResponse({'message': "Note Created Successfully"}, status=201)
        return JsonResponse({'details': "Invalid Note."}, status=400)