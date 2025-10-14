from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from .models import Event
from .serializers import EventSerializer
from rest_framework import status

@extend_schema(
    tags=['Events'],
    summary='Get list of events',
    description='Zwraca listę eventów z możliwością filtrowania po lokalizacji i aktywności.',
    parameters=[
        OpenApiParameter(name='location', description='Filtr po lokalizacji', required=False, type=str),
        OpenApiParameter(name='is_active', description='Filtr po statusie aktywności (true/false)', required=False, type=bool),
    ],
    responses={
        200: OpenApiResponse(response=EventSerializer, description='Lista eventów'),
    }
)
@api_view(['GET'])
def get_events(request):
    """
    GET /events
    Zwraca listę wszystkich eventów z opcjonalnym filtrowaniem.
    """
    queryset = Event.objects.all()

    # Filtry z parametrów zapytania
    location = request.query_params.get('location')
    is_active = request.query_params.get('is_active')

    if location:
        queryset = queryset.filter(location__icontains=location)
    if is_active is not None:
        queryset = queryset.filter(is_active=is_active.lower() == 'true')

    serializer = EventSerializer(queryset, many=True)
    return Response(serializer.data)

@extend_schema(
    tags=['Events'],
    summary='Create a new event',
    description='Tworzy nowy event (dostępne tylko dla organizatora lub admina).',
    request=EventSerializer,
    responses={
        201: OpenApiResponse(response=EventSerializer, description='Event created successfully'),
        400: OpenApiResponse(description='Invalid data'),
        403: OpenApiResponse(description='Permission denied')
    }
)
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def create_event(request):
    """
    POST /events
    Tworzy nowy event (tylko dla organizatora lub admina).
    """
    user = request.user

    # # Sprawdzenie ról użytkownika
    # if not (user.is_staff or getattr(user, 'role', '') == 'organizer'):
    #     return Response({'error': 'You do not have permission to create an event.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        event = serializer.save()
        return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)