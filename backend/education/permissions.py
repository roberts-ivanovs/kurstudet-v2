from rest_framework import permissions


class IsOwnerOrReadOnlyInstitution(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return self.is_editor(request.user, obj)

    def is_editor(self, user, obj):
        return user in obj.management


class IsOwnerOrReadOnlyProgramme(IsOwnerOrReadOnlyInstitution):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def is_editor(self, user, obj):
        return super().is_editor(user, obj.institution)
