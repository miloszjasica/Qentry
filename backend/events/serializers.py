from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):

    user_id = serializers.PrimaryKeyRelatedField(read_only=True)
    participants = serializers.IntegerField(
        source='participants_count',
        read_only=True
    )

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ('latitude', 'longitude')


    def validate(self, data):
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("Start date cannot be later than end date.")
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user_id'] = user
        return super().create(validated_data)
    
class EventWithDistanceSerializer(serializers.ModelSerializer):
    distance_km = serializers.FloatField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_distance_km(self, obj):
        return obj.distance_km


