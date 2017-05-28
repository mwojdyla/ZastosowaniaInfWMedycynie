import json

from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import loader
from django.views.generic.base import TemplateView

REGISTER_TEMPLATE_PATH = 'main/user-authorization/authentication_page.html'


class Login(TemplateView):
    def post(self, request):
        data = json.loads(request.body)
        user = authenticate(username=data['email'], password=data['password'])

        if user is not None:
            login(request, user)
            return redirect('/', user=user)
        else:
            context = {'error': 'loginError'}
            template = loader.get_template(REGISTER_TEMPLATE_PATH)
            return HttpResponse(template.render(context, request))
