# Generated by Django 4.2.6 on 2023-10-30 00:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("events", "0004_usereventpreferences"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="description",
            field=models.CharField(default="nothing to see here...", max_length=225),
        ),
    ]