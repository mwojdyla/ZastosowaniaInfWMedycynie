import django_filters
from rest_framework import generics

from main.models import Substance
from api.serializers import SubstanceSerializer


class SubstanceListCreate(generics.ListCreateAPIView):
    queryset = Substance.objects.all()
    serializer_class = SubstanceSerializer


class SubstanceUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Substance.objects.all()
    serializer_class = SubstanceSerializer
