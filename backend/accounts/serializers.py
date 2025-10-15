from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'name', 'surname', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
