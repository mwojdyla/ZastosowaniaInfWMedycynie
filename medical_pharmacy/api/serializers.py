from rest_framework import serializers
from main.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'firstName', 'lastName', 'email', 'phoneNumber', 'birthDate', 'isPharmacist', 'grantor',
                  'givingRightsDate')


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ('id', 'name', 'producent', 'validityPeriod', 'withPrescription', 'composition', 'substitutes',
                  'imagePath', 'price', 'quantityInWarehouse', 'quantityInPackage', 'form', 'application', 'use')


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


class MedicineUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineUse
        fields = ('id', 'usage')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'date', 'purchaser', 'address')