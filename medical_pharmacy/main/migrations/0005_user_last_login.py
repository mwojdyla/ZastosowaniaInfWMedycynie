# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-23 18:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20170523_1814'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(blank=True, help_text='Date of last login to the application.', null=True),
        ),
    ]
