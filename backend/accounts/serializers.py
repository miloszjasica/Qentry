from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password, check_password


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id_user', 'name', 'surname', 'email', 'password', 'user_image']
        extra_kwargs = {
            'password': {'write_only': True},
            'user_image': {'required': False, 'allow_null': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['role'] = 'user'  # ustawiamy domyślną rolę
        return super().create(validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Nieprawidłowe dane logowania.")

        if not check_password(data['password'], user.password):
            raise serializers.ValidationError("Nieprawidłowe dane logowania.")

        if not user.is_active:
            raise serializers.ValidationError("Konto jest nieaktywne.")

        data['user'] = user
        return data
