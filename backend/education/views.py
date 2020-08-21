from rest_framework import viewsets

from education.serializers import ProgrammeSerializer, UniversitySerializer
from education.models import Programme, University


class ProgrammeViewset(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Programme instances.
    """

    serializer_class = ProgrammeSerializer
    queryset = Programme.objects.all()


class UniversityViewset(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing University instances.
    """

    serializer_class = UniversitySerializer
    queryset = University.objects.all()
