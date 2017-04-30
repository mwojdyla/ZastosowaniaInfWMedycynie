from django.conf.urls import url

from .views import views

urlpatterns = [
    url(r'^authenticate$', views.authentication_page, name='authentication_page'),
    url(r'^$', views.index, name='index'),
]
