from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='id_user.name', read_only=True)
    attraction_name = serializers.CharField(source='id_attraction.name', read_only=True)
    price = serializers.DecimalField(source='id_attraction.price', max_digits=10, decimal_places=2, read_only=True)
    event_name = serializers.CharField(source='id_attraction.id_event.name', read_only=True)
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Transaction
        fields = ['id_transaction', 'user_name', 'event_name', 'attraction_name', 'price', 'date']
