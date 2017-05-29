from rest_framework import serializers
from main.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'firstName', 'lastName', 'email', 'zipCode', 'locality', 'address', 'phoneNumber',
                  'birthDate', 'isPharmacist', 'grantor', 'givingRightsDate')


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ('id', 'name', 'producer', 'validityPeriod', 'withPrescription', 'composition', 'substitutes',
                  'imagePath', 'price', 'quantityInWarehouse', 'quantityInPackage', 'form', 'application', 'use')
        depth = 2


class SubstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Substance
        fields = ('id', 'name')


class MedicineFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineForm
        fields = ('id', 'form')


class MedicineApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineApplication
        fields = ('id', 'application')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'date', 'purchaser', 'address', 'medicines')
