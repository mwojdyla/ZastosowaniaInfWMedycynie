from rest_framework import generics

from main.models import MedicineApplication
from api.serializers import MedicineApplicationSerializer


class MedicineApplicationListCreate(generics.ListCreateAPIView):
    queryset = MedicineApplication.objects.all()
    serializer_class = MedicineApplicationSerializer


class MedicineApplicationUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = MedicineApplication.objects.all()
    serializer_class = MedicineApplicationSerializer

