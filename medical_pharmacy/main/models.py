from __future__ import unicode_literals

# from django.contrib.auth.models import User
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


class User(models.Model):
    firstName = models.CharField(max_length=64)
    lastName = models.CharField(max_length=64)
    email = models.EmailField(unique=True,
                              validators=[Validator.emailValidator])
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
    password = models.CharField(max_length=128,
                                help_text='User\'s password to application in encoded form.')
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

    @staticmethod
    def is_authenticated():
        return True

    def __str__(self):
        return 'Owner: {first_name} {last_name}'.format(first_name=self.first_name, last_name=self.last_name)


class Substance(models.Model):
    name = models.CharField(max_length=128,
                            unique=True,
                            help_text='')


class MedicineForm(models.Model):
    form = models.CharField(max_length=50,
                            unique=True,
                            help_text='For example: PILL, OINTMENT, INJECTION, AEROSOL')


class MedicineApplication(models.Model):
    application = models.CharField(max_length=50,
                                   unique=True,
                                   help_text='For example: HEAD, STOMACH, ALLERGY')


class PackageQuantity(models.Model):
    amount = models.IntegerField(help_text='')
    kind = models.CharField(max_length=32)


class Warehouse(models.Model):
    pass


class Medicine(models.Model):
    BOOL_CHOICES = (
        (True, 'Yes'),
        (False, 'No')
    )

    name = models.CharField(max_length=64,
                            help_text='Name of the medicine.')
    producer = models.CharField(max_length=64,
                                help_text='')
    withPrescription = models.BooleanField(choices=BOOL_CHOICES, help_text='')
    substitutes = models.ManyToManyField('self',
                                         blank=True,
                                         help_text='Many-to-many field')
    composition = models.ManyToManyField(Substance,
                                         help_text='Many-to-many field')
    application = models.ManyToManyField(MedicineApplication,
                                         help_text='')
    warehouse = models.ForeignKey(Warehouse)
    validityPeriod = models.DateField(help_text='The term of validity of mentioned medicine.')
    imagePath = models.CharField(max_length=256,
                                 help_text='')
    price = models.FloatField(help_text='')
    quantityInPackage = models.ForeignKey(PackageQuantity)
    form = models.ForeignKey(MedicineForm,
                             help_text='')
    use = models.TextField(max_length=264)


class Order(models.Model):
    date = models.DateField(help_text='',
                            auto_now_add=True)
    purchaser = models.ForeignKey(User,
                                  help_text='')
    address = models.TextField(max_length=256,
                               help_text='')
    medicines = models.ManyToManyField(Medicine,
                                       help_text='')




