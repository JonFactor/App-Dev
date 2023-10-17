from django.urls import path
from .views import EventsView, GroupView

urlpatterns = [
    path("events", EventsView.as_view()),
    path("groups", GroupView.as_view())
]