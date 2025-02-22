from django.contrib import admin
from .models import Event, Registration
from django import forms
from django.utils.html import format_html

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = '__all__'
        
    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get('start_date')
        end_date = cleaned_data.get('end_date')
        
        if start_date and end_date and start_date >= end_date:
            raise forms.ValidationError("End date must be after start date")
            
        return cleaned_data

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = Registration
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'event' in self.fields:
            # Only show future or active events
            self.fields['event'].queryset = Event.objects.filter(
                status__in=['upcoming', 'active']
            )

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventForm
    list_display = ('name', 'start_date', 'end_date', 'status', 'registration_fields_preview')
    list_filter = ('status',)
    search_fields = ('name', 'description')
    date_hierarchy = 'start_date'
    ordering = ('-start_date',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'start_date', 'end_date', 'status')
        }),
        ('Registration Fields', {
            'fields': ('registration_fields',),
            'description': 'Enter JSON format for custom registration fields. Example: {"field_name": "Field Type"}'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def registration_fields_preview(self, obj):
        if obj.registration_fields:
            return format_html('<pre>{}</pre>', obj.registration_fields)
        return "-"
    registration_fields_preview.short_description = 'Registration Fields'

    def clean_registration_fields(self, value):
        try:
            import json
            fields = json.loads(value)
            
            # Validate field types
            allowed_types = ['text', 'email', 'phone', 'number', 'url']
            for field_name, field_type in fields.items():
                if ' ' in field_name:
                    raise forms.ValidationError(f"Field name '{field_name}' contains spaces. Use underscores instead.")
                if field_type not in allowed_types:
                    raise forms.ValidationError(f"Invalid type '{field_type}' for field '{field_name}'. Allowed types: {', '.join(allowed_types)}")
            
            return json.dumps(fields, indent=4)
        except json.JSONDecodeError:
            raise forms.ValidationError("Invalid JSON format for registration fields.")

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    form = RegistrationForm
    list_display = ('user_email', 'event', 'created_at', 'data_preview')
    list_filter = ('event', 'created_at')
    search_fields = ('user__email', 'event__name')
    date_hierarchy = 'created_at'
    raw_id_fields = ('user', 'event')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Registration Details', {
            'fields': ('user', 'event', 'data')
        }),
        ('Timestamps', {
            'fields': ('created_at',)
        }),
    )

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User Email'

    def data_preview(self, obj):
        if obj.data:
            return format_html('<pre>{}</pre>', obj.data)
        return "-"
    data_preview.short_description = 'Data'
