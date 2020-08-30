from django.urls import include, path

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from core.views import GroupViewSet, RegisterAPI, UserViewSet

router = DefaultRouter()
router.register(r"user", UserViewSet, basename="user")
router.register(r"group", GroupViewSet, basename="group")

router.urls

urlpatterns = [
    path("", include(router.urls)),
    path("register/", RegisterAPI.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
