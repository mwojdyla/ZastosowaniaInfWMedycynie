from main.models import User
from django.contrib.auth.hashers import check_password
import traceback


class AuthenticationBackend(object):
    def authenticate(self, username=None, password=None):
        try:
            profile = User.objects.get(email=username)
            if check_password(password, profile.password):
                profile.username = username
                return profile
            else:
                return None
        except:
            traceback.print_exc()
            return None

    def get_user(self, user_id):
        try:
            usr = User.objects.get(pk=user_id)
            return usr
        except User.DoesNotExist:
            return None
