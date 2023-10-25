from rest_framework import serializers
from .models import Event2Group, User2Group, Group

class Event2GroupSerializer(serializers.ModelSerializer):
    model = Event2Group
    fields = ['group', 'event', 'isPromoted']
    
class User2GroupSerialzier(serializers.ModelSerializer):
    model = User2Group
    fields = ['user', 'group', 'isOwner', 'isCoOwner', 'isMember', 'isBanned']

class GroupSerializer(serializers.ModelSerializer):
    model = Group
    fields = ['title', 'description', 'image', 'owner', 'groupType']
