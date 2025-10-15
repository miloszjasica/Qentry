from rest_framework import generics, filters
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from accounts.models import User
from accounts.serializers import LogoutSerializer, UserRegistrationSerializer, UserSerializer
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiResponse
from django_filters.rest_framework import DjangoFilterBackend


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=LogoutSerializer,
        responses={205: None, 400: None}
    )
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except KeyError:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError:
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
        
@extend_schema_view(
    get=extend_schema(summary="Get current user", responses=UserSerializer),
    patch=extend_schema(
        summary="Update current user",
        request=UserSerializer,
        responses={200: UserSerializer, 400: OpenApiResponse(description="Validation error")},
    ),
    delete=extend_schema(summary="Delete current user", responses={204: None, 401: None}),
)
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    

@extend_schema(summary="Get user by ID (admin only)", responses=UserSerializer)
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'  

@extend_schema(summary="List all users (admin only)", responses=UserSerializer(many=True))
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'surname', 'email']
    filterset_fields = ['name', 'surname', 'email']  