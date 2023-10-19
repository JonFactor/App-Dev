from django.db import models
from django.contrib.auth.models import AbstractUser
from events.models import Event

# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    firstName = models.CharField(max_length=225, default="John")
    lastName = models.CharField(max_length=225, default="Doe")
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    profilePic = models.CharField(max_length=225, blank=True)
    description = models.CharField(max_length=225, default="nothing to see here")
    favColor = models.CharField(max_length=225, null="black")
    
    # other users 
    following = models.ManyToManyField("self",  blank=True)
    followers = models.ManyToManyField("self", blank=True)
    blocked = models.ManyToManyField("self", blank=True)
    
    username = None         # uses none due to login wanting to be handled by email not username

    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = [email, password]

class Group(models.Model):
    name = models.CharField(max_length=225)
    creator = models.ForeignKey("User", on_delete=models.CASCADE)
    description = models.CharField(max_length=225, null="nothing to see here")
    events = models.ManyToManyField("events.Event")
    #participants = models.ManyToManyField("User")