from django.urls import include, path

from education.views import ProgrammeViewset, InstitutionViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"programme", ProgrammeViewset, basename="programme")
router.register(r"institution", InstitutionViewset, basename="institution")

urlpatterns = [
    path('', include(router.urls)),
]
