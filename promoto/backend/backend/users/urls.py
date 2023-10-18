from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, LoginViaCookiesView, SetProfileView

urlpatterns = [
    path("register", RegisterView.as_view()),
    path("setProfile", SetProfileView.as_view()),
    path("login", LoginView.as_view()),
    path("user", UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path("cookieLogin", LoginViaCookiesView.as_view())
]
