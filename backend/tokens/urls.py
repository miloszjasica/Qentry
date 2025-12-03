from django.urls import path
from . import views

urlpatterns = [
    path('events/<int:id_event>/balance/', views.my_balance, name='my-event-balance'),
    path('users/<str:qr_string>/<int:id_event>/', views.user_balance, name='user-balance'),
    path('users/<str:qr_string>/<int:id_event>/add/', views.add_tokens, name='add-tokens'),
    path('transactions/<str:qr_string>/<int:id_attraction>/', views.new_transaction, name='new-transaction'),
    path('transactions/<int:transaction_id>/', views.get_transaction, name='transaction-details'),
    path('transactions/', views.list_transactions, name='list-transactions'),
    path('users/<int:user_id>/<int:id_event>/transactions/', views.user_transactions, name='user-transactions'),
    path('attractions/<int:id_attraction>/transactions/', views.attraction_transactions, name='history-attraction-transactions'),
    path('events/<int:event_id>/join/', views.join_event, name='join-event'),
    path('events/my/', views.my_events, name='my-events'),
    path('events/<int:event_id>/leave/', views.leave_event, name='leave-event'),
    path('qr/<int:qr_id>/image/', views.get_qr_image, name='qr-image'),
    path("events/<int:event_id>/assign-role/", views.assign_role, name="assign_role"),
    path("events/<int:event_id>/roles/", views.get_event_roles, name="get_event_roles"),
]
