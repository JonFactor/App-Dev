from django.db import models
import datetime

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=225)
    location = models.CharField(max_length=225)
    ownerId = models.IntegerField()
    date = models.DateField(datetime.datetime.now)
    eventType = models.CharField(max_length=225, null="misc")
    coverImg = models.CharField(max_length=225, default="test.png")
 