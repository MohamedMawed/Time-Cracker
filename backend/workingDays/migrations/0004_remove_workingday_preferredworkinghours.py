# Generated by Django 2.2.8 on 2020-03-17 17:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workingDays', '0003_auto_20200317_1105'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workingday',
            name='preferredWorkingHours',
        ),
    ]