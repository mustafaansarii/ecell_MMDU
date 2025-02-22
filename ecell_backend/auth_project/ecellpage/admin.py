from django.contrib import admin
from .models import Gallery, ContactSubmission
from django.contrib import admin
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
