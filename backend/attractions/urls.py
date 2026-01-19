from django.urls import path
from . import views

urlpatterns = [
    path('events/<int:id>/attractions/', views.list_attractions),
    path('events/<int:id>/attractions/add/', views.add_attraction),
    path('attractions/<int:id>/', views.get_attraction_details),
    path('attractions/<int:id>/update/', views.update_attraction),
    path('attractions/<int:id>/delete/', views.delete_attraction),
    path('attractions/<int:id>/stats/', views.attraction_stats),
]