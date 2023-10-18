from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    firstName = models.CharField(max_length=225, default="John")
    lastName = models.CharField(max_length=225, default="Doe")
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    profilePic = models.CharField(max_length=225)
    description = models.CharField(max_length=225, default="nothing to see here")
    
    username = None         # uses none due to login wanting to be handled by email not username

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [email, password]

class Group(models.Model):
    name = models.CharField(max_length=225)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)