import pytest
from projects.models import Project

@pytest.mark.django_db
def test_create_project(auth_client):
    res = auth_client.post('/api/projects/', {
        'title': 'Test Project',
        'description': 'Testing',
        'status': 'active'
    })
    assert res.status_code == 201

@pytest.mark.django_db
def test_list_projects(auth_client, user):
    Project.objects.create(user=user, title='P1', status='active')
    res = auth_client.get('/api/projects/')
    assert res.status_code == 200