from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from accounts import views
urlpatterns = [
    url(r'^register/$', views.Signup.as_view(), name="register"),
    url(r'^login/$', obtain_jwt_token, name='login'),
    url(r'^user/$', views.UserList.as_view(), name='user_list'),
    url(r'^user/(?P<pk>\d+)/$', views.UserRUD.as_view(), name='user_RUD'),
]