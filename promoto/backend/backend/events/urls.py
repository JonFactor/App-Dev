from django.urls import path
from .views import EventCreationView, EventCollectionView, EventSingularGetView

urlpatterns = [
    path("eventCreate", EventCreationView.as_view()),
    path("eventCollection", EventCollectionView.as_view()),
    path("eventData", EventSingularGetView.as_view())
] 