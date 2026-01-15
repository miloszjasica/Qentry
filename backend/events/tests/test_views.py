from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from events.models import Event

User = get_user_model()


class EventApiTests(APITestCase):

    def setUp(self):
        self.admin_user = User.objects.create_superuser(email='admin@test.com', password='password123', is_staff=True)
        self.organizer_user = User.objects.create_user(email='org@test.com', password='password123')
        self.organizer_user.wants_to_be_organizer = True
        self.organizer_user.save()

        self.guest_user = User.objects.create_user(email='guest@test.com', password='password123')

        self.event1 = Event.objects.create(
            name="Koncert Rockowy",
            description="Opis koncertu",
            location="Warszawa",
            category="music",
            is_active=True,
            user_id=self.organizer_user,  # Instancja, nie ID
            start_date=timezone.now(),
            end_date=timezone.now() + timedelta(days=1)
        )

    def test_get_all_events(self):
        url = reverse('get_events')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_event_by_organizer(self):
        self.client.force_authenticate(user=self.organizer_user)

        url = reverse('create_event')

        data = {
            "name": "Nowy Event",
            "description": "Opis",
            "location": "Gdańsk",
            "category": "tech",
            "start_date": timezone.now().isoformat(),
            "end_date": (timezone.now() + timedelta(days=1)).isoformat()
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_close_event(self):
        self.client.force_authenticate(user=self.organizer_user)
        url = reverse('close_event', kwargs={'id': self.event1.id_event})  # Używamy id_event zgodnie z modelem
        response = self.client.post(url)
        self.event1.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(self.event1.is_active)