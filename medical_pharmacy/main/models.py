from __future__ import unicode_literals

from django.core.validators import RegexValidator, EmailValidator
from django.db import models

# Create your models here.


class Validator(object):
    phoneValidator = RegexValidator(
        regex=r'^\+?\d{9,15}$',
        message='Numer telefonu musi byc w odpowiednim formacie, np.: [+99](999 999 999)|(999 99 99).',
        code='Nieodpowiedni format numeru telefonu'
    )
    emailValidator = EmailValidator(
        message='Wprowadz prawidlowy adres email',
        code='Nieprawidlowy adres email'
    )


class User(models.Model):
    firstName = models.CharField(max_length=64,
                                 help_text='First name of the user.')
    lastName = models.CharField(max_length=64,
                                help_text='Last name of the user.')
    email = models.EmailField(unique=True,
                              validators=[Validator.emailValidator],
                              help_text='User\'s email address.')
    phoneNumber = models.CharField(max_length=15,
                                   null=True,
                                   blank=True,
                                   validators=[Validator.phoneValidator],
                                   help_text='Phone number of the company.')
    birthDate = models.DateField(help_text='Birth date of the user.')
    password = models.CharField(max_length=128,
                                help_text='User\'s password to account in encoded form.')
    isPharmacist = models.BooleanField(default=False,
                                       help_text='')
    grantor = models.ForeignKey('self',
                                help_text='Describes who gave rights for user.')
    givingRightsDate = models.DateField(help_text='Describes when rights were given')


class Substance(models.Model):
    name = models.CharField(max_length=128,
                            help_text='')

class MedicineForm(models.Model):
    TYPE_CHOICES = (
        ('PI', 'pill'),
        ('OI', 'ointment'),
        ('IN', 'injection'),
        ('AE', 'aerosol'),
        ('CO', 'core')
    )
    form = models.CharField(max_length=10,
                            choices=TYPE_CHOICES,
                            help_text='')


class MedicineApplication(models.Model):
    APPLICATION_CHOICES = (
        ('Null', 'Null'),
        ('Null2', 'Null2'),
    )
    application = models.CharField(max_length=10,
                                   choices=APPLICATION_CHOICES,
                                   help_text='')


class MedicineUse(models.Model):
    description = models.TextField(help_text='')

class Medicine(models.Model):
    name = models.CharField(max_length=64,
                            help_text='Name of the medicine.')
    producent = models.CharField(max_length=64,
                                 help_text='')
    validityPeriod = models.DateField(help_text='The term of validity of mentioned medicine.')
    withPrescription = models.BooleanField(default=False,
                                           help_text='')
    composition = models.ManyToManyField(Substance,
                                         help_text='')
    substitutes = models.ManyToManyField('self',
                                         help_text='')
    imagePath = models.CharField(max_length=256,
                                 help_text='')
    price = models.FloatField(help_text='')
    quantityInWarehouse = models.IntegerField(help_text='')
    amount = models.IntegerField(help_text='')
    form = models.ForeignKey(MedicineForm,
                             help_text='')
    application = models.ForeignKey(MedicineApplication,
                                    help_text='')
    use = models.ForeignKey(MedicineUse,
                            help_text='')


class Order(models.Model):
    date = models.DateField(help_text='',
                            auto_now_add=True)
    purchaser = models.ForeignKey(User,
                                  help_text='')





