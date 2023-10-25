from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EventSerializer
from .models import Event

# Create your views here.

class EventCreationView(APIView):
    def post(self, request):
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