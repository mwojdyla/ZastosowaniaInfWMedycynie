# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-06-09 06:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_auto_20170608_1746'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='document',
            field=models.CharField(default=None, max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='payType',
            field=models.CharField(default=None, max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='price',
            field=models.FloatField(default=None),
            preserve_default=False,
        ),
    ]
