from __future__ import unicode_literals

from django.core.validators import RegexValidator, EmailValidator
from django.db import models

# Create your models here.


class Validator(object):
    phone_validator = RegexValidator(
        regex=r'^\+?\d{9,15}$',
        message='Numer telefonu musi byc w odpowiednim formacie, np.: [+99](999 999 999)|(999 99 99).',
        code='Nieodpowiedni format numeru telefonu'
    )
    email_validator = EmailValidator(
        message='Wprowadz prawidlowy adres email',
        code='Nieprawidlowy adres email'
    )


class User(models.Model):
    firstName = models.CharField(max_length=64,
                                 help_text='First name of user.')
    lastName = models.CharField(max_length=64,
                                help_text='Last name of user.')
    email = models.EmailField()
    phoneNumber = models.CharField(max)


class Medicine(models.Model):
    pass


class Substance(models.Model):
    pass


class MedicineType(models.Model):
    pass


class MedicineApplication(models.Model):
    pass


class MedicineUse(models.Model):
    pass


class Order(models.Model):
    pass




