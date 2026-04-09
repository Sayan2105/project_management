from django.db import models

# Create your models here.
from django.conf import settings

class Project(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = 'projects')
    title = models.CharField(max_length = 255)
    description = models.TextField(blank = True)
    status = models.CharField(max_length = 20, choices = STATUS_CHOICES, default = 'active')
    created_at = models.DateTimeField(auto_now_add = True)

class Task(models.Model):
    STATUS_CHOICES = [
        ('todo', 'Todo'),
        ('in-progress', 'In Progress'),
        ('done', 'Done'),
    ]
    project = models.ForeignKey(Project, on_delete = models.CASCADE, related_name = 'tasks')
    title = models.CharField(max_length = 255)
    description = models.TextField(blank = True)
    status = models.CharField(max_length = 20, choices = STATUS_CHOICES, default = 'todo')
    due_date = models.DateTimeField(null = True, blank = True)