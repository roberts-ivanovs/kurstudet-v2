from django.urls import include, path
from knox import views as knox_views
from rest_framework.routers import DefaultRouter

from core.views import GroupViewSet, LoginAPI, RegisterAPI, UserViewSet

router = DefaultRouter()
router.register(r"user", UserViewSet, basename="user")
router.register(r"group", GroupViewSet, basename="group")

router.urls

urlpatterns = [
    path("", include(router.urls)),
    path(r"register/", RegisterAPI.as_view(), name="register"),
    path(r"login/", LoginAPI.as_view(), name="login"),
    path(r"logout/", knox_views.LogoutView.as_view(), name="logout"),
]
