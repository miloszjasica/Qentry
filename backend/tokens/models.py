from django.db import models
from events.models import Event, Attraction
from accounts.models import User

# Create your models here.
class QR(models.Model):
    id_qr = models.AutoField(primary_key=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_active = models.BooleanField(default=True)
    generated_at = models.DateTimeField(auto_now_add=True)
    id_event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='qrs')
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='qrs')
    qr_string = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"QR {self.id_qr} - {self.id_user.name}"


class Transaction(models.Model):
    id_transaction = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    id_attraction = models.ForeignKey(Attraction, on_delete=models.CASCADE, related_name='transactions')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction {self.id_transaction} - {self.id_user.name}"