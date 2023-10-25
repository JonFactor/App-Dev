from django.urls import path
from .views import EventCreationView, EventCollectionView, EventSingularGetViaIdView, EventSingularGetViaTitleView

urlpatterns = [
    path("eventCreate", EventCreationView.as_view()),
    path("eventCollection", EventCollectionView.as_view()),
    path("eventData", EventSingularGetViaIdView.as_view()),
    path("eventDataViaName", EventSingularGetViaTitleView.as_view())
] 