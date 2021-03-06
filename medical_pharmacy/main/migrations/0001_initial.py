# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-23 13:40
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Medicine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of the medicine.', max_length=64)),
                ('producent', models.CharField(max_length=64)),
                ('validityPeriod', models.DateField(help_text='The term of validity of mentioned medicine.')),
                ('withPrescription', models.BooleanField(default=False)),
                ('imagePath', models.CharField(max_length=256)),
                ('price', models.FloatField()),
                ('quantityInWarehouse', models.IntegerField()),
                ('amount', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='MedicineApplication',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('application', models.CharField(choices=[('Null', 'Null'), ('Null2', 'Null2')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='MedicineForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('form', models.CharField(choices=[('PI', 'pill'), ('OI', 'ointment'), ('IN', 'injection'), ('AE', 'aerosol'), ('CO', 'core')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='MedicineUse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Substance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(help_text='First name of the user.', max_length=64)),
                ('lastName', models.CharField(help_text='Last name of the user.', max_length=64)),
                ('email', models.EmailField(help_text="User's email address.", max_length=254, unique=True, validators=[django.core.validators.EmailValidator(code='Nieprawidlowy adres email', message='Wprowadz prawidlowy adres email')])),
                ('phoneNumber', models.CharField(blank=True, help_text='Phone number of the company.', max_length=15, null=True, validators=[django.core.validators.RegexValidator(code='Nieodpowiedni format numeru telefonu', message='Numer telefonu musi byc w odpowiednim formacie, np.: [+99](999 999 999)|(999 99 99).', regex='^\\+?\\d{9,15}$')])),
                ('birthDate', models.DateField(help_text='Birth date of the user.')),
                ('password', models.CharField(help_text="User's password to account in encoded form.", max_length=128)),
                ('isPharmacist', models.BooleanField(default=False)),
                ('givingRightsDate', models.DateField(help_text='Describes when rights were given')),
                ('grantor', models.ForeignKey(help_text='Describes who gave rights for user.', on_delete=django.db.models.deletion.CASCADE, to='main.User')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='purchaser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.User'),
        ),
        migrations.AddField(
            model_name='medicine',
            name='application',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.MedicineApplication'),
        ),
        migrations.AddField(
            model_name='medicine',
            name='composition',
            field=models.ManyToManyField(to='main.Substance'),
        ),
        migrations.AddField(
            model_name='medicine',
            name='form',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.MedicineForm'),
        ),
        migrations.AddField(
            model_name='medicine',
            name='substitutes',
            field=models.ManyToManyField(related_name='_medicine_substitutes_+', to='main.Medicine'),
        ),
        migrations.AddField(
            model_name='medicine',
            name='use',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.MedicineUse'),
        ),
    ]
