from django.http import JsonResponse
from rest_framework import generics
from django.views.generic.base import TemplateView

from main.models import Medicine
from api.serializers import MedicineSerializer, MedicineRetrieveSerializer


class MedicineListCreate(generics.ListCreateAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


class MedicineUpdateDelete(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


class MedicineRetrieve(generics.RetrieveAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineRetrieveSerializer


