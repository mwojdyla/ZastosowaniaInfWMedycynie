# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-06-03 11:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_auto_20170603_1121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='composition',
            field=models.ManyToManyField(help_text='Many-to-many field', to='main.Substance'),
        ),
        migrations.AlterField(
            model_name='medicine',
            name='substitutes',
            field=models.ManyToManyField(blank=True, help_text='Many-to-many field', related_name='_medicine_substitutes_+', to='main.Medicine'),
        ),
    ]
