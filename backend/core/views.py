from django.contrib.auth import login
from django.contrib.auth.models import Group
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework import generics, permissions, viewsets
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response

from core.models import User
from core.serializers import (
    GroupSerializer,
    RegisterSerializer,
    UserSerializer,
    LoginSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LoginAPI(KnoxLoginView):
    """
    API endpoint that allows user to log in.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """
        API endpoint that allows user to log in.
        """
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)

        return super(LoginAPI, self).post(request, format=None)


# Register API
class RegisterAPI(generics.GenericAPIView):
    """
    API endpoint that allows a user to register.
    """

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        """
        API endpoint that allows a user to register.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )
