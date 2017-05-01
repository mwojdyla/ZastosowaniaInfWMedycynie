from rest_framework import generics

from main.models import Medicine
from api.serializers import MedicineSerializer


class MedicineListCreate(generics.ListCreateAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


class MedicineUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
