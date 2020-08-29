from rest_framework import viewsets

from collector.models import CollectedEmails
from collector.serializers import CollectedEmailsSerializer


class CollectedEmailsViewset(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing CollectedEmails instances.
    """

    serializer_class = CollectedEmailsSerializer
    queryset = CollectedEmails.objects.all()