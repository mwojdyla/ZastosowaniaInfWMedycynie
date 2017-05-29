import json

from datetime import datetime
from django.contrib.auth import login
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.generic.base import TemplateView
from ..models import User
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
        password = make_password(data['password'])

        if User.objects.filter(email=email).exists():
            context = {'error': 'registerError'}
            return JsonResponse(context, status=500)

        else:
            user = User(
                firstName=first_name,
                lastName=last_name,
                email=email,
                zipCode=zip_code,
                locality=locality,
                address=address,
                phoneNumber=phone_number,
                birthDate=birth_date,
                password=password,
                last_login=datetime.now()
            )

            if user is not None:
                user.save()
                login(request, user)
                return JsonResponse(UserSerializer(user).data)

            else:
                error_message = 'Invalid login details supplied. Please try again'
                return JsonResponse({'error': error_message}, status=500)
