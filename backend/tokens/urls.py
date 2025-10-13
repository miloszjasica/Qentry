from django.urls import path
from . import views

urlpatterns = [
    path('balance/<int:user_id>/<int:id_event>/', views.balance, name='qr-balance')
    #path('purchase-tokens/', views.purchase_tokens, name='purchase-tokens'),
]
