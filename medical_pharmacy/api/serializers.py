from rest_framework import serializers
from main.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'firstName', 'lastName', 'email', 'zipCode', 'locality', 'address', 'phoneNumber',
                  'birthDate', 'isPharmacist', 'grantor', 'givingRightsDate')


class PackageQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageQuantity
        fields = ('id', 'amount', 'kind')


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ('id',)


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


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ('id', 'name', 'producer', 'withPrescription', 'composition', 'substitutes',
                  'application', 'warehouse', 'validityPeriod', 'imagePath', 'price', 'quantityInPackage',
                  'form', 'use')


class MedicineRetrieveSerializer(serializers.ModelSerializer):
    composition = SubstanceSerializer(many=True, read_only=True)
    application = MedicineApplicationSerializer(many=True, read_only=True)
    substitutes = MedicineSerializer(many=True, read_only=True)
    form = MedicineFormSerializer()
    quantityInPackage = PackageQuantitySerializer()

    class Meta:
        model = Medicine
        fields = ('id', 'name', 'producer', 'withPrescription', 'composition', 'substitutes',
                  'application', 'warehouse', 'validityPeriod', 'imagePath', 'price', 'quantityInPackage',
                  'form', 'use')