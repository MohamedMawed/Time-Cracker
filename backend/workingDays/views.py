from .models import *
from rest_framework.views import APIView
from .serializers import *
from rest_framework import generics, status
from .models import WorkingDay
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
import django.utils.timezone
from django.core.mail import send_mail
from django.template.loader import render_to_string
from collections import defaultdict
import itertools
import operator



# for filtering the user manager from being able to control the other the notes
class NotUserManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or (not request.user.is_user_manager) 



class workingDayUpdateDestory(generics.RetrieveUpdateDestroyAPIView):
    queryset = WorkingDay.objects.all()
    serializer_class = WorkingDaySerializer
    permission_classes = (IsAuthenticated,NotUserManager,) 
    

class WorkingDaysListCreate(generics.ListCreateAPIView):
    queryset = WorkingDay.objects.all()
    serializer_class = WorkingDaySerializer
    permission_classes = (IsAuthenticated,NotUserManager,)
     
    def list(self, request):
        queryset = WorkingDay.objects.filter(owner=request.user)
        fromDate = self.request.query_params.get('from')
        toDate = self.request.query_params.get('to')
        if fromDate:
            queryset = queryset.filter(date__gte=fromDate)
        if toDate:
            queryset = queryset.filter(date__lte=toDate)
        serializer = WorkingDaySerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        request.data['owner']=request.user.user_id
        serializer = WorkingDaySerializer(data=request.data)
        if serializer.is_valid():
            workingDay, created = WorkingDay.objects.get_or_create(
                date=serializer.validated_data['date'],
                hours=serializer.validated_data['hours'],
                preferredWorkingHours=serializer.validated_data['preferredWorkingHours'],
                owner=request.user,
            )
            if not created:
                return JsonResponse({'details': "working day already exist."}, status=400)
            else:
                notes_validated_data = serializer.validated_data.pop('dayNotes')
                for note in notes_validated_data:
                    Note.objects.create(workingDay=workingDay,note=note['note'])
                return JsonResponse({'message': "Working Day Added Successfully"}, status=201)
        return JsonResponse({'details': serializer.errors}, status=400)




class SendReport(APIView):
    permission_classes = (IsAuthenticated,NotUserManager,)

    def get(self, request, format=None):
        queryset = WorkingDay.objects.filter(owner=request.user)
        fromDate = self.request.query_params.get('from')
        toDate = self.request.query_params.get('to')
        if fromDate:
            queryset = queryset.filter(date__gte=fromDate)
        if toDate:
            queryset = queryset.filter(date__lte=toDate)

        to_list = queryset.values()


        for day in to_list:
            notes = Note.objects.filter(workingDay__id=day.get('id'))
            notesList = notes.values()
            day['dayNotes'] = notesList
        if(to_list.count()==0):
            return Response({'message': "can't send an empty report"},status=400)            

        html_message = render_to_string('mail_template.html', {'notes': to_list})
        send_mail(
        'Your Requested Report',
        html_message,
        'mastermomawed@gmail.com',
        [request.user.email],
        fail_silently=False,
        html_message=html_message
        )
        return Response({'message': 'report created'},status=201)            
