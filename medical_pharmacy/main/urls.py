from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from .views import views
from .views.register import Register
from .views.login import Login
from .views.logout import logout_view
from .views.send_order_email import SendOrderEmail

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register$', csrf_exempt(Register.as_view()), name='register'),
    url(r'^login$', csrf_exempt(Login.as_view()), name='login'),
    url(r'^logout$', logout_view, name='logout_view'),
    url(r'^send-order-email$', SendOrderEmail.as_view(), name='send_order_email'),
]
