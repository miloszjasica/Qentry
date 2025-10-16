from django.contrib import admin
from .models import Attraction

class AttractionAdmin(admin.ModelAdmin):
    list_display = ('id_attraction', 'name', 'description', 'is_active', 'price', 'id_event', 'counter')
    search_fields = ('name', 'id_event__name')
    list_filter = ('is_active', 'id_event')
    ordering = ('-id_attraction',)

admin.site.register(Attraction, AttractionAdmin)