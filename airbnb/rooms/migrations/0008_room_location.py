# Generated by Django 2.1.8 on 2019-06-01 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0007_auto_20190601_2253'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='location',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
