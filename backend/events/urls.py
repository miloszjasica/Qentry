from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_events),
    path('<int:id>/', views.get_event_details),
    path('create/', views.create_event),
    path('<int:id>/update/', views.update_event),
    path('<int:id>/delete/', views.delete_event),
    path('<int:id>/clone/', views.clone_event),
    path('<int:id>/open/', views.open_event),
    path('<int:id>/close/', views.close_event),
]