from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from accounts.models import User
from events.models import Event
from .models import QR
from decimal import Decimal, ROUND_DOWN as decimal
from .models import Transaction
from .serializers import TransactionSerializer
from attractions.models import Attraction
from .serializers import BalanceSerializer, AddTokensSerializer, NewTransactionSerializer, ListTransactionsSerializer

@extend_schema(
    tags=['Tokens'],    
    summary='Get balance for a user in an event',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses= {
        200: OpenApiResponse(response=BalanceSerializer, description='User balance in event'),
        }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_balance(request, user_id, id_event):
    try:
        user = User.objects.get(pk=user_id)
        event = Event.objects.get(pk=id_event)
        qr = QR.objects.get(id_user=user, id_event=event)
        
        return Response(BalanceSerializer({"balance": qr.balance}).data)
           
    except User.DoesNotExist:
        return Response({'error': 'Nie znaleziono użytkownika'}, status=404)
    except Event.DoesNotExist:
        return Response({'error': 'Nie znaleziono wydarzenia'}, status=404)
    except QR.DoesNotExist:
        return Response({'error': 'Nie znaleziono kodu QR dla użytkownika w tym wydarzeniu'}, status=404)
    
@extend_schema(
    tags=['Tokens'],
    summary='Add tokens for a user in an event',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='amount', type=float, required=False, location=OpenApiParameter.QUERY)
    ],
    responses={200: OpenApiResponse(response=AddTokensSerializer, description='Tokeny zakupione pomyślnie')}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_tokens(request, user_id, id_event):
    try:
        user = User.objects.get(pk=user_id)
        event = Event.objects.get(pk=id_event)
        qr, created = QR.objects.get_or_create(id_user=user, id_event=event)
        
        if qr.user_role == 'token_seller' or qr.user_role == 'staff':

            amount = request.query_params.get('amount')
            amount = Decimal(str(amount)).quantize(Decimal('0.01'), rounding=decimal)
            if amount <= 0:
                return Response({'error': 'Amount must be greater than zero'}, status=400)

            qr.balance += amount
            qr.save()
            
            return Response(AddTokensSerializer({
                'new_balance': qr.balance,
                'message': 'Tokeny zakupione pomyślnie'
            }).data)
        else:
            return Response({'error': 'Nie możesz sprzedawać tokenów jako gość'}, status=403)
    
    except User.DoesNotExist:
        return Response({'error': 'Nie znaleziono użytkownika'}, status=404)
    except Event.DoesNotExist:
        return Response({'error': 'Nie znaleziono wydarzenia'}, status=404)

