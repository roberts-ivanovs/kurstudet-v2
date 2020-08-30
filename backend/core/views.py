from django.contrib.auth.models import Group
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response

from core.models import User
from core.serializers import (
    GroupSerializer,
    RegisterSerializer,
    UserSerializer,
)

from core.permissions import CanOnlyViewItself


class UserViewSet(viewsets.ModelViewSet):
    """
    CRUD `core.models.User` items

    Permissions
    ----------
    - Anyone who has the model permissions via Djangos contenttype app
    ----------

    Response item
    ----------
    {
        "id": int,
        "last_login": str,
        "is_superuser": bool,
        "username": str,
        "first_name": str,
        "last_name": str,
        "email": str,
        "is_staff": bool,
        "is_active": bool,
        "date_joined": str,
        "groups": [int, ..],
        "user_permissions": [int, ..],
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

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.DjangoModelPermissions, CanOnlyViewItself]


class GroupViewSet(viewsets.ModelViewSet):
    """
    CRUD `django.contrib.auth.models.Group` items

    Permissions
    ----------
    - Anyone who has the model permissions via Djangos contenttype app
    ----------

    Response item
    ----------
    {
        "id": int,
        "name": str,
        "permissions": [int, ..],
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

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.DjangoModelPermissions]


# Register API
class RegisterAPI(generics.GenericAPIView):
    """
    API endpoint that allows a user to register.

    Permissions
    ----------
    - Anyone can send POST requests

    Response item
    ----------
    {
        "id": int,
        "last_login": str,
        "is_superuser": bool,
        "username": str,
        "first_name": str,
        "last_name": str,
        "email": str,
        "is_staff": bool,
        "is_active": bool,
        "date_joined": str,
        "groups": [int, ..],
        "user_permissions": [int, ..],
    }

    Method calls
    ----------
    :url - base URL
    :obj - a single response item

    POST    ":url"      -> {"user" :obj}      | status 201
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user: User = serializer.save()
        return Response(
            {"user": UserSerializer(user, context=self.get_serializer_context()).data,},
            status=201,
        )
