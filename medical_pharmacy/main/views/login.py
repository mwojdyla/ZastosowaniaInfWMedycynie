import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.generic.base import TemplateView
from api.serializers import UserSerializer

REGISTER_TEMPLATE_PATH = 'main/user-authorization/authentication_page.html'


class Login(TemplateView):
    def post(self, request):
        data = json.loads(request.body)
        user = authenticate(username=data['email'], password=data['password'])

        if user is not None:
            login(request, user)
            return JsonResponse(UserSerializer(user).data)
        else:
            context = {'error': 'loginError'}
            return JsonResponse(context, status=500)
