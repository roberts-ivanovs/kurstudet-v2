from rest_framework import permissions, viewsets

from education.models import Institution, Programme
from education.serializers import InstitutionSerializer, ProgrammeSerializer
from education.permissions import (
    IsOwnerOrReadOnlyInstitution,
    IsOwnerOrReadOnlyProgramme,
)


class ProgrammeViewset(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Programme instances.
    """

    serializer_class = ProgrammeSerializer
    queryset = Programme.objects.all()
    permission_classes = [
        permissions.DjangoModelPermissionsOrAnonReadOnly,
        IsOwnerOrReadOnlyProgramme,
    ]


class InstitutionViewset(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Institution instances.
    """

    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
    permission_classes = [
        permissions.DjangoModelPermissionsOrAnonReadOnly,
        IsOwnerOrReadOnlyInstitution,
    ]
