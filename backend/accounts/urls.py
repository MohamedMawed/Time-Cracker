from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from .views import Signup, UserList, GetSettings, UserRUD
urlpatterns = [
    url(r'^register/$', Signup.as_view(), name="register"),
    url(r'^login/$', obtain_jwt_token, name='login'),
    url(r'^users/$', UserList.as_view(), name='user_list'),
    url(r'^users/settings/$', GetSettings.as_view(), name='user_setting'),
    url(r'^users/(?P<pk>\d+)/$', UserRUD.as_view(), name='user_rud'),
]