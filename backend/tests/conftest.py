import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def user(db):
    return User.objects.create_user(
        email='testuser@test.com',
        username='testuser',
        password='Test@123'
    )

@pytest.fixture
def auth_client(client, user):
    response = client.post('/api/users/login/', {
        'email': 'testuser@test.com',
        'password': 'Test@123'
    })
    token = response.data['access']
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    return client