from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from accounts.models import User
from tokens.models import Transaction, QR
from attractions.models import Attraction
from events.models import Event
from datetime import timedelta
from django.utils import timezone

class MyBalanceTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@test.com',
            password='password123!',
            name='Mariusz',
            surname='Bąk',
        )

        self.event = Event.objects.create(
            name='Turniej Szachowy',
            description='Turniej szachowy dla amatorów',
            start_date=timezone.now() + timedelta(days=1),
            end_date=timezone.now() + timedelta(days=2),
            is_active=True,
            user_id=self.user,
            location='Limanowa',
        )

        self.qr = QR.objects.create(
            id_user=self.user,
            id_event=self.event,
            balance=100,
            qr_string='123a-324b-456c',
        )

        self.url = reverse('my-balance', args=[self.event.id_event])

    def test_get_balance_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(float(response.data['balance']), 100)

    def test_get_balance_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_balance_no_qr(self):
        other_user = User.objects.create_user(
            email='user1@test.com',
            password='pass123!',
            name='Kamil',
            surname='Wrona',
        )
        self.client.force_authenticate(user=other_user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Nie znaleziono kodu QR dla użytkownika w tym wydarzeniu')

    def test_get_balance_inactive_qr(self):
        self.qr.is_active = False
        self.qr.save()
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Twój kod QR jest nieaktywny')

    def test_get_balance_no_event(self):
        self.client.force_authenticate(user=self.user)
        invalid_url = reverse('my-balance', args=[100])
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Nie znaleziono wydarzenia')

class AddBalanceTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@test.com',
            password='password123!',
            name='Mariusz',
            surname='Bąk',
        )

        self.user2 = User.objects.create_user(
            email='user2@test.com',
            password='pass123!',
            name='Paulina',
            surname='Kowalska',
        )

        self.event = Event.objects.create(
            name='Turniej Szachowy',
            description='Turniej szachowy dla amatorów',
            start_date=timezone.now() + timedelta(days=1),
            end_date=timezone.now() + timedelta(days=2),
            is_active=True,
            user_id=self.user,
            location='Limanowa',
            latitude=50.0,
            longitude=20.0
        )

        self.qr = QR.objects.create(
            id_user=self.user,
            id_event=self.event,
            balance=100,
            qr_string='123a-324b-456c',
        )

        self.qr2 = QR.objects.create(
            id_user=self.user2,
            id_event=self.event,
            balance=50,
            user_role='token_seller',
            qr_string='789x-012y-345z',
        )

        self.url = reverse('add-tokens', args=[self.qr.qr_string, self.event.id_event])

    def test_add_balance_success(self):
        self.client.force_authenticate(user=self.user2)
        response = self.client.post(self.url, data={'amount': 30.00})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.qr.refresh_from_db()
        self.assertEqual(float(self.qr.balance), 130.0)
        
    def test_add_balance_invalid_amount(self):
        self.client.force_authenticate(user=self.user2)
        response = self.client.post(self.url, data={'amount': 'abc'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Niepoprawna kwota')

    def test_add_balance_missing_amount(self):
        self.client.force_authenticate(user=self.user2)
        response = self.client.post(self.url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Kwota musi być wprowadzona')

    def test_add_balance_forbidden_role(self):
        self.qr2.user_role = 'guest'
        self.qr2.save()
        self.client.force_authenticate(user=self.user2)
        response = self.client.post(self.url, data={'amount': 20})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['error'], 'Nie możesz sprzedawać tokenów jako gość lub kasjer')

    def test_add_balance_nonexistent_qr(self):
        self.client.force_authenticate(user=self.user2)
        url_invalid = reverse('add-tokens', args=['INVALIDQR', self.event.id_event])
        response = self.client.post(url_invalid, data={'amount': 30})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Nie znaleziono kodu QR użytkownika w tym wydarzeniu')

    def test_add_balance_nonexistent_event(self):
        self.client.force_authenticate(user=self.user2)
        url_invalid = reverse('add-tokens', args=[self.qr.qr_string, 10])
        response = self.client.post(url_invalid, data={'amount': 30})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Nie znaleziono wydarzenia')

class NewTransactionTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@test.com',
            password='password123!',
            name='Mariusz',
            surname='Bąk',
        )

        self.operator = User.objects.create_user(
            email='operator@test.com',
            password='pass123!',
            name='Paulina',
            surname='Kowalska',
        )

        self.event = Event.objects.create(
            name='Turniej Szachowy',
            description='Testowy event',
            start_date=timezone.now() + timedelta(days=1),
            end_date=timezone.now() + timedelta(days=2),
            is_active=True,
            user_id=self.user,
            location='Limanowa',
            latitude=50.0,
            longitude=20.0
        )

        self.qr = QR.objects.create(
            id_user=self.user,
            id_event=self.event,
            balance=100,
            qr_string='123a-324b-456c',
        )

        self.operator_qr = QR.objects.create(
            id_user=self.operator,
            id_event=self.event,
            balance=50,
            qr_string='789x-012y-345z',
            user_role='token_taker'
        )

        self.attraction = Attraction.objects.create(
            id_event=self.event,
            name='Stoisko z jedzeniem',
            price=30,
            counter=0,
            is_active=True
        )

        self.url = reverse('new-transaction', args=[self.qr.qr_string, self.attraction.id_attraction])

    def test_transaction_success(self):
        self.client.force_authenticate(user=self.operator)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.qr.refresh_from_db()
        self.attraction.refresh_from_db()
        self.assertEqual(float(self.qr.balance), 70)
        self.assertEqual(self.attraction.counter, 1)
        self.assertTrue(Transaction.objects.filter(id_user=self.qr.id_user, id_attraction=self.attraction).exists())

    def test_transaction_unauthenticated(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_transaction_forbidden_role(self):
        self.operator_qr.user_role = 'guest'
        self.operator_qr.save()
        self.client.force_authenticate(user=self.operator)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['error'], 'Nie możesz pobierać opłat jako gość lub sprzedający tokeny')

    def test_transaction_insufficient_balance(self):
        self.qr.balance = 20
        self.qr.save()
        self.client.force_authenticate(user=self.operator)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Niewystarczające saldo użytkownika')

    def test_transaction_inactive_qr(self):
        self.qr.is_active = False
        self.qr.save()
        self.client.force_authenticate(user=self.operator)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Kod QR jest nieaktywny')

    def test_transaction_inactive_attraction(self):
        self.attraction.is_active = False
        self.attraction.save()
        self.client.force_authenticate(user=self.operator)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Atrakcja jest nieaktywny')

    def test_transaction_nonexistent_qr(self):
        self.client.force_authenticate(user=self.operator)
        url_invalid = reverse('new-transaction', args=['INVALIDQR', self.attraction.id_attraction])
        response = self.client.post(url_invalid)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Kod QR nieaktywny')

    def test_transaction_nonexistent_attraction(self):
        self.client.force_authenticate(user=self.operator)
        url_invalid = reverse('new-transaction', args=[self.qr.qr_string, 9999])
        response = self.client.post(url_invalid)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Nie znaleziono atrakcji')

class ListTransactionsTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='user@test.com',
            password='password123!',
            name='Mariusz',
            surname='Bąk',
        )

        self.event = Event.objects.create(
            name='Turniej Szachowy',
            description='Testowy event',
            start_date=timezone.now() + timedelta(days=1),
            end_date=timezone.now() + timedelta(days=2),
            is_active=True,
            user_id=self.user,
            location='Limanowa',
            latitude=50.0,
            longitude=20.0
        )

        self.event1 = Event.objects.create(
            name='Festiwal Muzyczny',
            description='Testowy festiwal',
            start_date=timezone.now() + timedelta(days=3),
            end_date=timezone.now() + timedelta(days=4),
            is_active=True,
            user_id=self.user,
            location='Kraków',
            latitude=50.0,
            longitude=20.0
        )

        self.qr = QR.objects.create(
            id_user=self.user,
            id_event=self.event,
            balance=100,
            qr_string='123a-324b-456c',
        )

        self.attraction1 = Attraction.objects.create(
            id_event=self.event,
            name='Stoisko z jedzeniem',
            price=30,
            counter=0,
            is_active=True
        )

        self.attraction2 = Attraction.objects.create(
            id_event=self.event1,
            name='Stoisko z napojami',
            price=15,
            counter=0,
            is_active=True
        )

        self.transaction1 = Transaction.objects.create(
            id_user=self.user,
            id_attraction=self.attraction1,
            amount=30,
            type='attraction'
        )

        self.transaction2 = Transaction.objects.create(
            id_user=self.user,
            id_attraction=self.attraction2,
            amount=20,
            type='attraction'
        )

        self.url = reverse('list-transactions', args=[])

    def test_list_transactions_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['transactions']), 2)

    def test_list_transactions_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_transactions_filtered_by_event(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url, {'id_event': self.event1.id_event})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['transactions']), 1)
        self.assertEqual(response.data['transactions'][0]['id_transaction'], self.transaction2.id_transaction)

    def test_list_transactions_no_transactions(self):
        other_user = User.objects.create_user(
            email='user1@test.com',
            password='pass123!',
            name='Kamil',
            surname='Wrona',
        )
        self.client.force_authenticate(user=other_user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['transactions']), 0)

