import json

from django.http import JsonResponse
from django.views.generic.base import TemplateView
from ..models import User


class UpdateUsersPermissions(TemplateView):
    def post(self, request):
        data = json.loads(request.body)

        for user_id in data:
            user = User.objects.get(id=user_id)
            user.isPharmacist = not user.isPharmacist
            user.save()

        return JsonResponse({}, status=200)
