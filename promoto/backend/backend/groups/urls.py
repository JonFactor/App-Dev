from django.urls import path
from .views import AddEventToGroupView, AddUserToGroupView, RemoveUserFromGroupView, CreateGroupView, DeleteGroupView, GetAllGroupsByTypeView, GetGroupViaUserView, GetGroupDataView

urlpatterns = [
    path("addEventToGroup", AddEventToGroupView.as_view()),
    path("addUserToGroup", AddUserToGroupView.as_view()),
    path("removeUserFromGroup", RemoveUserFromGroupView.as_view()),
    path("createGroup", CreateGroupView.as_view()),
    path("deleteGroupView", DeleteGroupView.as_view()),
    path("getAllGroupsByType", GetAllGroupsByTypeView.as_view()),
    path("getGroupViaUser", GetGroupViaUserView.as_view()),
    path("getGroupDataView",  GetGroupDataView.as_view())
]
