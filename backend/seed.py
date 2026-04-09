import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from projects.models import Project, Task

User = get_user_model()

def seed():
    # Clean old data
    User.objects.filter(email='test@example.com').delete()

    # Create user
    user = User.objects.create_user(
        email='test@example.com',
        username='testuser',
        password='Test@123'
    )

    # Create projects
    project1 = Project.objects.create(
        user=user,
        title='E-Commerce App',
        description='Building an online store',
        status='active'
    )

    project2 = Project.objects.create(
        user=user,
        title='Portfolio Website',
        description='Personal portfolio',
        status='completed'
    )

    # Tasks for project 1
    for i, (title, status) in enumerate([
        ('Setup Django', 'done'),
        ('Build APIs', 'in-progress'),
        ('Write Tests', 'todo'),
    ]):
        Task.objects.create(
            project=project1,
            title=title,
            status=status,
            description=f'Task {i+1} for project 1'
        )

    # Tasks for project 2
    for i, (title, status) in enumerate([
        ('Design UI', 'done'),
        ('Deploy to Vercel', 'done'),
        ('Add Blog Section', 'todo'),
    ]):
        Task.objects.create(
            project=project2,
            title=title,
            status=status,
            description=f'Task {i+1} for project 2'
        )

    print("✅ Seeding done!")

if __name__ == '__main__':
    seed()