import pytest

@pytest.mark.django_db
def test_register(client):
    res = client.post('/api/users/register/', {
        'email': 'new@test.com',
        'username': 'newuser',
        'password': 'Test@123'
    })
    assert res.status_code == 201

@pytest.mark.django_db
def test_login(client, user):
    res = client.post('/api/users/login/', {
        'email': 'testuser@test.com',
        'password': 'Test@123'
    })
    assert res.status_code == 200
    assert 'access' in res.data