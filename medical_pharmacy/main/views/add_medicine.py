import json

from django.http import JsonResponse
from django.views.generic.base import TemplateView
from ..models import Medicine, Substance, MedicineApplication, MedicineForm

class AddMedicine(TemplateView):
    def post(self, request):
        medicine_details = json.loads(request.body)
        print(medicine_details)

        #medicine details
        name = medicine_details['name']
        producer = medicine_details['producer']
        price = medicine_details['price']
        path = medicine_details['imagePath']
        withPrescription = medicine_details['withPrescription']
        quantityInWarehouse = medicine_details['quantityInWarehouse']
        quantityInPackage = medicine_details['quantityInPackage']
        unit = medicine_details['unit']
        components = medicine_details['components']
        application = medicine_details['applications']
        form_id = medicine_details['forms']
        substitutes_strings = medicine_details['substitutes']
        use = medicine_details['useDescription']
        date = medicine_details['warrantyDate']

        form_object = MedicineForm.objects.get(id=form_id)

        substitutes_ids = []
        strings_splits = [element.split(" ", 1) for element in substitutes_strings]
        for parts in strings_splits:
            for substitute in Medicine.objects.filter(name=parts[0], producer=parts[1]):
                substitutes_ids.append(substitute.id)

        print substitutes_ids
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
        new_medicine.substitutes.add(*substitutes_ids)


        for med_id in substitutes_ids:
            current_list = Medicine.objects.get(id=med_id).substitutes
            current_list.append(new_medicine.id)
            changes = Medicine.objects.filter(id=med_id).update(
                substitutes=current_list
            )
            if changes == 0:
                return JsonResponse({'error': 'update od medicine\'s substitutes went wrong'},
                                    status=500)

        return JsonResponse({})
