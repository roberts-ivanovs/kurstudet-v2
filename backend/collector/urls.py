from django.urls import include, path
from rest_framework.routers import DefaultRouter

from collector.views import CollectedEmailsViewset

router = DefaultRouter()
router.register(r"emails", CollectedEmailsViewset, basename="emails")

urlpatterns = [
    path('', include(router.urls)),
]
