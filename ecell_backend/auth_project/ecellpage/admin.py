from django.contrib import admin
from .models import Event, Gallery, Collaborator, Initiative, SocialMedia, Stat, EventCollaborator, InitiativeCollaborator, HeroContent, AboutUs, ContactSubmission

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_date', 'event_type')

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('event_date', 'event')

@admin.register(Collaborator)
class CollaboratorAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Initiative)
class InitiativeAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle')

@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url')

@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ('title', 'value')

@admin.register(EventCollaborator)
class EventCollaboratorAdmin(admin.ModelAdmin):
    list_display = ('event', 'collaborator')

@admin.register(InitiativeCollaborator)
class InitiativeCollaboratorAdmin(admin.ModelAdmin):
    list_display = ('initiative', 'collaborator')

@admin.register(HeroContent)
class HeroContentAdmin(admin.ModelAdmin):
    list_display = ('tagline', 'buttonText', 'created_at')
    search_fields = ('tagline', 'taglinedescription')

@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_display = ('what_is_ECell',)
    search_fields = ('what_is_ECell',)

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email', 'message')
