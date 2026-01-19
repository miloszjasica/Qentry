from django.contrib import admin
from .models import QR, Transaction

# Register your models here.
class QRAdmin(admin.ModelAdmin):
    list_display = ('id_qr', 'balance', 'is_active', 'user_role', 'generated_at', 'id_event', 'id_user', 'qr_string')
    search_fields = ('id_user__name', 'id_event__name', 'qr_string')
    list_filter = ('is_active', 'id_event')
    ordering = ('-generated_at',)

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id_transaction', 'id_user', 'id_attraction', 'date')
    search_fields = ('id_user__name', 'id_attraction__name')
    list_filter = ('date',)
    ordering = ('-date',)


admin.site.register(Transaction, TransactionAdmin)
admin.site.register(QR, QRAdmin)