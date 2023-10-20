# Generated by Django 4.2.6 on 2023-10-19 13:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("events", "0003_rename_group_event_eventtype"),
        ("users", "0004_user_description_alter_user_profilepic_group"),
    ]

    operations = [
        migrations.AddField(
            model_name="group",
            name="description",
            field=models.CharField(max_length=225, null="nothing to see here"),
            preserve_default="nothing to see here",
        ),
        migrations.AddField(
            model_name="group",
            name="events",
            field=models.ManyToManyField(to="events.event"),
        ),
        migrations.AddField(
            model_name="user",
            name="blocked",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name="user",
            name="favColor",
            field=models.CharField(max_length=225, null="black"),
            preserve_default="black",
        ),
        migrations.AddField(
            model_name="user",
            name="followers",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name="user",
            name="following",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(max_length=255, unique=True),
        ),
    ]