from django.contrib import admin
from .models import Event, Attraction
# Register your models here.

class EventAdmin(admin.ModelAdmin):
    list_display = ('id_event', 'name', 'description', 'is_active', 'location', 'start_date', 'end_date', 'participants', 'created_at')
    search_fields = ('name', 'location')
    list_filter = ('is_active', 'start_date', 'end_date')
    ordering = ('-created_at',)

class AttractionAdmin(admin.ModelAdmin):
    list_display = ('id_attraction', 'name', 'description', 'is_active', 'price', 'id_event', 'counter')
    search_fields = ('name', 'id_event__name')
    list_filter = ('is_active', 'id_event')
    ordering = ('-id_attraction',)

admin.site.register(Event, EventAdmin)
admin.site.register(Attraction, AttractionAdmin)