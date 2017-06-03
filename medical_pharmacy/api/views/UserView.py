import json

import django_filters
from django.http import JsonResponse
from rest_framework import generics
from django.views.generic.base import TemplateView

from main.models import User
from api.serializers import UserSerializer


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UpdateUsersPermissions(TemplateView):
    def post(self, request):
        print "Czy tu wchodzi?"
        data = json.loads(request.body)

        print(data)

        for user_id in data:
            user = User.objects.get(id=user_id)
            user.isPharmacist = not user.isPharmacist
            user.save()

        return JsonResponse({}, status=200)
