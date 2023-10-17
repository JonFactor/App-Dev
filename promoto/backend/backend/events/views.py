from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EventSerializer, GroupSerialzier
from .models import Event

# Create your views here.

class EventsView(APIView):
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)

        return Response(data=serializer.data)
        
class GroupView(APIView):
    def post(self, request):
        serializer = GroupSerialzier(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        pass