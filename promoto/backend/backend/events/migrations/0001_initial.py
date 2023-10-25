# Generated by Django 4.2.6 on 2023-10-25 16:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=225)),
                ('location', models.CharField(max_length=225)),
                ('ownerId', models.IntegerField()),
                ('date', models.DateField(verbose_name=datetime.datetime.now)),
                ('eventType', models.CharField(max_length=225, null='misc')),
                ('coverImg', models.CharField(default='test.png', max_length=225)),
            ],
        ),
    ]
