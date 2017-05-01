from rest_framework import generics

from main.models import MedicineForm
from api.serializers import MedicineFormSerializer


class MedicineFormListCreate(generics.ListCreateAPIView):
    queryset = MedicineForm.objects.all()
    serializer_class = MedicineFormSerializer


class MedicineFormUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = MedicineForm.objects.all()
    serializer_class = MedicineFormSerializer
