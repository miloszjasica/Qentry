from django.urls import path
from .views import get_events,create_event

urlpatterns = [
    path('', get_events, name='get-events'),
    path('create/', create_event, name='create-event'),
]