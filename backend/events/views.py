from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from .models import Event
from .serializers import EventSerializer
from utils.geo import get_locations, distance


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
    #user = request.user

    # # Sprawdzenie ról użytkownika
    # if not (user.is_staff or getattr(user, 'role', '') == 'organizer'):
    #     return Response({'error': 'You do not have permission to create an event.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        event = serializer.save()
        return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(
    tags=['Events'],
    summary='Get event details',
    responses={200: EventSerializer, 404: OpenApiResponse(description='Event not found')}
)
@api_view(['GET'])
def get_event_details(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    return Response(EventSerializer(event).data)


@extend_schema(
    tags=['Events'],
    summary='Update event',
    request=EventSerializer,
    responses={200: EventSerializer, 400: OpenApiResponse(description='Invalid data')}
)
@api_view(['PATCH'])
def update_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Events'],
    summary='Delete event',
    responses={204: OpenApiResponse(description='Event deleted')}
)
@api_view(['DELETE'])
def delete_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    event.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(
    tags=['Events'],
    summary='Clone event',
    responses={201: EventSerializer}
)
@api_view(['POST'])
def clone_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    event.pk = None
    event.name += " (Clone)"
    event.save()
    return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)


@extend_schema(
    tags=['Events'],
    summary='Open event',
    responses={200: OpenApiResponse(description='Event opened')}
)
@api_view(['POST'])
def open_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    event.is_active = True
    event.save()
    return Response({'message': 'Event opened'}, status=status.HTTP_200_OK)


@extend_schema(
    tags=['Events'],
    summary='Close event',
    responses={200: OpenApiResponse(description='Event closed')}
)
@api_view(['POST'])
def close_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    event.is_active = False
    event.save()
    return Response({'message': 'Event closed'}, status=status.HTTP_200_OK)


def get_client_ip(request):
    """Pobiera prawdziwy adres IP użytkownika, nawet za proxy."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

@extend_schema(
    tags=['Events'],
    summary='Get nearby events',
    description='Zwraca eventy w pobliżu użytkownika na podstawie jego IP.',
    parameters=[
        OpenApiParameter(
            name='radius',
            description='Promień wyszukiwania w km (domyślnie 10 km)',
            required=False,
            type=float
        ),
    ],
    responses={200: OpenApiResponse(response=EventSerializer, description='Lista pobliskich eventów')}
)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_nearby_events(request):
    """
    Automaticly fetches user location based on IP and returns events within a specified radius.
    """

    try:
        radius = float(request.query_params.get('radius', 10)) #default
    except ValueError:
        return Response({'error': 'Nieprawidłowy format parametru radius'}, status=status.HTTP_400_BAD_REQUEST)

    ip_address = get_client_ip(request)

    # only for tests
    if (
        not ip_address
        or ip_address in ['127.0.0.1', '0.0.0.0', 'localhost']
        or ip_address.startswith('172.')
        or ip_address.startswith('192.')
        or ip_address.startswith('10.')
    ):
        ip_address = '89.64.0.0'  # Public IP (Poznan)

    user_lat, user_lon = get_locations(ip_address)
    if user_lat is None or user_lon is None:
        return Response({'error': 'Nie udało się ustalić lokalizacji użytkownika'}, status=status.HTTP_400_BAD_REQUEST)

    nearby_events = []
    for event in Event.objects.filter(is_active=True):
        if hasattr(event, "latitude") and hasattr(event, "longitude") and event.latitude and event.longitude:
            dist = distance(user_lat, user_lon, event.latitude, event.longitude)
            if dist <= radius:
                nearby_events.append(event)

    serializer = EventSerializer(nearby_events, many=True)
    return Response({
        "user_location": {"latitude": user_lat, "longitude": user_lon, "ip": ip_address},
        "radius_km": radius,
        "events_count": len(nearby_events),
        "events": serializer.data
    })