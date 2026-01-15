from django.test import TestCase, RequestFactory
from django.contrib.auth import get_user_model
from events.serializers import EventSerializer
from events.models import Event

User = get_user_model()

class EventSerializerTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='password123')
        self.factory = RequestFactory()
        self.request = self.factory.post('/')
        self.request.user = self.user

    def test_validate_dates_correct(self):
        data = {
            'name': 'Test Event',
            'description': 'Opis testowy',
            'start_date': '2024-10-10T10:00:00Z',
            'end_date': '2024-10-12T10:00:00Z',
            'location': 'Warszawa',
            'category': 'music'
        }
        serializer = EventSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_validate_dates_invalid(self):
        data = {
            'name': 'Błędny Event',
            'description': 'Opis testowy',
            'start_date': '2024-10-15T10:00:00Z',
            'end_date': '2024-10-10T10:00:00Z',
            'location': 'Warszawa',
            'category': 'music'
        }
        serializer = EventSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('non_field_errors', serializer.errors)

    def test_serializer_create_assigns_user(self):
        data = {
            'name': 'Event z Userem',
            'description': 'Kolejny opis',
            'start_date': '2024-10-10T10:00:00Z',
            'end_date': '2024-10-12T10:00:00Z',
            'location': 'Kraków',
            'category': 'art'
        }
        serializer = EventSerializer(data=data, context={'request': self.request})
        self.assertTrue(serializer.is_valid(), serializer.errors)
        event = serializer.save()
        self.assertEqual(event.user_id, self.user)