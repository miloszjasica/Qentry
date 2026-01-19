from django.db import models
from events.models import Event


class Attraction(models.Model):
    id_attraction = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    price = models.IntegerField()
    id_event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='attractions')
    counter = models.IntegerField(default=0)

    def __str__(self):
        return self.name