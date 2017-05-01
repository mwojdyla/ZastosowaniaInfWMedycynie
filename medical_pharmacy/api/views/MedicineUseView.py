from rest_framework import generics

from main.models import MedicineUse
from api.serializers import MedicineUseSerializer


class MedicineUseListCreate(generics.ListCreateAPIView):
    queryset = MedicineUse.objects.all()
    serializer_class = MedicineUseSerializer


class MedicineUseUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = MedicineUse.objects.all()
    serializer_class = MedicineUseSerializer