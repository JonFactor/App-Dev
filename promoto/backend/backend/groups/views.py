from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import Event2GroupSerializer, User2GroupSerialzier, GroupSerializer
from users.models import User
from users.serializers import UserSerializer
from events.models import Event
from .models import Group, User2Group
from events.serializers import EventSerializer
import jwt
import datetime

# Create your views here.

def getUser(request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('jwt expired signature')

        return User.objects.filter(id=payload['id']).first()

class AddEventToGroupView(APIView):
    def post(self, request):
        
        group = request.data["groupName"]
        event = request.data["eventName"]
        isPromo = request.data["isPromoted"]
        
        eventData = Event.objects.filter(title = event).first()
        eventSerializer = EventSerializer(eventData)
        
        groupData = Group.objects.filter(title = group).first()
        groupSerializer = GroupSerializer(groupData)
        
        requestData = {
            "group": groupSerializer.data.id,
            "event": eventSerializer.data.id,
            "isPromo": isPromo
        }
        
        serializer = Event2GroupSerializer(requestData)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer)

class CreateGroupView(APIView):
    def post(self, request):
        # title, description, image, owner, groupType
        user = getUser(request)
        requestData = {
            "title": request.data['title'],
            "desctiption": request.data['description'],
            "image": request.data["image"],
            "owner": user.data.id,
            "groupType": request.data['groupType']
        }
        
        serializer = GroupSerializer(requestData)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer)
        
        
class DeleteGroupView(APIView):
    def post(self,request):
        user = getUser(request)
        # todo
    
class GetAllGroupsByTypeView(APIView):
    def post(self, request):
        requType = request.data['groupType']
        groups = Group.objects.filter(groupType = requType)
        serializer = GroupSerializer(groups, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer)
        
        
class GetGroupDataView(APIView):
    def post(self, request):
        requTitle = request.data['title']
        group = Group.objects.filter(title=requTitle).first()
        serialzier = GroupSerializer(group)
        serialzier.is_valid(raise_exception=True)
        serialzier.save()
        return Response(serialzier)
    
class GetGroupViaUserView(APIView):
    def post(self, request):
        user = getUser(request)
        #todo

class AddUserToGroupView(APIView):
    def post(self, request):
        email = request.data['email']
        title = request.data['title']
        isOwner = request.data['owner']
        isCoOwner = request.data['coowner']
        isMember = request.data['member']
        isBlocked = request.data['blocked']
        
        userRaw = User.objects.filter(email=email).first()
        userId = UserSerializer(userRaw).data.id
        
        groupRaw = Group.objects.filter(title=title).first()
        groupId = GroupSerializer(groupRaw).data.id
        
        requData = {
            "user": userId,
            "group": groupId,
            "isOwner": isOwner,
            "isCoOwner": isCoOwner,
            "isMember": isMember,
            "isBlocked": isBlocked
        }
        
        serializer = User2GroupSerialzier(requData)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer)
        
    
class RemoveUserFromGroupView(APIView):
    def post(self, request):
        email = request.data['email']
        title = request.data['title']
        
        userRaw = User.objects.filter(email=email).first()
        userId = UserSerializer(userRaw).data.id
        
        groupRaw = Group.objects.filter(title=title).first()
        groupId = GroupSerializer(groupRaw).data.id
        
        userToGroupRaw = User2Group.objects.filter(user=userId, group=groupId)
        userToGroupSerializer = User2GroupSerialzier(userToGroupRaw)
        userToGroupSerializer.is_valid(raise_exception=True)
        userToGroupSerializer.save()
        
        return Response(userToGroupSerializer)