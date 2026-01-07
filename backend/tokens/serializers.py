from rest_framework import serializers
from .models import Transaction
from .models import QR

class BalanceSerializer(serializers.Serializer):
    balance = serializers.DecimalField(max_digits=10, decimal_places=2)

class AddTokensSerializer(serializers.Serializer):
    old_balance = serializers.DecimalField(max_digits=10, decimal_places=2)
    added_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    message = serializers.CharField()

class NewTransactionSerializer(serializers.Serializer):
    transaction_id = serializers.IntegerField()
    event_name = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    balance = serializers.DecimalField(max_digits=10, decimal_places=2)
    message = serializers.CharField()
    new_balance = serializers.DecimalField(max_digits=10, decimal_places=2)

class TransactionSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='id_user.name')
    user_surname = serializers.CharField(source='id_user.surname')
    event_name = serializers.SerializerMethodField()
    attraction_name = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = [
            'id_transaction',
            'user_name',
            'user_surname',
            'type',
            'event_name',
            'attraction_name',
            'price',
            'amount',
            'date'
        ]
    def get_event_name(self, obj):
        if obj.type == 'attraction' and obj.id_attraction:
            return obj.id_attraction.id_event.name
        return None

    def get_attraction_name(self, obj):
        if obj.type == 'attraction' and obj.id_attraction:
            return obj.id_attraction.name
        return None

    def get_price(self, obj):
        if obj.type == 'attraction':
            return obj.amount
        return None

    def get_added_amount(self, obj):
        if obj.type == 'topup':
            return obj.amount
        return None

    
class ListTransactionsSerializer(serializers.Serializer):
    transactions = TransactionSerializer(many=True)

class QRSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="id_event.name", read_only=True)
    location = serializers.CharField(source="id_event.location", read_only=True)
    start_date = serializers.DateTimeField(source="id_event.start_date", read_only=True)
    event_end_date = serializers.DateTimeField(source="id_event.end_date", read_only=True)
    image = serializers.SerializerMethodField()
    participants = serializers.IntegerField(
            source='id_event.participants_count',
            read_only=True
        )    
    description = serializers.CharField(source="id_event.description", read_only = True)
    category = serializers.CharField(source="id_event.category", read_only=True)

    class Meta:
        model = QR
        fields = '__all__'
        read_only_fields = ['id_qr', 'generated_at', 'qr_string', 'id_user']

    def get_image(self, obj):
        if obj.id_event.image:
            return obj.id_event.image  # zwróci URL
        return None

class AssignRoleSerializer(serializers.Serializer):
    email = serializers.EmailField()
    role = serializers.ChoiceField(choices=[
        'guest', 'staff', 'token_taker', 'token_seller'
    ])

class EventUserRoleSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='id_user.id')
    email = serializers.EmailField(source="id_user.email")
    role = serializers.CharField(source="user_role")

    class Meta:
        model = QR
        fields = ["id", "email", "role"]
