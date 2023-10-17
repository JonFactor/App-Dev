from rest_framework import serializers
from .models import Event, Group


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'location', 'ownerId', 'date', 'group']

class GroupSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Group
        feilds = ['title', 'ownerId', 'creationDate', 'catigory', 'coverImg']