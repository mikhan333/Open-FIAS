# Generated by Django 2.1.7 on 2019-04-01 19:05

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='object',
            name='address',
            field=django.contrib.postgres.fields.jsonb.JSONField(null=True, verbose_name='адрес'),
        ),
    ]
