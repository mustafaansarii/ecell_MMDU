from django.db import models

# Create your models here.

class Event(models.Model):
    EVENT_TYPES = [
        ('upcoming', 'Upcoming'),
        ('past', 'Past'),
    ]
    
    title = models.CharField(max_length=255)
    event_date = models.DateField()
    description = models.TextField()
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Gallery(models.Model):
    image_url = models.TextField()
    event_date = models.DateField()
    description = models.TextField()
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Gallery {self.id}"

class Collaborator(models.Model):
    name = models.CharField(max_length=255)
    logo_url = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Initiative(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    collaborators = models.ManyToManyField(Collaborator, through='InitiativeCollaborator')

    def __str__(self):
        return self.title

class HeroContent(models.Model):
    tagline = models.CharField(max_length=255, default="Igniting Entrepreneurial Spirit at MMDU")
    buttonText = models.CharField(max_length=50, default="Explore Programs")
    buttonLink = models.CharField(max_length=255, default="#")
    taglinedescription = models.TextField(default="E-Cell MMDU fosters innovation and business leadership through mentorship, resources, and startup opportunities. Join us to shape tomorrow's industry leaders.")
    initiativesLink = models.CharField(max_length=255, default="#")
    initiativesText = models.CharField(max_length=50, default="Our Initiatives")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tagline
    
class SocialMedia(models.Model):
    platform = models.CharField(max_length=50)
    url = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.platform

class Stat(models.Model):
    title = models.CharField(max_length=255)
    value = models.CharField(max_length=50)
    icon_name = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class AboutUs(models.Model):
    what_is_ECell = models.CharField(max_length=255)
    vision = models.TextField()
    mission = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.what_is_ECell

class EventCollaborator(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    collaborator = models.ForeignKey(Collaborator, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('event', 'collaborator')

class InitiativeCollaborator(models.Model):
    initiative = models.ForeignKey(Initiative, on_delete=models.CASCADE)
    collaborator = models.ForeignKey(Collaborator, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('initiative', 'collaborator')

class ContactSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
