from rest_framework.permissions import BasePermission

class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if user and user.is_staff:
            return True

        if hasattr(obj, 'user_id'):
            return obj.user_id == user

        if hasattr(obj, 'id_event'):
            return getattr(obj.id_event, 'user_id', None) == user

        return False