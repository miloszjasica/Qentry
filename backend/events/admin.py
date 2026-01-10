from django.contrib import admin
from .models import Event
# Register your models here.

class EventAdmin(admin.ModelAdmin):
    list_display = ('id_event', 'name', 'description', 'is_active', 'location', 'start_date', 'end_date', 'max_participants', 'created_at')
    search_fields = ('name', 'location')
    list_filter = ('is_active', 'start_date', 'end_date')
    ordering = ('-created_at',)

admin.site.register(Event, EventAdmin)
