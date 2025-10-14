from django.urls import path
from . import views

urlpatterns = [
    path('users/<int:user_id>/<int:id_event>', views.user_balance, name='user-balance'),
    path('users/<int:user_id>/<int:id_event>/add', views.add_tokens, name='add-tokens'),
    path('transactions/<int:user_id>/<int:id_event>/<int:id_attraction>', views.new_transaction, name='new-transaction'),
    path('transactions/<int:transaction_id>', views.get_transaction, name='transaction-details'),
    path('transactions/', views.list_transactions, name='list-transactions'),
    path('users/<int:user_id>/transactions', views.user_transactions, name='user-transactions'),
    path('attractions/<int:id_attraction>/transactions', views.attraction_transactions, name='history-attraction-transactions'),
]
