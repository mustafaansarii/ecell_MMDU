from rest_framework import serializers
from .models import Event, Registration, JoinEcellRegistration

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'status']

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['id', 'event', 'user', 'data', 'created_at']

class JoinEcellRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinEcellRegistration
        fields = '__all__'
        extra_kwargs = {
            'full_name': {'required': False},
            'roll_number': {'required': False},
            'course_branch': {'required': False},
            'year_of_study': {'required': False},
            'contact_number': {'required': False},
            'email': {'required': False},
            'linkedin_profile': {'required': False},
            'field_of_interest': {'required': False},
            'role_preference': {'required': False},
            'has_experience': {'required': False},
            'experience_description': {'required': False},
            'skills': {'required': False},
            'portfolio_links': {'required': False},
            'motivation': {'required': False},
            'value_proposition': {'required': False},
            'time_commitment': {'required': False},
            'team_work_comfort': {'required': False},
            'has_startup_ideas': {'required': False},
            'startup_ideas_description': {'required': False},
            'suggestions': {'required': False},
        }

    def validate(self, data):
        # Check for existing records with the same unique fields
        errors = {}
        
        if data.get('email') and JoinEcellRegistration.objects.filter(email=data.get('email')).exists():
            errors['email'] = 'This email is already registered.'
        
        if data.get('contact_number') and JoinEcellRegistration.objects.filter(contact_number=data.get('contact_number')).exists():
            errors['contact_number'] = 'This contact number is already registered.'
        
        if data.get('roll_number') and JoinEcellRegistration.objects.filter(roll_number=data.get('roll_number')).exists():
            errors['roll_number'] = 'This roll number is already registered.'
        
        if errors:
            raise serializers.ValidationError(errors)
        
        return data 