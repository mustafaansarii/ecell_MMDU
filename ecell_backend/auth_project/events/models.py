from django.db import models
from django.utils import timezone
from .managers import EventManager
from django.conf import settings

class Event(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    registration_fields = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = EventManager()

    def __str__(self):
        return self.name

    @classmethod
    def get_active_event(cls):
        return cls.objects.filter(status='active').first()

class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    data = models.JSONField()  # For storing user-submitted data
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('event', 'user')

    def __str__(self):
        return f"{self.user.email} - {self.event.name}"

class JoinEcellRegistration(models.Model):
    ROLE_CHOICES = [
        ('domain_leader', 'Domain Leader'),
        ('management_team', 'Management Team'),
    ]
    
    TIME_COMMITMENT_CHOICES = [
        ('1-3', '1-3 hours per week'),
        ('4-6', '4-6 hours per week'),
        ('7+', '7+ hours per week'),
    ]
    
    # Basic Information
    full_name = models.CharField(max_length=255, blank=True, null=True)
    roll_number = models.CharField(max_length=20, unique=True, blank=True, null=True)
    course_branch = models.CharField(max_length=100, blank=True, null=True)
    year_of_study = models.CharField(max_length=10, blank=True, null=True)
    contact_number = models.CharField(max_length=15, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    linkedin_profile = models.URLField(blank=True, null=True)
    
    # Interest & Role Preference
    field_of_interest = models.TextField(blank=True, null=True)
    role_preference = models.CharField(max_length=20, choices=ROLE_CHOICES, blank=True, null=True)
    
    # Skills & Experience
    has_experience = models.BooleanField(default=False, blank=True, null=True)
    experience_description = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    portfolio_links = models.TextField(blank=True, null=True)
    
    # Motivation & Commitment
    motivation = models.TextField(blank=True, null=True)
    value_proposition = models.TextField(blank=True, null=True)
    time_commitment = models.CharField(max_length=3, choices=TIME_COMMITMENT_CHOICES, blank=True, null=True)
    team_work_comfort = models.BooleanField(default=False, blank=True, null=True)
    
    # Additional Questions
    has_startup_ideas = models.BooleanField(default=False, blank=True, null=True)
    startup_ideas_description = models.TextField(blank=True, null=True)
    suggestions = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} - {self.email}"
