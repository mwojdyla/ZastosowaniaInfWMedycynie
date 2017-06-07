from rest_framework import generics

from main.models import PackageQuantity
from api.serializers import PackageQuantitySerializer


class PackageQuantityListCreate(generics.ListCreateAPIView):
    queryset = PackageQuantity.objects.all()
    serializer_class = PackageQuantitySerializer


class PackageQuantityUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = PackageQuantity.objects.all()
    serializer_class = PackageQuantitySerializer
