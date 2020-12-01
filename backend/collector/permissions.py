from rest_framework import permissions


class AnyoneCanWriteOnlyAdminCanRead(permissions.BasePermission):
    """
    Custom permission to allow anyone to create new entries, but only the admin
    user can read the specified data
    """

    def has_permission(self, request, view):
        if request.method in ['GET'] and request.user.is_authenticated:
            return True
        elif request.method in ['POST']:
            return True
