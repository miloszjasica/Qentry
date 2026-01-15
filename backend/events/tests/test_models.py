from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from unittest.mock import patch
from accounts.models import User
from events.models import Event

class EventModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='model@test.com', password='password123')

    def test_event_str_representation(self):
        event = Event(name="Festiwal Światła")
        self.assertEqual(str(event), "Festiwal Światła")

    @patch('geopy.geocoders.Nominatim.geocode')
    def test_save_auto_geocoding(self, mock_geocode):
        mock_location = mock_geocode.return_value
        mock_location.latitude = 52.2297
        mock_location.longitude = 21.0122

        event = Event.objects.create(
            user_id=self.user,
            name="Event w Warszawie",
            description="Opis wydarzenia",
            location="Warszawa",
            start_date=timezone.now(),
            end_date=timezone.now() + timedelta(hours=2)
        )

        self.assertTrue(mock_geocode.called)
        self.assertEqual(event.latitude, 52.2297)
        self.assertEqual(event.longitude, 21.0122)

    def test_deactivate_finished_events(self):
        yesterday = timezone.now() - timedelta(days=1)
        tomorrow = timezone.now() + timedelta(days=1)

        event_old = Event.objects.create(
            user_id=self.user,
            name="Stary Event",
            description="Opis",
            start_date=yesterday - timedelta(hours=2),
            end_date=yesterday,
            is_active=True
        )

        event_new = Event.objects.create(
            user_id=self.user,
            name="Nowy Event",
            description="Opis",
            start_date=timezone.now(),
            end_date=tomorrow,
            is_active=True
        )

        Event.deactivate_finished_events()
        event_old.refresh_from_db()
        event_new.refresh_from_db()

        self.assertFalse(event_old.is_active)
        self.assertTrue(event_new.is_active)