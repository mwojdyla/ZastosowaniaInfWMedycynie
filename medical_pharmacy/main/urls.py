from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

from .views import views
from .views.register import Register
from .views.login import Login

urlpatterns = [
    url(r'^authenticate$', views.authentication_page, name='authentication_page'),
    url(r'^$', views.index, name='index'),
    url(r'^register$', csrf_exempt(Register.as_view()), name='register'),
    url(r'^login$', csrf_exempt(Login.as_view()), name='login'),

]
