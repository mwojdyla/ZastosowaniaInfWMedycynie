from django.http import JsonResponse
from django.views.generic.base import TemplateView
from ..models import Medicine


class GetSubstitutesStrings(TemplateView):
    def get(self, request, **kwargs):
        substitutes_strings = []
        # medicines = Medicine.objects.all()

        for medicine in Medicine.objects.all():
            concatenated_string = "{0} {1}".format(medicine.name, medicine.producer)

            if concatenated_string not in substitutes_strings:
                substitutes_strings.append(concatenated_string)

        return JsonResponse(substitutes_strings, status=200, safe=False)
