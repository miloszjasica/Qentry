from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['user_id']

    def validate(self, data):
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("Start date cannot be later than end date.")
        return data
    
class EventWithDistanceSerializer(serializers.ModelSerializer):
    distance_km = serializers.FloatField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_distance_km(self, obj):
        return obj.distance_km

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user_id'] = user
        return super().create(validated_data)
