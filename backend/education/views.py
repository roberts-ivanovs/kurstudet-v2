from rest_framework import permissions, viewsets

from education.models import Institution, Programme
from education.serializers import InstitutionSerializer, ProgrammeSerializer
from education.permissions import (
    IsOwnerOrReadOnlyInstitution,
    IsOwnerOrReadOnlyProgramme,
)


class ProgrammeViewset(viewsets.ModelViewSet):
    """
    CRUD `education.models.Programme` items

    Permissions
    ----------
    - Anyone can view the items, but people who have the set permissions to the
        model can also operate with the items themselves
    - Anyone can view the items, but only managers for the FK institituin can
        edit it
    ----------

    Response item
    ----------
    {
        "id": int,
        "name": str,
        "institution": int,
        "degree": education.models.Programme.Degrees.choices,
        "duration_years": int,
        "faculty": str,
        "learning_type": education.models.Programme.LearningTypes.choices,
        "full_time": str,
        "budget_places": int,
        "total_places": int,
        "study_costs": int,
        "study_language": str,
        "website": str,
        "description": str,
    }

    Method calls
    ----------
    :url - base URL
    :id - primary key for the model
    :obj - a single response item

    GET     ":url"      -> [:obj, :obj, ... ]                   | status 200
    GET     ":url/:id"  -> :obj                                 | status 200
    POST    ":url"      -> :obj (the newly created object)      | status 201
    PUT     ":url/:id"  -> :obj (the newly updated object)      | status 200
    DELETE  ":url"      -> { "message": str }                   | status 204
    DELETE  ":url/:id"  -> { "message": str }                   | status 204
    """

    serializer_class = ProgrammeSerializer
    queryset = Programme.objects.all()
    permission_classes = [
        permissions.DjangoModelPermissionsOrAnonReadOnly,
        IsOwnerOrReadOnlyProgramme,
    ]


class InstitutionViewset(viewsets.ModelViewSet):
    """
    CRUD `education.models.Institution` items

    Permissions
    ----------
    - Anyone can view the items, but people who have the set permissions to the
        model can also operate with the items themselves
    - Anyone can view the items, but only managers for the institituin can edit
        it
    ----------

    Response item
    ----------
    {
        "id": int,
        "name": str,
        "abbr": str,
        "location": str,
        "website": str,
        "managers": [int, ..],
    }

    Method calls
    ----------
    :url - base URL
    :id - primary key for the model
    :obj - a single response item

    GET     ":url"      -> [:obj, :obj, ... ]                   | status 200
    GET     ":url/:id"  -> :obj                                 | status 200
    POST    ":url"      -> :obj (the newly created object)      | status 201
    PUT     ":url/:id"  -> :obj (the newly updated object)      | status 200
    DELETE  ":url"      -> { "message": str }                   | status 204
    DELETE  ":url/:id"  -> { "message": str }                   | status 204
    """

    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
    permission_classes = [
        permissions.DjangoModelPermissionsOrAnonReadOnly,
        IsOwnerOrReadOnlyInstitution,
    ]
