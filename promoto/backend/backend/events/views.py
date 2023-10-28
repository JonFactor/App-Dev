from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import EventSerializer, User2EventSerialzier
from .models import Event
from users.models import User
import jwt
from django.views.decorators.csrf import csrf_exempt
from groups.models import Group

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


class EventCreationView(APIView):
    @csrf_exempt
    def post(self, request):
        userId = getUser(request).id
        request.data.update({"owner":userId})   
        
        eventGroupName = request.data.get('eventGroup')
        eventGroup = Group.objects.filter(title = eventGroupName).first()
        eventGroupId = eventGroup.id
        
        request.data.pop("eventGroup")
        request.data.update({"eventGroup": eventGroupId})
        
        serializer = EventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class EventSingularGetViaIdView(APIView):
    def post(self, request):
        requId = request.data['id']
        event = Event.objects.filter(id = requId).first()
        serializer = EventSerializer(event, many=False)
        return Response(data=serializer.data)

class EventCollectionView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(data=serializer.data)
    
class EventSingularGetViaTitleView(APIView):
    def post(self, request):
        title = request.data['title']
        event = Event.objects.filter(title = title).first()
        serializer = EventSerializer(event)
        return Response(data=serializer.data)
    
class EventUserAssignmentView(APIView):
    # eventTitle, viaEmail, email, isOwner, isCoOwner, isGuest
    def post(self, request):
        
        userId = None
        if request.data['viaEmail'] == True:
            userId = User.objects.filter(email=request.data['email']).first().id
        else:
            userId = getUser(request).id
            
        event = Event.objects.filter(title = request.data["eventTitle"]).first()
        if event == None:
            raise "No Event With that title found"
        
        
        finalData = {
            "event":event.id,
            "user":userId,
            "isOwner":request.data['isOwner'],
            "isCoOwner":request.data['isCoOwner'],
            "isGuest":request.data["isGuest"]
        }
        
        seralizer = User2EventSerialzier(data=finalData)
        seralizer.is_valid(raise_exception=True)
        seralizer.save()
        return Response(seralizer.data)
            
        