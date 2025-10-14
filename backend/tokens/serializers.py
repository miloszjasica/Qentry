from rest_framework import serializers
from .models import QR, Transaction

class QRSerializer(serializers.ModelSerializer):
    class Meta:
        model = QR
        fields = ['id', 'code', 'created_at', 'is_used', 'event', 'attraction', 'user']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'attraction', 'date']

class PurchaseTokensSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)