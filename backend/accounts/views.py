from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics, status
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated, BasePermission
from workingDays.views import NotUserManager


def generate_token(user):
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
    payload = jwt_payload_handler(user)
    return jwt_encode_handler(payload)


class Signup(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def post(self, request, format=None):
        try:
            User.objects.get(username=request.data['username'])
            return Response({"error": "A user with that username already exists"}, status=status.HTTP_409_CONFLICT)
        except User.DoesNotExist:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.save()
                token = generate_token(user)
                return Response({"token": token, "user": serializer.data}, status=status.HTTP_201_CREATED)
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# for filtering the regular users from being able to control the other users
class NotRegularUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_user_manager 

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.filter(is_staff=False)
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, NotRegularUser,) 
    def create(self, request):
        try:
            User.objects.get(username=request.data['username'])
            return Response({"error": "A user with that username already exists"}, status=status.HTTP_409_CONFLICT)
        except User.DoesNotExist:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.save()
                token = generate_token(user)
                return Response({"message": "User Created"}, status=status.HTTP_201_CREATED)
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(is_staff=False)
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, NotRegularUser,)

class GetSettings(APIView):
    permission_classes = (IsAuthenticated, NotUserManager,) 

    def post(self, request, format=None):
        try:
            settings = Setting.objects.create(owner=request.user, prefferedWorkingHours=request.data['prefferedWorkingHours'])
            return Response({"settings": 'created successfully'}, status=status.HTTP_201_CREATED)
        except:
            settings = Setting.objects.filter(owner=request.user).update(prefferedWorkingHours=request.data['prefferedWorkingHours'])
            return Response({"settings": 'edited successfully'}, status=status.HTTP_201_CREATED)

    def get(self, request, pk=None):
        try:
            setting = Setting.objects.get(owner=request.user)
            serializer = settingsSerializer(setting)
            return Response(serializer.data, status=200)
        except:
            return Response({'settings':{}}, status=400)


            


         