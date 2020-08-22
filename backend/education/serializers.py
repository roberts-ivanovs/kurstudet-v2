from rest_framework import serializers

from education.models import Institution, Programme


class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = "__all__"


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = "__all__"
