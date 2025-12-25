from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status
from accounts.models import User
from events.models import Event
from .models import QR
from decimal import Decimal, ROUND_DOWN as decimal
from .models import Transaction
from .serializers import AssignRoleSerializer, EventUserRoleSerializer, TransactionSerializer,QRSerializer
from attractions.models import Attraction
from .serializers import BalanceSerializer, AddTokensSerializer, NewTransactionSerializer, ListTransactionsSerializer
from django.http import FileResponse, Http404, HttpResponse
import uuid
import qrcode
from io import BytesIO
from django.utils import timezone
from decimal import Decimal, ROUND_HALF_UP

@extend_schema(
    tags=['Tokens'],
    summary='Your balance in an event',
    parameters=[
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses= {
        200: OpenApiResponse(response=BalanceSerializer, description='Your balance in event'),
        }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_balance(request, id_event):
    try:
        event = Event.objects.get(pk=id_event)
        qr = QR.objects.get(id_user=request.user, id_event=event)

        if not qr.is_active:
            return Response({'error': 'Twój kod QR jest nieaktywny'}, status=400)
        
        return Response(BalanceSerializer({"balance": qr.balance}).data)
           
    except Event.DoesNotExist:
        return Response({'error': 'Nie znaleziono wydarzenia'}, status=404)
    except QR.DoesNotExist:
        return Response({'error': 'Nie znaleziono kodu QR dla użytkownika w tym wydarzeniu'}, status=404)

@extend_schema(
    tags=['Tokens'],    
    summary='Get balance for a user in an event',
    parameters=[
        OpenApiParameter(name='qr_string', type=str, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses= {
        200: OpenApiResponse(response=BalanceSerializer, description='User balance in event'),
        }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_balance(request, qr_string, id_event):
    try:
        operator = request.user
        event = Event.objects.get(pk=id_event)
        operator_qr = QR.objects.get(id_user=operator, id_event=event)
        qr = QR.objects.get(qr_string=qr_string, id_event=event)
        
        if operator_qr.user_role in ['token_taker', 'staff', 'token_seller'] or operator.role == 'admin':
            return Response(BalanceSerializer({"balance": qr.balance}).data)
        else:
            return Response({'error': 'Nie masz uprawnień do przeglądania salda użytkownika'}, status=403)
    except Event.DoesNotExist:
        return Response({'error': 'Nie znaleziono wydarzenia'}, status=404)
    except QR.DoesNotExist:
        return Response({'error': 'Nie znaleziono kodu QR dla użytkownika w tym wydarzeniu'}, status=404)
    
@extend_schema(
    tags=['Tokens'],
    summary='Add tokens for a user in an event',
    parameters=[
        OpenApiParameter(name='qr_string', type=str, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='amount', type=float, required=False, location=OpenApiParameter.QUERY)
    ],
    responses={200: OpenApiResponse(response=AddTokensSerializer, description='Tokeny zakupione pomyślnie')}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_tokens(request, qr_string, id_event):
    try:
        operator = request.user
        event = Event.objects.get(pk=id_event)
        operator_qr = QR.objects.get(id_user=operator, id_event=event)
        qr = QR.objects.get(qr_string=qr_string, id_event=event)
        
        if operator_qr.user_role == 'token_seller' or operator_qr.user_role == 'staff':

            amount = request.data.get('amount')
            if amount is None:
                return Response({'error': 'Kwota musi być wprowadzona'}, status=400)
            
            try:
                amount = Decimal(str(amount)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
            except:
                return Response({'error': 'Niepoprawna kwota'}, status=400)

            old_balance = qr.balance
            qr.balance += amount
            qr.save()

            Transaction.objects.create(
                id_user=qr.id_user,
                id_attraction=None,
                amount=amount,
                type ='topup'
            )

            data = {
                'old_balance': old_balance,
                'added_amount': amount,
                'message': 'Tokeny zostały pomyślnie zakupione',
                'type': type
            }
            
            return Response(AddTokensSerializer(data).data)
        else:
            return Response({'error': 'Nie możesz sprzedawać tokenów jako gość lub kasjer'}, status=403)
    
    except User.DoesNotExist:
        return Response({'error': 'Nie znaleziono użytkownika'}, status=404)
    except Event.DoesNotExist:
        return Response({'error': 'Nie znaleziono wydarzenia'}, status=404)
    except QR.DoesNotExist:
        return Response({'error': 'Nie znaleziono kodu QR użytkownika w tym wydarzeniu'}, status=404)

@extend_schema(
    tags=['Transactions'],
    summary='New transaction for a user in an attraction',
    parameters=[
        OpenApiParameter(name='qr_string', type=str, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_attraction', type=int, required=True, location=OpenApiParameter.PATH),
    ],
    responses={200: OpenApiResponse(response=NewTransactionSerializer,  description='Tranzakcja zakończona sukcesem')}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_transaction(request, qr_string, id_attraction):
    try:
        operator = request.user
        qr = QR.objects.get(qr_string=qr_string)
        event = qr.id_event
        attraction = Attraction.objects.get(pk=id_attraction, id_event=event)
        operator_qr = QR.objects.get(id_user=operator, id_event=event)

        if operator_qr.user_role == 'token_taker' or operator_qr.user_role == 'staff':

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
                id_user=qr.id_user,
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
            return Response({'error': 'Nie możesz pobierać opłat jako gość lub sprzedający tokeny'}, status=403)
        
    except User.DoesNotExist:
        return Response({'error': 'Nie znaleziono użytkownika'}, status=404)
    except QR.DoesNotExist:
        return Response({'error': 'Kod QR nieaktywny'}, status=404)
    except event.attractions.model.DoesNotExist:
        return Response({'error': 'Nie znaleziono atrakcji'}, status=404)

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
        transaction = Transaction.objects.select_related('id_attraction__id_event').get(pk=transaction_id)
        user = request.user
        if user.role == 'organizer' and transaction.id_attraction.id_event.user_id == user:
            return Response(TransactionSerializer(transaction).data)
        elif user.role == 'admin':
            return Response(TransactionSerializer(transaction).data)
        else:
            return Response({'error': 'Nie masz uprawnień do przeglądania tej transakcji'}, status=403)
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

@extend_schema(
    tags=['Transactions'],
    summary='Get all transactions of user',
    parameters=[
        OpenApiParameter(name='user_id', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='id_event', type=int, required=True, location=OpenApiParameter.PATH),
        OpenApiParameter(name='ordering', type=str, required=False, location=OpenApiParameter.QUERY, description="Ordering by date: 'date' or '-date'"),
        OpenApiParameter(name='date_from', type=str, required=False, location=OpenApiParameter.QUERY, description="Filter from date (YYYY-MM-DD)"),
        OpenApiParameter(name='date_to', type=str, required=False, location=OpenApiParameter.QUERY, description="Filter to date (YYYY-MM-DD)"),
    ],
    responses={200: OpenApiResponse(response=TransactionSerializer,  description='List of user transactions')}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_transactions(request, user_id, id_event):
    try:
        event = Event.objects.get(pk=id_event)
        user = request.user

        if not (user.role == 'organizer' and event.user_id == user) or user.role == 'admin':
            return Response({'error': 'Nie masz uprawnień do przeglądania transakcji tego użytkownika'}, status=403)
        
        transactions = Transaction.objects.filter(id_user=user, id_attraction__id_event=event).select_related('id_attraction__id_event')

        if not transactions.exists():
            return Response({'messege': 'Nie znaleziono transakcji dla tego użytkownika w tym wydarzeniu'}, status=200)
        
        ordering = request.query_params.get('ordering')
        date_from = request.query_params.get('date_from')
        date_to = request.query_params.get('date_to')

        if date_from:
            transactions = transactions.filter(date__date__gte=date_from)
        if date_to:
            transactions = transactions.filter(date__date__lte=date_to)

        if ordering in ['date', '-date']:
            transactions = transactions.order_by(ordering)
        else:
            transactions = transactions.order_by('-date')

        return Response(TransactionSerializer(transactions, many=True).data)

    except User.DoesNotExist:
        return Response({'error': 'Nie znaleziono użytkownika'}, status=404)
    except Event.DoesNotExist:
        return Response({'error': 'Nie znaleziono eventu'}, status=404)

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
        attraction = Attraction.objects.filter(pk=id_attraction, id_event__user_id=request.user.id).first()
        if not attraction:
            return Response({'error': 'Nie masz uprawnień do przeglądania tej atrakcji'}, status=403)
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

@extend_schema(
    tags=['Events'],
    summary='Zapisz zalogowanego użytkownika na event',
    parameters=[
        OpenApiParameter(
            name='event_id',
            type=int,
            required=True,
            location=OpenApiParameter.PATH
        )
    ],
    responses={
        201: OpenApiResponse(response=QRSerializer, description="Użytkownik zapisany na event"),
        400: OpenApiResponse(description="Użytkownik już zapisany"),
        404: OpenApiResponse(description="Event nie istnieje")
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_event(request, event_id):
    user = request.user

    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response(
            {"error": "Event nie istnieje"},
            status=status.HTTP_404_NOT_FOUND
        )

    if QR.objects.filter(id_user=user, id_event=event).exists():
        return Response(
            {"error": "Już jesteś zapisany na ten event"},
            status=status.HTTP_400_BAD_REQUEST
        )

    qr_code = str(uuid.uuid4())

    qr = QR.objects.create(
        id_user=user,
        id_event=event,
        qr_string=qr_code
    )

    return Response(
        QRSerializer(qr).data,
        status=status.HTTP_201_CREATED
    )

@extend_schema(
    tags=['Events'],
    summary='Lista eventów na które zapisany jest zalogowany użytkownik',
    parameters=[
        OpenApiParameter(
            name='name',
            description='Filtr po nazwie wydarzenia',
            required=False,
            type=str
        ),
        OpenApiParameter(
            name='category',
            description='Filtr po kategorii wydarzenia',
            required=False,
            type=str,
            enum=[
                "music", "art", "food", "sport", "business", "theatre",
                "tech", "wellness", "gaming", "film", "fashion", "books", "other"
            ]
        ),
        OpenApiParameter(
            name='date_from',
            description='Filtr od daty (YYYY-MM-DD)',
            required=False,
            type=str
        ),
        OpenApiParameter(
            name='date_to',
            description='Filtr do daty (YYYY-MM-DD)',
            required=False,
            type=str
        )
    ],
    responses={
        200: OpenApiResponse(response=QRSerializer, description='Lista zapisów użytkownika')
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_events(request):
    user = request.user
    qrs = QR.objects.filter(id_user=user)
    category = request.query_params.get('category', '')
    name_filter = request.query_params.get('name', '')
    
    if name_filter:
        qrs = qrs.filter(id_event__name__icontains=name_filter)

    if category:
        qrs = qrs.filter(id_event__category=category)
    
    return Response(QRSerializer(qrs, many=True).data)

@extend_schema(
    tags=['Events'],
    summary='Lista eventów na które zapisany jest zalogowany użytkownik',
    parameters=[
        OpenApiParameter(
            name='name',
            description='Filtr po nazwie wydarzenia',
            required=False,
            type=str
        ),
        OpenApiParameter(
            name='category',
            description='Filtr po kategorii wydarzenia',
            required=False,
            type=str,
            enum=[
                "music", "art", "food", "sport", "business", "theatre",
                "tech", "wellness", "gaming", "film", "fashion", "books", "other"
            ]
        ),
        OpenApiParameter(
            name='date_from',
            description='Filtr od daty (YYYY-MM-DD)',
            required=False,
            type=str
        ),
        OpenApiParameter(
            name='date_to',
            description='Filtr do daty (YYYY-MM-DD)',
            required=False,
            type=str
        )
    ],
    responses={
        200: OpenApiResponse(response=QRSerializer, description='Lista zapisów użytkownika')
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_events_upcoming(request):
    today = timezone.now().date()
    user = request.user
    qrs = QR.objects.filter(id_user=user)
    qrs = qrs.filter(id_event__end_date__gte=today)
    category = request.query_params.get('category', '')
    name_filter = request.query_params.get('name', '')
    
    if name_filter:
        qrs = qrs.filter(id_event__name__icontains=name_filter)

    if category:
        qrs = qrs.filter(id_event__category=category)
    
    return Response(QRSerializer(qrs, many=True).data)

@extend_schema(
    tags=['Events'],
    summary='Usuń zapis/wycofaj uczestnictwo w evencie',
    parameters=[
        OpenApiParameter(
            name='event_id',
            type=int,
            required=True,
            location=OpenApiParameter.PATH
        )
    ],
    responses={
        200: OpenApiResponse(description="Uczestnictwo usunięte"),
        404: OpenApiResponse(description="Nie znaleziono zapisu"),
    }
)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def leave_event(request, event_id):
    user = request.user

    try:
        qr = QR.objects.get(id_user=user, id_event_id=event_id)
        qr.delete()
        return Response({"message": "Wypisano z eventu"}, status=200)

    except QR.DoesNotExist:
        return Response(
            {"error": "Nie jesteś zapisany na ten event"},
            status=404
        )

@extend_schema(
    tags=['Events'],
    summary='QR przypisany do eventu',
    parameters=[
        OpenApiParameter("qr_id", int, required=True, location=OpenApiParameter.PATH)
    ]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_qr_image(request, qr_id):
    try:
        qr = QR.objects.get(pk=qr_id, id_user=request.user)

        qr_code = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4
        )
        qr_code.add_data(qr.qr_string)
        qr_code.make(fit=True)
        img = qr_code.make_image()

        buffer = BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)

        return HttpResponse(buffer, content_type='image/png')

    except QR.DoesNotExist:
        return HttpResponse(status=404)

@extend_schema(
    tags=['Events'],
    summary='Przypisanie użytkownikowi roli w evencie na podstawie emaila',
    parameters=[
        OpenApiParameter(
            name='event_id',
            type=int,
            required=True,
            location=OpenApiParameter.PATH,
            description="ID wydarzenia"
        )
    ],
    request=AssignRoleSerializer,
    responses={
        200: OpenApiResponse(description="Rola została przypisana"),
        400: OpenApiResponse(description="Błędne dane lub brak emaila/roli"),
        404: OpenApiResponse(description="Nie znaleziono użytkownika lub QR"),
        500: OpenApiResponse(description="Błąd serwera")
    }
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def assign_role(request, event_id):
    email = request.data.get("email")
    role = request.data.get("role")

    if not email:
        return Response({"error": "Email is required"}, status=400)

    if role not in dict(QR.USER_ROLE_CHOICES):
        return Response({"error": "Invalid role"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User with this email does not exist"}, status=404)

    try:
        qr, created = QR.objects.get_or_create(
            id_event_id=event_id,
            id_user=user,
            defaults={"user_role": role}
        )

        if not created:
            qr.user_role = role
            qr.save()

        return Response({
            "message": "Role assigned successfully",
            "email": email,
            "role": role,
            "event_id": event_id
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@extend_schema(
    tags=['Events'],
    summary='Lista użytkowników z rolami w evencie',
    parameters=[
        OpenApiParameter(
            name='event_id',
            type=int,
            location=OpenApiParameter.PATH,
            required=True,
            description="ID wydarzenia"
        )
    ],
    responses={
        200: EventUserRoleSerializer(many=True),
        404: OpenApiResponse(description="Nie znaleziono eventu lub użytkowników"),
    }
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_event_roles(request, event_id):
    try:
        roles = QR.objects.filter(id_event_id=event_id)

        serializer = EventUserRoleSerializer(roles, many=True)
        return Response(serializer.data)

    except Exception as e:
        return Response({"error": str(e)}, status=500)