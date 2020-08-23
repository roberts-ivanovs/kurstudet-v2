from rest_framework import viewsets

from education.models import Institution, Programme
from education.serializers import InstitutionSerializer, ProgrammeSerializer


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
