from django.urls import include, path
from rest_framework.routers import DefaultRouter

from education.views import InstitutionViewset, ProgrammeViewset

router = DefaultRouter()
router.register(r"programme", ProgrammeViewset, basename="programme")
router.register(r"institution", InstitutionViewset, basename="institution")

urlpatterns = [
    path('', include(router.urls)),
]
