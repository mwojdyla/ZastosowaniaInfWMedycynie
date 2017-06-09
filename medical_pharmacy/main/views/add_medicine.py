import json

from django.http import JsonResponse
from django.views.generic.base import TemplateView
from ..models import Medicine, MedicineForm

class AddMedicine(TemplateView):
    def post(self, request):
        medicine_details = json.loads(request.body)

        #medicine details
        name = medicine_details['name']
        producer = medicine_details['producer']
        price = medicine_details['price']
        path = medicine_details['imagePath']
        withPrescription = medicine_details['withPrescription']
        quantityInWarehouse = medicine_details['quantityInWarehouse']
        quantityInPackage = medicine_details['quantityInPackage']
        unit = medicine_details['unit']
        components = medicine_details['composition']
        application = medicine_details['applications']
        form_id = medicine_details['form']
        substitutes_strings = medicine_details.get('substitutes', [])
        use = medicine_details['use']
        date = medicine_details['validityPeriod']

        form_object = MedicineForm.objects.get(id=form_id)

        substitutes = []
        strings_splits = [element.split(" ", 1) for element in substitutes_strings]
        for parts in strings_splits:
            for substitute in Medicine.objects.filter(name=parts[0], producer=parts[1]):
                substitutes.append(substitute)

        new_medicine = Medicine(
            name=name,
            producer=producer,
            withPrescription=withPrescription,
            validityPeriod=date,
            imagePath=path,
            price=price,
            use=use,
            quantityInWarehouse=quantityInWarehouse,
            quantityInPackage=quantityInPackage,
            unit=unit,
        )

        new_medicine.form = form_object
        new_medicine.save()
        new_medicine.composition.add(*components)
        new_medicine.application.add(*application)
        new_medicine.substitutes.add(*substitutes)


        for substitute in substitutes:
            substitute.substitutes.add(new_medicine)

        return JsonResponse({})
