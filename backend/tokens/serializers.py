from rest_framework import serializers
from .models import Transaction
from .models import QR

class BalanceSerializer(serializers.Serializer):
    balance = serializers.DecimalField(max_digits=10, decimal_places=2)

class AddTokensSerializer(serializers.Serializer):
    new_balance = serializers.DecimalField(max_digits=10, decimal_places=2)
    message = serializers.CharField()

class NewTransactionSerializer(serializers.Serializer):
    transaction_id = serializers.IntegerField()
    event_name = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    balance = serializers.DecimalField(max_digits=10, decimal_places=2)
    message = serializers.CharField()
    new_balance = serializers.DecimalField(max_digits=10, decimal_places=2)

class TransactionSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='id_user.name', read_only=True)
    user_surname = serializers.CharField(source='id_user.surname', read_only=True)
    attraction_name = serializers.CharField(source='id_attraction.name', read_only=True)
    price = serializers.DecimalField(source='id_attraction.price', max_digits=10, decimal_places=2, read_only=True)
    event_name = serializers.CharField(source='id_attraction.id_event.name', read_only=True)
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Transaction
        fields = ['id_transaction', 'user_name', 'user_surname', 'event_name', 'attraction_name', 'price', 'date']
    
class ListTransactionsSerializer(serializers.Serializer):
    transactions = TransactionSerializer(many=True)

class QRSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="id_event.name", read_only=True)
    location = serializers.CharField(source="id_event.location", read_only=True)
    start_date = serializers.DateField(source="id_event.start_date", read_only=True)
    event_end_date = serializers.DateField(source="id_event.end_date", read_only=True)
    image = serializers.ImageField(source="id_event.image", read_only=True)
    participants = serializers.IntegerField(source="id_event.participants", read_only=True)
    description = serializers.CharField(source="id_event.description", read_only = True)
    category = serializers.CharField(source="id_event.category", read_only=True)

    class Meta:
        model = QR
        fields = '__all__'
        read_only_fields = ['id_qr', 'generated_at', 'qr_string', 'id_user']

class AssignRoleSerializer(serializers.Serializer):
    email = serializers.EmailField()
    role = serializers.ChoiceField(choices=[
        'guest', 'staff', 'token_taker', 'token_seller'
    ])
        read_only_fields = ['id_qr', 'generated_at', 'qr_string', 'id_user', "location", "start_date", "end_date", "image", "name"]
