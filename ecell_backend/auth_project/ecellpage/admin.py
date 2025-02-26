from django.contrib import admin
from .models import Gallery, ContactSubmission, Team

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'team_type', 'role', 'course_year', 'img_link')
    list_filter = ('team_type',)
    search_fields = ('name', 'role')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('event_date',)

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email', 'message')

admin.site.site_header = "ECELL ADMIN PANEL"
admin.site.site_title = "ECELL ADMIN"
admin.site.index_title = "Welcome to ECELL Admin Dashboard"
