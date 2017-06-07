import json

from django.http import JsonResponse
from django.views.generic.base import TemplateView
from ..models import Medicine
from api.serializers import MedicineRetrieveSerializer

class MedicineFilter(TemplateView):
    def post(self, request):
        print request.body
        filters = json.loads(request.body)

        name                = filters['name']
        producer            = filters['producer']
        forms               = filters['forms']
        price               = filters['price']
        components          = filters['components']
        applications        = filters['applications']
        withPrescription    = filters['withPrescription']
        withoutPrescription = filters['withoutPrescription']

        medicines = Medicine.objects.all()

        if name:
            medicines = medicines.filter(name__icontains=name)

        if producer:
            medicines = medicines.filter(producer__icontains=producer)

        if forms:
            medicines = medicines.filter(form__in=forms)

        if price:
            medicines = medicines.filter(price__lt=price)

        if components:
            medicines = medicines.filter(composition__in=components)

        if applications:
            medicines = medicines.filter(application__in=applications)

        if withPrescription == True and withoutPrescription == False:
            medicines = medicines.filter(withPrescription=True)

        elif withoutPrescription == True and withPrescription == False:
            medicines = medicines.filter(withPrescription=False)

        serialized_data = [MedicineRetrieveSerializer(obj).data for obj in medicines]
        return JsonResponse(serialized_data, status=200, safe=False)