from django.db import models
from accounts.models import User
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable
from django.utils import timezone

class Event(models.Model):

    CATEGORY_CHOICES = [
        ("music", "Muzyka"),
        ("art", "Sztuka"),
        ("food", "Jedzenie"),
        ("sport", "Sport"),
        ("business", "Business"),
        ("theatre", "Teatr"),
        ("tech", "Technologia"),
        ("wellness", "Wellness"),
        ("gaming", "Gaming"),
        ("film", "Film"),
        ("fashion", "Moda"),
        ("books", "Książki"),
        ("other", "Inne"),
    ]

    id_event = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    location = models.CharField(max_length=255)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    participants = models.IntegerField(default=0)
    image = models.URLField(max_length=500, null=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="other")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """Automatycznie uzupełnia latitude i longitude na podstawie location."""
        if self.location and (self.latitude is None or self.longitude is None):
            try:
                geolocator = Nominatim(user_agent="events_app")
                location_data = geolocator.geocode(self.location, timeout=10)
                if location_data:
                    self.latitude = location_data.latitude
                    self.longitude = location_data.longitude
            except (GeocoderTimedOut, GeocoderUnavailable) as e:
                print(f"Error geocoding location '{self.location}': {e}")

        super().save(*args, **kwargs)

    @staticmethod
    def deactivate_finished_events():
        today = timezone.now().date()
        Event.objects.filter(end_date__lt=today, is_active=True).update(is_active=False)