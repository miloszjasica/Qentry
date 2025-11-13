from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import Attraction
from .serializers import AttractionSerializer
from events.models import Event
from events.permissions import IsOwnerOrAdmin


@extend_schema(
    tags=['Attractions'],
    summary='List attractions for an event',
    responses={200: AttractionSerializer(many=True)}
)
@api_view(['GET'])
def list_attractions(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    attractions = event.attractions.all()
    serializer = AttractionSerializer(attractions, many=True)
    return Response(serializer.data)


@extend_schema(
    tags=['Attractions'],
    summary='Add attraction to event',
    request=AttractionSerializer,
    responses={
        201: AttractionSerializer,
        400: OpenApiResponse(description='Invalid data'),
        403: OpenApiResponse(description='Permission denied')
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_attraction(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, event):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    serializer = AttractionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(id_event=event)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Attractions'],
    summary='Get attraction details',
    responses={200: AttractionSerializer, 404: OpenApiResponse(description='Attraction not found')}
)
@api_view(['GET'])
def get_attraction_details(request, id):
    try:
        attraction = Attraction.objects.get(pk=id)
    except Attraction.DoesNotExist:
        return Response({'error': 'Attraction not found'}, status=status.HTTP_404_NOT_FOUND)
    return Response(AttractionSerializer(attraction).data)


@extend_schema(
    tags=['Attractions'],
    summary='Update attraction',
    request=AttractionSerializer,
    responses={
        200: AttractionSerializer,
        400: OpenApiResponse(description='Invalid data'),
        403: OpenApiResponse(description='Permission denied'),
        404: OpenApiResponse(description='Attraction not found'),
    }
)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_attraction(request, id):
    try:
        attraction = Attraction.objects.get(pk=id)
    except Attraction.DoesNotExist:
        return Response({'error': 'Attraction not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, attraction):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    serializer = AttractionSerializer(attraction, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Attractions'],
    summary='Delete attraction',
    responses={
        204: OpenApiResponse(description='Attraction deleted'),
        403: OpenApiResponse(description='Permission denied'),
        404: OpenApiResponse(description='Attraction not found')
    }
)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_attraction(request, id):
    try:
        attraction = Attraction.objects.get(pk=id)
    except Attraction.DoesNotExist:
        return Response({'error': 'Attraction not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, attraction):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    attraction.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(
    tags=['Attractions'],
    summary='Attraction statistics',
    responses={
        200: OpenApiResponse(description='Statistics returned'),
        403: OpenApiResponse(description='Permission denied'),
        404: OpenApiResponse(description='Attraction not found')
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def attraction_stats(request, id):
    try:
        attraction = Attraction.objects.get(pk=id)
    except Attraction.DoesNotExist:
        return Response({'error': 'Attraction not found'}, status=status.HTTP_404_NOT_FOUND)

    permission = IsOwnerOrAdmin()
    if not permission.has_object_permission(request, None, attraction):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    stats = {
        'id': attraction.id_attraction,
        'name': attraction.name,
        'visits': attraction.counter,
        'revenue': attraction.counter * attraction.price,
    }
    return Response(stats)