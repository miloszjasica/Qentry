from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Event
from .serializers import EventSerializer
from .permissions import IsOwnerOrAdmin


@extend_schema(
    tags=['Events'],
    summary='Get list of events',
    description='Zwraca listę eventów z możliwością filtrowania po lokalizacji i aktywności.',
    parameters=[
        OpenApiParameter(name='location', description='Filtr po lokalizacji', required=False, type=str),
        OpenApiParameter(name='is_active', description='Filtr po statusie aktywności (true/false)', required=False, type=bool),
    ],
    responses={200: OpenApiResponse(response=EventSerializer, description='Lista eventów')},
)
@api_view(['GET'])
def get_events(request):

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