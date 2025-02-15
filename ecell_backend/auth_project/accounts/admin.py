from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Fields to display in the list view
    list_display = ('email', 'full_name', 'is_active', 'is_admin')
    
    # Fields that can be searched
    search_fields = ('email', 'full_name')
    
    # Fields that can be filtered
    list_filter = ('is_active', 'is_admin')
    
    # Fieldsets for the add/change forms
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('full_name',)}),
        ('Permissions', {'fields': ('is_active', 'is_admin')}),
        ('OTP Info', {'fields': ('otp', 'otp_created_at')}),
    )
    
    # Fieldsets for the add form
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2'),
        }),
    )
    
    # Ordering of records
    ordering = ('email',)
    
    # Fields used for filtering the users
    filter_horizontal = ()

# Register the CustomUser model with the CustomUserAdmin
admin.site.register(CustomUser, CustomUserAdmin)
