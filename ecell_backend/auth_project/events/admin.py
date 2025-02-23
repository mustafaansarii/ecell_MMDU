from django.contrib import admin
from .models import Event, Registration, JoinEcellRegistration
from django import forms
from django.utils.html import format_html
from django.http import HttpResponse
import csv
import openpyxl
from datetime import datetime

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
    actions = ['export_as_csv']

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User Email'

    def data_preview(self, obj):
        if obj.data:
            return format_html('<pre>{}</pre>', obj.data)
        return "-"
    data_preview.short_description = 'Data'

    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        # Get date range from request
        date_from = request.GET.get('created_at__gte')
        date_to = request.GET.get('created_at__lte')
        
        # Filter queryset if date range is provided
        if date_from or date_to:
            try:
                if date_from:
                    queryset = queryset.filter(created_at__gte=date_from)
                if date_to:
                    queryset = queryset.filter(created_at__lte=date_to)
            except Exception as e:
                self.message_user(request, f"Invalid date format: {str(e)}", level='error')
                return

        if not queryset.exists():
            self.message_user(request, "No records found for the selected date range", level='warning')
            return

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={meta.verbose_name_plural}-{datetime.now().strftime("%Y-%m-%d")}.csv'
        
        writer = csv.writer(response)
        writer.writerow(field_names)
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])

        return response
    export_as_csv.short_description = "Export Selected as CSV"

@admin.register(JoinEcellRegistration)
class JoinEcellRegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'course_branch', 'year_of_study', 'created_at')
    search_fields = ('full_name', 'email', 'roll_number')
    list_filter = ('year_of_study', 'role_preference', 'time_commitment', ('created_at', admin.DateFieldListFilter))
    readonly_fields = ('created_at', 'updated_at')
    actions = ['export_as_csv']
    date_hierarchy = 'created_at'

    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        # Get date range from request
        date_from = request.GET.get('created_at__gte')
        date_to = request.GET.get('created_at__lte')
        
        # Filter queryset if date range is provided
        if date_from or date_to:
            try:
                if date_from:
                    queryset = queryset.filter(created_at__gte=date_from)
                if date_to:
                    queryset = queryset.filter(created_at__lte=date_to)
            except Exception as e:
                self.message_user(request, f"Invalid date format: {str(e)}", level='error')
                return

        if not queryset.exists():
            self.message_user(request, "No records found for the selected date range", level='warning')
            return

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={meta.verbose_name_plural}-{datetime.now().strftime("%Y-%m-%d")}.csv'
        
        writer = csv.writer(response)
        writer.writerow(field_names)
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])

        return response
    export_as_csv.short_description = "Export Selected as CSV"