@extend_schema(
    tags=['Transactions'],
    summary='New transaction for a user in an attraction',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_attraction', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses={200: OpenApiResponse(response=NewTransactionSerializer,  description='Tranzakcja zakończona sukcesem')}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_transaction(request, user_id, id_attraction, id_event):
    try:
        user = User.objects.get(pk=user_id)
        event = Event.objects.get(pk=id_event)
        attraction = Attraction.objects.get(pk=id_attraction, id_event=event)
        qr = QR.objects.get(id_user=user, id_event=event)
        attraction = event.attractions.get(pk=id_attraction)

        if qr.user_role != 'guest':

            if not qr.is_active:
                return Response({'error': 'Kod QR jest nieaktywny'}, status=400)
            
            if not attraction.is_active:
                return Response({'error': 'Atrakcja jest nieaktywny'}, status=400)
            
            if qr.balance < attraction.price:
                return Response({'error': 'Niewystarczające saldo użytkownika'}, status=400)
            
            qr.balance -= attraction.price
            qr.save()
            
            attraction.counter += 1
            attraction.save()
            
            transaction = Transaction.objects.create(
                id_user=user,
                id_attraction=attraction
            )
            
            return Response(NewTransactionSerializer({
                'message': 'Transakcja zakończona sukcesem', 
                'new_balance': qr.balance,
                'balance': qr.balance + attraction.price,
                'transaction_id': transaction.id_transaction,
                'event_name': event.name,
                'price': attraction.price
            }).data)
        
        else:
            return Response({'error': 'Nie możesz pobierać opłat jako gość'}, status=403)
        
    except User.DoesNotExist:
        return Response({'error': 'Nie znaleziono użytkownika'}, status=404)
    except Event.DoesNotExist:
        return Response({'error': 'Nie znaleziono wydarzenia'}, status=404)
    except QR.DoesNotExist:
        return Response({'error': 'Kod QR nieaktywny'}, status=404)
    except event.attractions.model.DoesNotExist:
        return Response({'error': 'Nie znaleziono atrakcji'}, status=404)

#Nie wiem czy tego nie trzeba bedzie zabezpieczyc dla admina albo organizatora
@extend_schema(
    tags=['Transactions'],
    summary='Get transaction by id',
    parameters=[
        OpenApiParameter(name='transaction_id', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses={200: OpenApiResponse(response=TransactionSerializer, description='Transaction details')}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transaction(request, transaction_id):
    try:
        transaction = Transaction.objects.get(pk=transaction_id)
        return Response(TransactionSerializer(transaction).data)
    except Transaction.DoesNotExist:
        return Response({'error': 'Nie znaleziono tranzakcji'}, status=404)
    
@extend_schema(
    tags=['Transactions'],
    summary='Get all your transactions',
    parameters=[
        #OpenApiParameter(name='user_id', type=int, required=False, location=OpenApiParameter.QUERY),
        OpenApiParameter(name='id_event', type=int, required=False, location=OpenApiParameter.QUERY),
        OpenApiParameter(name='id_attraction', type=int, required=False, location=OpenApiParameter.QUERY),
    ],
    responses={200: OpenApiResponse(response=ListTransactionsSerializer,  description='List of transactions')}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_transactions(request):
    user_id = request.query_params.get('user_id')
    id_event = request.query_params.get('id_event')
    id_attraction = request.query_params.get('id_attraction')
 
    transactions = Transaction.objects.filter(id_user=request.user)

    if user_id:
        transactions = transactions.filter(id_user=user_id)
    if id_event:
        transactions = transactions.filter(id_attraction__id_event__id_event=id_event)
    if id_attraction:
        transactions = transactions.filter(id_attraction__id_attraction=id_attraction)

    return Response(ListTransactionsSerializer({'transactions': transactions}).data)

#Nie wiem czy tego nie trzeba bedzie zabezpieczyc dla admina albo organizatora
@extend_schema(
    tags=['Transactions'],
    summary='Get all transactions of user',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='ordering', type=str, required=False, location=OpenApiParameter.QUERY, description="Ordering by date: 'date' or '-date'"),
        OpenApiParameter(name='Event name', type=str, required=False, location=OpenApiParameter.QUERY),
        OpenApiParameter(name='date_from', type=str, required=False, location=OpenApiParameter.QUERY, description="Filter from date (YYYY-MM-DD)"),
        OpenApiParameter(name='date_to', type=str, required=False, location=OpenApiParameter.QUERY, description="Filter to date (YYYY-MM-DD)"),
    ],
    responses={200: OpenApiResponse(response=TransactionSerializer,  description='List of user transactions')}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_transactions(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        transactions = Transaction.objects.filter(id_user=user)
        ordering = request.query_params.get('ordering')
        event_name = request.query_params.get('Event name')
        date_from = request.query_params.get('date_from')
        date_to = request.query_params.get('date_to')

        if date_from:
            transactions = transactions.filter(date__date__gte=date_from)
        if date_to:
            transactions = transactions.filter(date__date__lte=date_to)

        if event_name:
            transactions = transactions.filter(id_attraction__id_event__name__icontains=event_name)

        if ordering in ['date', '-date']:
            transactions = transactions.order_by(ordering)
        else:
            transactions = transactions.order_by('-date')
        

        return Response(TransactionSerializer(transactions, many=True).data)
    except User.DoesNotExist:
        return Response({'error': 'Nie znaleziono użytkownika'}, status=404)

@extend_schema(
    tags=['Transactions'],
    summary='Get all transactions of attraction',
    parameters=[
        OpenApiParameter(name='id_attraction', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='ordering', type=str, required=False, location=OpenApiParameter.QUERY, description="Ordering by date: 'date' or '-date'"),
        OpenApiParameter(name='Event name', type=str, required=False, location=OpenApiParameter.QUERY),
        OpenApiParameter(name='date_from', type=str, required=False, location=OpenApiParameter.QUERY, description="Filter from date (YYYY-MM-DD)"),
        OpenApiParameter(name='date_to', type=str, required=False, location=OpenApiParameter.QUERY, description="Filter to date (YYYY-MM-DD)"),
    ],
    responses={200: OpenApiResponse(response=TransactionSerializer ,description='List of attraction transactions')}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def attraction_transactions(request, id_attraction):
    try:
        attraction = Attraction.objects.get(pk=id_attraction)
        transactions = Transaction.objects.filter(id_attraction=attraction)
        ordering = request.query_params.get('ordering')
        event_name = request.query_params.get('Event name')
        date_from = request.query_params.get('date_from')
        date_to = request.query_params.get('date_to')

        if date_from:
            transactions = transactions.filter(date__date__gte=date_from)
        if date_to:
            transactions = transactions.filter(date__date__lte=date_to)

        if event_name:
            transactions = transactions.filter(id_attraction__id_event__name__icontains=event_name)

        if ordering in ['date', '-date']:
            transactions = transactions.order_by(ordering)
        else:
            transactions = transactions.order_by('-date')
        
        serialized_transactions = TransactionSerializer(transactions, many=True).data
        return Response(serialized_transactions)
    
    except Attraction.DoesNotExist:
        return Response({'error': 'Nie znaleziono atrakcji'}, status=404)