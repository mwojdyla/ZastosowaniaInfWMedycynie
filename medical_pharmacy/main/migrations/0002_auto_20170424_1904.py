# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-24 19:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicine',
            old_name='amount',
            new_name='quantityInPackage',
        ),
        migrations.RenameField(
            model_name='medicineuse',
            old_name='description',
            new_name='usage',
        ),
        migrations.RemoveField(
            model_name='user',
            name='givingRightsDate',
        ),
        migrations.RemoveField(
            model_name='user',
            name='grantor',
        ),
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.TextField(default=None, max_length=256),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='medicine',
            name='application',
        ),
        migrations.AddField(
            model_name='medicine',
            name='application',
            field=models.ManyToManyField(to='main.MedicineApplication'),
        ),
        migrations.AlterField(
            model_name='medicineapplication',
            name='application',
            field=models.CharField(choices=[('HEAD', 'Headache'), ('STOMACH', 'Stomachache'), ('ANTI_PRESSURE', 'AntiPressure'), ('ALLERGY', 'allergy')], max_length=15),
        ),
        migrations.AlterField(
            model_name='medicineform',
            name='form',
            field=models.CharField(choices=[('PILL', 'pill'), ('OINTMENT', 'ointment'), ('INJECTION', 'injection'), ('AEROSOL', 'aerosol'), ('CORE', 'core')], max_length=2),
        ),
    ]
