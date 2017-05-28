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
            return JsonResponse({'email': user.email, 'id' : user.id}) # YOU SHOULD RETURN WHOLE USER BY SERIALISER
        else:
            context = {'error': 'loginError'}
            return JsonResponse(context, status=500)
