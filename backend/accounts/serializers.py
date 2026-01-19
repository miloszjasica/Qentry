from rest_framework import serializers
from .models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    wants_to_be_organizer = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ['email', 'name', 'surname', 'password', 'wants_to_be_organizer']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'surname', 'user_image', 'role','wants_to_be_organizer']
        read_only_fields = ['id', 'email']
