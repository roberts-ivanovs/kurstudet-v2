from django.urls import include, path

from education.views import ProgrammeViewset, UniversityViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"programme", ProgrammeViewset, basename="programme")
router.register(r"university", UniversityViewset, basename="programme")

urlpatterns = [
    path('', include(router.urls)),
]
