from rest_framework import serializers
from .models import Event, User2Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'location', 'owner', 'date', 'eventType', 'eventGroup', 'coverImg']
 
class User2EventSerialzier(serializers.ModelSerializer):
    class Meta:
        model = User2Event
        fields = ['event', 'user', 'isOwner', 'isCoOwner', 'isGuest']