from django.db import models

# Create your models here.

class Gallery(models.Model):
    image_url = models.TextField()
    event_date = models.DateField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Gallery {self.id}"


class ContactSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"


class Team(models.Model):
    TEAM_CHOICES = [
        ('FACULTY', 'Faculty Advisors'),
        ('DOMAIN', 'Domain Leaders'),
        ('MANAGEMENT', 'Management Team'),
    ]
    
    team_type = models.CharField(max_length=20, choices=TEAM_CHOICES)
    name = models.CharField(max_length=100)
    course_year = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    description = models.TextField()
    linkedin_link = models.URLField(blank=True, null=True)
    contact_no = models.CharField(max_length=15)
    img_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.get_team_type_display()}"
