from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import User
from events.models import Event
from .models import QR
from decimal import Decimal, ROUND_DOWN as decimal

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
def get_tokens(request, user_id, id_event):
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
def purchase_tokens(request, user_id, id_event):
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
