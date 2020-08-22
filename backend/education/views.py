from rest_framework import viewsets

from education.serializers import ProgrammeSerializer, InstitutionSerializer
from education.models import Programme, Institution


class ProgrammeViewset(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Programme instances.
    """

    serializer_class = ProgrammeSerializer
    queryset = Programme.objects.all()


class InstitutionViewset(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Institution instances.
    """

    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
