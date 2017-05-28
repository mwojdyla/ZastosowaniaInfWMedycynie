from __future__ import unicode_literals

from django.contrib.auth.models import User
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
    zip_code_validator = RegexValidator(
        regex=r'^\d{2}-\d{3}$',
        message='Kod pocztowy musi byc w odpowiednim formacie: 99-999.',
        code='Nieprawidlowy kod pocztowy.'
    )


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    zipCode = models.CharField(max_length=6,
                               validators=[Validator.zip_code_validator],
                               help_text='Zip code as complement to the address.')
    locality = models.CharField(max_length=64,
                                help_text='Indicates the user\'s place of residence.')
    address = models.TextField(max_length=256,
                               help_text='Exact user\'s address.')
    phoneNumber = models.CharField(max_length=15,
                                   null=True,
                                   blank=True,
                                   validators=[Validator.phoneValidator],
                                   help_text='Phone number of the company.')
    birthDate = models.DateField(help_text='Birth date of the user.')
    isPharmacist = models.BooleanField(default=False)
    grantor = models.ForeignKey('self',
                                blank=True,
                                null=True,
                                help_text='Describes who gave rights for user.')
    givingRightsDate = models.DateField(blank=True,
                                        null=True,
                                        help_text='Describes when rights were given')
    last_login = models.DateTimeField(null=True,
                                      blank=True,
                                      help_text='Date of last login to the application.')


class Substance(models.Model):
    name = models.CharField(max_length=128,
                            help_text='')


class MedicineForm(models.Model):
    TYPE_CHOICES = (
        ('PILL', 'pill'),
        ('OINTMENT', 'ointment'),
        ('INJECTION', 'injection'),
        ('AEROSOL', 'aerosol'),
        ('CORE', 'core')
    )
    form = models.CharField(max_length=2,
                            choices=TYPE_CHOICES,
                            help_text='')


class MedicineApplication(models.Model):
    APPLICATION_CHOICES = (
        ('HEAD', 'Headache'),
        ('STOMACH', 'Stomachache'),
        ('ANTI_PRESSURE', 'AntiPressure'),
        ('ALLERGY', 'allergy'),
    )
    application = models.CharField(max_length=15,
                                   choices=APPLICATION_CHOICES,
                                   help_text='')


class PackageQuantity(models.Model):
    amount = models.IntegerField(help_text='')
    kind = models.CharField(max_length=32)


class Medicine(models.Model):
    name = models.CharField(max_length=64,
                            help_text='Name of the medicine.')
    producer = models.CharField(max_length=64,
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
    quantityInPackage = models.ForeignKey(PackageQuantity)
    form = models.ForeignKey(MedicineForm,
                             help_text='')
    application = models.ManyToManyField(MedicineApplication,
                                         help_text='')
    use = models.TextField(max_length=264,
                           help_text='')


class Order(models.Model):
    date = models.DateField(help_text='',
                            auto_now_add=True)
    purchaser = models.ForeignKey(User,
                                  help_text='')
    address = models.TextField(max_length=256,
                               help_text='')
    medicines = models.ManyToManyField(Medicine,
                                       help_text='')




