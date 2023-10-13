from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None         # uses none due to login wanting to be handled by email not username

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [email, password]
