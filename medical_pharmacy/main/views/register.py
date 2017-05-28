import json

from datetime import datetime
from django.contrib.auth import login
from django.http import JsonResponse
from django.views.generic.base import TemplateView
from ..models import CustomUser
from django.contrib.auth.models import User
from api.serializers import UserSerializer

REGISTER_TEMPLATE_PATH = 'main/user-authorization/authentication_page.html'


class Register(TemplateView):
    def post(self, request):
        data = json.loads(request.body)

        first_name = data['firstName']
        last_name = data['lastName']
        email = data['email']
        zip_code = data['zipCode']
        locality = data['locality']
        address = data['address']
        phone_number = data.get('phoneNumber', '')
        birth_date = data['birthDate']
        password = data['password']

        if CustomUser.objects.filter(user__username=email).exists():
            context = {'error': 'registerError'}
            return JsonResponse(context, status=500)

        else:
            user = User.objects.create_user(
                username=email,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password,
            )

            if user is not None:
                user.save()
                customUser = CustomUser.objects.create(
                    user=user,
                    zipCode=zip_code,
                    locality=locality,
                    address=address,
                    phoneNumber=phone_number,
                    birthDate=birth_date,
                    last_login=datetime.now()
                )
                login(request, customUser)
                return JsonResponse({'email':customUser.email})

            else:
                error_message = 'Invalid login details supplied. Please try again'
                return JsonResponse({'error': error_message}, status=500)
