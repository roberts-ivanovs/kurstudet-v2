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
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.DjangoModelPermissions, CanOnlyViewItself]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.DjangoModelPermissions]


# Register API
class RegisterAPI(generics.GenericAPIView):
    """
    API endpoint that allows a user to register.
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user: User = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
            }
        )
