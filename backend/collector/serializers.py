from rest_framework import serializers

from collector.models import CollectedEmails


class CollectedEmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectedEmails
        fields = "__all__"
