from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import Attraction
from .serializers import AttractionSerializer
from events.models import Event


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
    responses={201: AttractionSerializer, 400: OpenApiResponse(description='Invalid data')}
)
@api_view(['POST'])
def add_attraction(request, id):
    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = AttractionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(id_event=event)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Attractions'],
    summary='Get attraction details',
    responses={200: AttractionSerializer}
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
    responses={200: AttractionSerializer}
)
@api_view(['PATCH'])
def update_attraction(request, id):
    try:
        attraction = Attraction.objects.get(pk=id)
    except Attraction.DoesNotExist:
        return Response({'error': 'Attraction not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = AttractionSerializer(attraction, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Attractions'],
    summary='Delete attraction',
    responses={204: OpenApiResponse(description='Attraction deleted')}
)
@api_view(['DELETE'])
def delete_attraction(request, id):
    try:
        attraction = Attraction.objects.get(pk=id)
    except Attraction.DoesNotExist:
        return Response({'error': 'Attraction not found'}, status=status.HTTP_404_NOT_FOUND)
    attraction.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(
    tags=['Attractions'],
    summary='Attraction statistics',
    responses={200: OpenApiResponse(description='Statistics returned')}
)
@api_view(['GET'])
def attraction_stats(request, id):
    try:
        attraction = Attraction.objects.get(pk=id)
    except Attraction.DoesNotExist:
        return Response({'error': 'Attraction not found'}, status=status.HTTP_404_NOT_FOUND)

    stats = {
        'id': attraction.id_attraction,
        'name': attraction.name,
        'visits': attraction.counter,
        'revenue': attraction.counter * attraction.price,
    }
    return Response(stats)