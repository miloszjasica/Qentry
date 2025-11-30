from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from .models import Event
from .serializers import EventSerializer, EventWithDistanceSerializer
from utils.geo import get_locations, distance, get_client_ip
from .permissions import IsOwnerOrAdmin


@extend_schema(
    tags=['Events'],
    summary='Get list of events',
    description='Zwraca listę eventów z możliwością filtrowania po niektórych polach z modelu event.',
    parameters=[
        OpenApiParameter(
            name='name',
            description='Filtr po nazwie wydarzenia (wyszukiwanie częściowe)',
            required=False,
            type=str
        ),
        OpenApiParameter(
            name='location',
            description='Filtr po lokalizacji (wyszukiwanie częściowe)',
            required=False,
            type=str
        ),
        OpenApiParameter(
            name='category',
            description='Filtr po kategorii wydarzenia',
            required=False,
            type=str,
            enum=[
                "music", "art", "food", "sport", "business", "theatre",
                "tech", "wellness", "gaming", "film", "fashion", "books", "other"
            ]
        ),
        OpenApiParameter(
            name='date',
            description='Filtr po dacie (eventy aktywne w danym dniu, format YYYY-MM-DD)',
            required=False,
            type=str,
        ),
        OpenApiParameter(
            name='is_active',
            description='Filtr po statusie aktywności (true/false)',
            required=False,
            type=bool
        ),
    ],
    responses={200: OpenApiResponse(response=EventSerializer, description='Lista eventów')},
)
@api_view(['GET'])
def get_events(request):
    queryset = Event.objects.all()

    # Nowe filtry
    name = request.query_params.get('name')
    location = request.query_params.get('location')
    is_active = request.query_params.get('is_active')
    category = request.query_params.get('category')
    date = request.query_params.get('date')

    if name:
        queryset = queryset.filter(name__icontains=name)

    if location:
        queryset = queryset.filter(location__icontains=location)

    if is_active is not None:
        queryset = queryset.filter(is_active=is_active.lower() == "true")

    if category:
        queryset = queryset.filter(category=category)

    if date:
        queryset = queryset.filter(start_date__lte=date, end_date__gte=date)

    serializer = EventSerializer(queryset, many=True)
    return Response(serializer.data)


@extend_schema(
    tags=['Events'],
    summary='Create a new event',
    description='Tworzy nowy event przypisany do zalogowanego użytkownika (tylko dla organizatora lub admina).',
    request=EventSerializer,
    responses={
        201: OpenApiResponse(response=EventSerializer, description='Event created successfully'),
        400: OpenApiResponse(description='Invalid data'),
        403: OpenApiResponse(description='Permission denied'),
    },
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    user = request.user

    if not (user.is_staff or getattr(user, 'wants_to_be_organizer', False)):
        return Response({'error': 'You have to be an organizer'}, status=status.HTTP_403_FORBIDDEN)

    serializer = EventSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        event = serializer.save()
        return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Events'],
    summary='Get event details',
    responses={200: EventSerializer, 404: OpenApiResponse(description='Event not found')},
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
    responses={
        200: EventSerializer,
        400: OpenApiResponse(description='Invalid data'),
        403: OpenApiResponse(description='Permission denied'),
        404: OpenApiResponse(description='Event not found'),
    },
)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, event):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    serializer = EventSerializer(event, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Events'],
    summary='Delete event',
    responses={
        204: OpenApiResponse(description='Event deleted'),
        403: OpenApiResponse(description='Permission denied'),
        404: OpenApiResponse(description='Event not found'),
    },
)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, event):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    event.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(
    tags=['Events'],
    summary='Clone event',
    responses={
        201: EventSerializer,
        403: OpenApiResponse(description='Permission denied'),
        404: OpenApiResponse(description='Event not found'),
    },
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clone_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, event):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    event.pk = None
    event.name += " (Clone)"
    event.save()
    return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)


@extend_schema(
    tags=['Events'],
    summary='Open event',
    responses={
        200: OpenApiResponse(description='Event opened'),
        403: OpenApiResponse(description='Permission denied'),
        404: OpenApiResponse(description='Event not found'),
    },
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def open_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, event):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    event.is_active = True
    event.save()
    return Response({'message': 'Event opened'}, status=status.HTTP_200_OK)


@extend_schema(
    tags=['Events'],
    summary='Close event',
    responses={
        200: OpenApiResponse(description='Event closed'),
        403: OpenApiResponse(description='Permission denied'),
        404: OpenApiResponse(description='Event not found'),
    },
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def close_event(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, event):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    event.is_active = False
    event.save()
    return Response({'message': 'Event closed'}, status=status.HTTP_200_OK)

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
        OpenApiParameter(
            name='name',
            description='Filtr po nazwie wydarzenia',
            required=False,
            type=str
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
    
    name_filter = request.query_params.get('name', '')

    ip_address = get_client_ip(request)

    # # only for tests
    # if (
    #     not ip_address
    #     or ip_address in ['127.0.0.1', '0.0.0.0', 'localhost']
    #     or ip_address.startswith('172.')
    #     or ip_address.startswith('192.')
    #     or ip_address.startswith('10.')
    # ):
    #     ip_address = '89.64.0.0'  # Public IP (Wroclaw)
    # print(f"User IP: {ip_address}")

    user_lat, user_lon = get_locations(ip_address)
    if user_lat is None or user_lon is None:
        return Response({'error': 'Nie udało się ustalić lokalizacji użytkownika'}, status=status.HTTP_400_BAD_REQUEST)

    nearby_events = []
    for event in Event.objects.filter(is_active=True).exclude(latitude__isnull=True, longitude__isnull=True):
        if name_filter and name_filter.lower() not in event.name.lower():
            continue
        dist = distance(user_lat, user_lon, event.latitude, event.longitude)
        if dist <= radius:
            event.distance_km = dist
            nearby_events.append(event)

    nearby_events.sort(key=lambda x: x.distance_km)

    serializer = EventWithDistanceSerializer(nearby_events, many=True)
    return Response(serializer.data)