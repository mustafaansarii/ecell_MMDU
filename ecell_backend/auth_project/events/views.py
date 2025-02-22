from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Event, Registration
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer, RegistrationSerializer

# Create your views here.

@login_required
def submit_event_data(request):
    active_event = Event.objects.get_active_event()
    
    if not active_event:
        return JsonResponse({'error': 'No active event found'}, status=400)
    
    if request.method == 'POST':
        # Process and validate the submitted data
        data = request.POST  # or request.body for JSON data
        
        # Create registration
        registration, created = Registration.objects.get_or_create(
            event=active_event,
            user=request.user,
            defaults={'data': data}
        )
        
        if not created:
            return JsonResponse({'error': 'You have already submitted data for this event'}, status=400)
            
        return JsonResponse({'message': 'Data submitted successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@login_required
def create_event(request):
    if not request.user.is_staff:
        return JsonResponse({'error': 'Permission denied'}, status=403)
    
    if request.method == 'POST':
        # Process and validate event data
        name = request.POST.get('name')
        description = request.POST.get('description')
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        
        # Check if there's already an active event
        if Event.objects.filter(status='active').exists():
            return JsonResponse({'error': 'There is already an active event'}, status=400)
        
        event = Event.objects.create(
            name=name,
            description=description,
            start_date=start_date,
            end_date=end_date
        )
        
        return JsonResponse({'message': 'Event created successfully', 'event_id': event.id})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

class EventListView(APIView):
    def get(self, request):
        # Get all events, ordered by start_date
        events = Event.objects.all().order_by('start_date')
        
        # Serialize the events
        serializer = EventSerializer(events, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

@csrf_exempt
def register_for_event(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        event = Event.objects.filter(status='active').first()
        
        if not event:
            return JsonResponse({'error': 'No active event found'}, status=404)
        
        # Get required fields from admin configuration and convert to list
        required_fields = list(event.registration_fields.keys()) if event.registration_fields else []
        
        # Include email in required fields if it's not already there
        if 'email' not in required_fields:
            required_fields.append('email')
        
        # Validate required fields
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return JsonResponse({
                'error': 'Missing required fields',
                'missing_fields': missing_fields,
                'required_fields': list(required_fields)
            }, status=400)
        
        # Get user data from request
        email = data.get('email')
        
        # Get or create user
        User = get_user_model()
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'full_name': data.get('full_name', ''),
                'is_active': True
            }
        )
        
        # Prepare registration data
        registration_data = {field: data.get(field) for field in required_fields}
        
        # Create or update registration
        registration, reg_created = Registration.objects.get_or_create(
            event=event,
            user=user,
            defaults={'data': registration_data}
        )
        
        if not reg_created:
            registration.data = registration_data
            registration.save()
        
        return JsonResponse({
            'message': 'Registration successful',
            'registration_id': registration.id,
            'created': reg_created,
            'event': event.name
        }, status=201)
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
