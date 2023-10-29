from django.urls import path
from .views import EventCreationView, EventCollectionView, EventSingularGetViaIdView, EventSingularGetViaTitleView, EventUserAssignmentView, UserPreferenceSetView

urlpatterns = [
    path("eventCreate", EventCreationView.as_view()),
    path("eventCollection", EventCollectionView.as_view()),
    path("eventData", EventSingularGetViaIdView.as_view()),
    path("eventDataViaName", EventSingularGetViaTitleView.as_view()),
    path("event2userCreate", EventUserAssignmentView.as_view()),
    path("eventUserPreferencesSet", UserPreferenceSetView.as_view()),
] 