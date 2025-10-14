from django.urls import path
from . import views

urlpatterns = [
    path('users/<int:user_id>/<int:id_event>', views.get_tokens, name='get_tokens'),
    path('users/<int:user_id>/<int:id_event>/add', views.purchase_tokens, name='purchase-tokens'),
]
