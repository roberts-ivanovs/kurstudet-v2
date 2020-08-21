from rest_framework import serializers
from education.models import Programme, University


class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = "__all__"


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = "__all__"

