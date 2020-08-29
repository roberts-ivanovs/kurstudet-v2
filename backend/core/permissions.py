from rest_framework import permissions


class CanOnlyViewItself(permissions.BasePermission):

    def has_permission(self, request, view):
        print(view)
        print(dir(view))
        return bool(request.user and request.user.is_authenticated)
