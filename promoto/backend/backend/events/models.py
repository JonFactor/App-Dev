from django.db import models
import datetime

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=225, unique=True)
    location = models.CharField(max_length=225)
    owner = models.ForeignKey("users.User", on_delete=models.CASCADE, default=1)
    date = models.DateField(datetime.datetime.now)
    eventType = models.CharField(max_length=225, null="misc")
    coverImg = models.CharField(max_length=225, default="test.png")

class User2Event(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    event = models.ForeignKey("event", on_delete=models.CASCADE)
    isOwner = models.BooleanField(default=False)
    isCoOwner = models.BooleanField(default=False)
    isGuest = models.BooleanField(default=False)