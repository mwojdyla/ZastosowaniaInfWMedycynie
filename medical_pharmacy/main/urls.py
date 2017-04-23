from django.conf.urls import url

from .views import views

urlpatterns = [
    url(r'^main$', views.index, name='index'),
    url(r'^$', views.titlePage, name='titlePage'),
]