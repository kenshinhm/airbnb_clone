# Generated by Django 2.1.8 on 2019-06-10 07:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0014_review_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='rating',
        ),
    ]