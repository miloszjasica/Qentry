
# Create your tests here.
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from events.models import Event
from accounts.models import User
from unittest.mock import patch
from datetime import datetime, timedelta
from django.utils import timezone

class NearbyEventsTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@test.com',
            password='password123!',
            name='Mariusz',
            surname='Bąk'
        )

        self.event1 = Event.objects.create(
            name='Turniej Szachowy',
            description='Testowy turniej',
            start_date=timezone.now() + timedelta(days=1),
            end_date=timezone.now() + timedelta(days=2),
            is_active=True,
            user_id=self.user,
            location='Limanowa',
            latitude=49.71,
            longitude=20.42,
            category='sport'
        )

        self.event2 = Event.objects.create(
            name='Festiwal Muzyczny',
            description='Testowy festiwal',
            start_date=timezone.now() + timedelta(days=1),
            end_date=timezone.now() + timedelta(days=2),
            is_active=True,
            user_id=self.user,
            location='Kraków',
            latitude=50.0647,
            longitude=19.9450,
            category='music'
        )

        self.url = reverse('get-nearby-events')

    @patch('events.views.get_locations')
    def test_get_nearby_events_custom_radius(self, mock_get_locations):
        mock_get_locations.return_value = (50.0, 20.0)
        response = self.client.get(self.url, {'radius': 200})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    @patch('events.views.get_locations')
    def test_get_nearby_events_default_radius(self, mock_get_locations):
        mock_get_locations.return_value = (49.71, 20.42)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        event_names = [e['name'] for e in response.data]
        self.assertIn('Turniej Szachowy', event_names)

    @patch('events.views.get_locations')
    def test_get_nearby_events_category_filter(self, mock_get_locations):
        mock_get_locations.return_value = (50.0, 20.0)
        response = self.client.get(self.url, {'category': 'sport', 'radius': 50})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['category'], 'sport')

    @patch('events.views.get_locations')
    def test_get_nearby_events_name_filter(self, mock_get_locations):
        mock_get_locations.return_value = (50.0, 20.0)
        response = self.client.get(self.url, {'name': 'turniej', 'radius': 50})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertIn('Turniej', response.data[0]['name'])


    @patch('events.views.get_locations')
    def test_get_nearby_events_invalid_radius(self, mock_get_locations):
        mock_get_locations.return_value = (50.0, 20.0)
        response = self.client.get(self.url, {'radius': 'abc'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    @patch('events.views.get_locations')
    def test_get_nearby_events_invalid_end_date(self, mock_get_locations):
        mock_get_locations.return_value = (50.0, 20.0)
        response = self.client.get(self.url, {'end_date': '2023-13-01'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    @patch('events.views.get_locations')
    def test_get_nearby_events_no_location(self, mock_get_locations):
        mock_get_locations.return_value = (None, None)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
