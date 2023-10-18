from django.db import models
import datetime

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=225)
    location = models.CharField(max_length=225)
    ownerId = models.BigIntegerField()
    date = models.DateField(datetime.datetime.now)
    group = models.CharField(max_length=225, null="misc")
    coverImg = models.CharField(max_length=225, default="test.png")
    
class Group(models.Model):
    title = models.CharField(max_length=225)
    ownerId = models.BigIntegerField()
    creationDate = models.DateField(datetime.datetime.now)
    groupCatigory = models.CharField(max_length=225, null="misc")
    coverImg = models.ImageField(upload_to="images/", default=None)