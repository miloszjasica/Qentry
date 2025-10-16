from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import User
from events.models import Event
from .models import QR
from decimal import Decimal, ROUND_DOWN as decimal
from .models import Transaction
from .serializers import TransactionSerializer
from attractions.models import Attraction

@extend_schema(
    tags=['Tokens'],
    summary='Get balance for a user in an event',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses={200: OpenApiResponse(description='User balance')}
)
@api_view(['GET'])
def user_balance(request, user_id, id_event):
    try:
        user = User.objects.get(pk=user_id)
        event = Event.objects.get(pk=id_event)
        qr = QR.objects.get(id_user=user, id_event=event)
        
        return Response({'balance': qr.balance})
    
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=404)
    except QR.DoesNotExist:
        return Response({'error': 'QR not found for this user and event'}, status=404)
    
@extend_schema(
    tags=['Tokens'],
    summary='Purchase tokens for a user in an event',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='amount', type=float, required=False, location=OpenApiParameter.QUERY)
    ],
    responses={200: OpenApiResponse(description='Tokens purchased successfully')}
)
@api_view(['POST'])
def add_tokens(request, user_id, id_event):
    try:
        user = User.objects.get(pk=user_id)
        event = Event.objects.get(pk=id_event)
        qr, created = QR.objects.get_or_create(id_user=user, id_event=event)
        
        amount = request.query_params.get('amount')
        amount = Decimal(str(amount)).quantize(Decimal('0.01'), rounding=decimal)
        #COMMENTED FOR TESTING PURPOSES
        # if amount <= 0:
        #     return Response({'error': 'Amount must be greater than zero'}, status=400)

        qr.balance += amount
        qr.save()
        
        return Response({
            'message': 'Tokens purchased successfully', 
            'new_balance': qr.balance
        })
    
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=404)

@extend_schema(
    tags=['Transactions'],
    summary='New transaction for a user in an attraction',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_attraction', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses={200: OpenApiResponse(description='Transaction completed successfully')}
)
@api_view(['POST'])
def new_transaction(request, user_id, id_attraction, id_event):
    try:
        user = User.objects.get(pk=user_id)
        event = Event.objects.get(pk=id_event)
        qr = QR.objects.get(id_user=user, id_event=event)
        attraction = event.attractions.get(pk=id_attraction)

        if not qr.is_active:
            return Response({'error': 'QR code is inactive'}, status=400)
        
        if not attraction.is_active:
            return Response({'error': 'Attraction is inactive'}, status=400)
        
        if qr.balance < attraction.price:
            return Response({'error': 'Insufficient balance'}, status=400)
        
        qr.balance -= attraction.price
        qr.save()
        
        attraction.counter += 1
        attraction.save()
        
        transaction = Transaction.objects.create(
            id_user=user,
            id_attraction=attraction
        )
        
        return Response({
            'message': 'Transaction completed successfully', 
            'new_balance': qr.balance,
            'transaction_id': transaction.id_transaction
        })
    
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=404)
    except QR.DoesNotExist:
        return Response({'error': 'QR not found for this user and event'}, status=404)
    except event.attractions.model.DoesNotExist:
        return Response({'error': 'Attraction not found in this event'}, status=404)

@extend_schema(
    tags=['Transactions'],
    summary='Get transaction by id',
    parameters=[
        OpenApiParameter(name='transaction_id', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses={200: OpenApiResponse(description='Transaction details')}
)
@api_view(['GET'])
def get_transaction(request, transaction_id):
    try:
        transaction = Transaction.objects.get(pk=transaction_id)
        return Response({
            'transaction_id': transaction.id_transaction,
            'user': transaction.id_user.name,
            'attraction': transaction.id_attraction.name,
            'price': transaction.id_attraction.price,
            'date': transaction.date
        })
    except Transaction.DoesNotExist:
        return Response({'error': 'Transaction not found'}, status=404)
    
@extend_schema(
    tags=['Transactions'],
    summary='Get all transactions',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=False, location=OpenApiParameter.QUERY),
        OpenApiParameter(name='id_event', type=int, required=False, location=OpenApiParameter.QUERY),
        OpenApiParameter(name='id_attraction', type=int, required=False, location=OpenApiParameter.QUERY),
    ],
    responses={200: OpenApiResponse(description='List of transactions')}
)
@api_view(['GET'])
def list_transactions(request):
    user_id = request.query_params.get('user_id')
    id_event = request.query_params.get('id_event')
    id_attraction = request.query_params.get('id_attraction')
 
    transactions = Transaction.objects.all()

    if user_id:
        transactions = transactions.filter(id_user__id_user=user_id)
    if id_event:
        transactions = transactions.filter(id_attraction__id_event__id_event=id_event)
    if id_attraction:
        transactions = transactions.filter(id_attraction__id_attraction=id_attraction)

    serialized_transactions = TransactionSerializer(transactions, many=True).data

    return Response(serialized_transactions)

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
    responses={200: OpenApiResponse(description='List of user transactions')}
)
@api_view(['GET'])
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
        

        serialized_transactions = TransactionSerializer(transactions, many=True).data
        return Response(serialized_transactions)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    
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
    responses={200: OpenApiResponse(description='List of attraction transactions')}
)
@api_view(['GET'])
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
    except Attraction.model.DoesNotExist:
        return Response({'error': 'Attraction not found'}, status=404)