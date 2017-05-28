import json

from datetime import datetime
from django.contrib.auth import login
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from django.template import loader
from django.urls import reverse
from django.views.generic.base import TemplateView
from ..models import CustomUser
from django.contrib.auth.models import User

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
        phone_number = data['phoneNumber']
        birth_date = data['birthDate']
        password = data['password']

        if CustomUser.objects.filter(user__username=email).exists():
            context = {'error': 'registerError'}
            template = loader.get_template(REGISTER_TEMPLATE_PATH)
            return HttpResponse(template.render(context, request))

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
                return redirect('/', user=customUser)

            else:
                error_message = 'Invalid login details supplied. Please try again'
                return HttpResponseRedirect(reverse('authentication_page', kwargs={'error': error_message}))
