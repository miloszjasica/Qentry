from django.db import models


class Event(models.Model):
    id_event = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    location = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    participants = models.IntegerField(default=0)

    def __str__(self):
        return self.name

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
