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
    path('nearby-events/', views.get_nearby_events),
    path('organizer-events/', views.get_organizer_events),
    path('events/<int:event_id>/status/', views.event_status,),
    path('user/roles/', views.get_user_events_with_role, name='user-events-with-role')
    ]