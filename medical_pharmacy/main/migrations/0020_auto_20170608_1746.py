# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-06-08 17:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0019_auto_20170607_1948'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicine',
            name='warehouse',
        ),
        migrations.AddField(
            model_name='medicine',
            name='quantityInWarehouse',
            field=models.IntegerField(default=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='medicine',
            name='unit',
            field=models.CharField(default=None, max_length=32),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='medicine',
            name='quantityInPackage',
            field=models.IntegerField(),
        ),
        migrations.DeleteModel(
            name='PackageQuantity',
        ),
        migrations.DeleteModel(
            name='Warehouse',
        ),
    ]
