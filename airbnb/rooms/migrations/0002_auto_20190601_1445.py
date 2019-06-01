# Generated by Django 2.1.8 on 2019-06-01 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='facility',
            name='help_text',
        ),
        migrations.RemoveField(
            model_name='facility',
            name='value',
        ),
        migrations.RemoveField(
            model_name='room',
            name='is_checkin_good',
        ),
        migrations.AddField(
            model_name='room',
            name='is_good_checkin',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AddField(
            model_name='room',
            name='room_rating',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='is_super_host',
            field=models.BooleanField(blank=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='room_self_checkin',
            field=models.BooleanField(blank=True),
        ),
    ]
