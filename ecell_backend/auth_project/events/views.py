from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Event, Registration, JoinEcellRegistration
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer, RegistrationSerializer, JoinEcellRegistrationSerializer
from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse
import json
import uuid
import os
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth import logout
from django.http import HttpResponse
import csv
from django.core.paginator import Paginator
import pandas as pd
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
        
        # Improved email template
        subject = f'Registration Confirmation for {event.name}'
        message = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1a73e8;">Thank you for registering!</h2>
                <p>Dear {data.get('full_name', 'Participant')},</p>
                
                <p>We're excited to confirm your registration for <strong>{event.name}</strong>.</p>
                
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Event Details:</h3>
                    <p><strong>Event:</strong> {event.name}</p>
                    <p><strong>Registration Date:</strong> {event.start_date.strftime('%Y-%m-%d %I:%M %p')}</p>
                    <p><strong>Registration End Date:</strong> {event.end_date.strftime('%Y-%m-%d %I:%M %p')}</p>
                </div>
                
                <p>We'll be in touch with more details as the event approaches. In the meantime, if you have any questions, feel free to reach out to us at {settings.EMAIL_HOST_USER}.</p>
                
                <p>Best regards,<br>
                <strong>{event.name} Team</strong></p>
            </div>
        </body>
        </html>
        """
        from django.core.mail import EmailMultiAlternatives
        msg = EmailMultiAlternatives(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [email],
        )
        msg.attach_alternative(message, "text/html")
        msg.send(fail_silently=False)

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

class JoinEcellRegistrationView(APIView):
    def post(self, request):
        serializer = JoinEcellRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            registration = serializer.save()
            
            # Send confirmation email
            self.send_registration_email(registration)
            
            return Response({
                'message': 'Registration successful!',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Registration failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def send_registration_email(self, registration):
        subject = 'E-Cell Registration Confirmation'
        message = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1a73e8;">Welcome to E-Cell!</h2>
                <p>Dear {registration.full_name},</p>
                
                <p>We're thrilled to receive your application to join E-Cell. Here's a summary of your registration:</p>
                
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Your Details:</h3>
                    <p><strong>Name:</strong> {registration.full_name}</p>
                    <p><strong>Email:</strong> {registration.email}</p>
                    <p><strong>Roll Number:</strong> {registration.roll_number}</p>
                    <p><strong>Course & Branch:</strong> {registration.course_branch}</p>
                    <p><strong>Year of Study:</strong> {registration.year_of_study}</p>
                    <p><strong>Role Preference:</strong> {registration.get_role_preference_display()}</p>
                    <p><strong>Time Commitment:</strong> {registration.get_time_commitment_display()}</p>
                </div>
                
                <p>Our team will review your application and get back to you soon. In the meantime, if you have any questions, feel free to reach out to us at {settings.EMAIL_HOST_USER}.</p>
                
                <p>Best regards,<br>
                <strong>E-Cell Team</strong></p>
            </div>
        </body>
        </html>
        """
        from django.core.mail import EmailMultiAlternatives
        msg = EmailMultiAlternatives(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [registration.email],
        )
        msg.attach_alternative(message, "text/html")
        msg.send(fail_silently=False)

def home(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        # Check credentials from .env file
        if username in settings.STAFF_CREDENTIALS and settings.STAFF_CREDENTIALS[username] == password:
            request.session["authenticated"] = True
            request.session["username"] = username
            return JsonResponse({"success": True})

        return JsonResponse({"success": False, "message": "Invalid credentials"})

    # Check session authentication
    if not request.session.get("authenticated", False):
        return render(request, "index.html", {"show_login": True})

    # Get all JoinEcellRegistration data with pagination
    registrations_list = JoinEcellRegistration.objects.all().order_by('-created_at')
    paginator = Paginator(registrations_list, 20)  # Show 10 registrations per page
    
    page_number = request.GET.get('page')
    registrations = paginator.get_page(page_number)
    
    return render(request, "index.html", {
        "show_login": False,
        "registrations": registrations
    })

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        request.session['authenticated'] = False
        return redirect('/')
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def export_joinecell_csv(request):
    if not request.session.get("authenticated", False):
        return redirect('/')

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="joinecell_registrations.csv"'

    writer = csv.writer(response)
    # Write header
    writer.writerow([
        'Full Name', 'Email', 'Roll Number', 'Course & Branch', 
        'Year of Study', 'Contact Number', 'LinkedIn Profile', 
        'Field of Interest', 'Role Preference', 'Has Experience', 
        'Experience Description', 'Skills', 'Portfolio Links', 
        'Motivation', 'Value Proposition', 'Time Commitment', 
        'Team Work Comfort', 'Has Startup Ideas', 
        'Startup Ideas Description', 'Suggestions', 'Registered On'
    ])

    registrations = JoinEcellRegistration.objects.all().order_by('-created_at')
    for reg in registrations:
        writer.writerow([
            reg.full_name, reg.email, reg.roll_number, reg.course_branch,
            reg.year_of_study, reg.contact_number, reg.linkedin_profile,
            reg.field_of_interest, reg.role_preference, reg.has_experience,
            reg.experience_description, reg.skills, reg.portfolio_links,
            reg.motivation, reg.value_proposition, reg.get_time_commitment_display(),
            reg.team_work_comfort, reg.has_startup_ideas,
            reg.startup_ideas_description, reg.suggestions, reg.created_at
        ])

    return response


@login_required
def event_registration_list(request):
    if not request.user.is_staff:
        return JsonResponse({'error': 'Permission denied'}, status=403)
    
    events = Event.objects.all().order_by('-start_date')
    
    selected_event = None
    registrations = []
    
    event_id = request.POST.get('event_id') or request.GET.get('event_id')
    
    if event_id:
        selected_event = get_object_or_404(Event, id=event_id)
        registrations = Registration.objects.filter(event=selected_event).order_by('-created_at')
        
        data = []
        for reg in registrations:
            row = {
                'email': reg.user.email,
                'team_name': reg.data.get('team_name', ''),
                'contact_no': ' '.join(map(str, reg.data.get('contact_no', []))),
                'course_year': ' '.join(map(str, reg.data.get('course_year', []))),
                'member_names': ' '.join(map(str, reg.data.get('member_names', []))),
                'additional_doc_drivelink': reg.data.get('additional_doc_drivelink', ''),
                'created_at': reg.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            data.append(row)
        
        if 'download_csv' in request.POST:
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{selected_event.name}_registrations.csv"'
            
            df = pd.DataFrame(data)
            df.to_csv(response, index=False)
            return response
        
        paginator = Paginator(data, 20)  # Changed from 1 to 10 for better pagination
        page_number = request.GET.get('page', 1)
        registrations = paginator.get_page(page_number)
    
    return render(request, 'event.html', {
        'events': events,
        'selected_event': selected_event,
        'registrations': registrations,
        'event_id': event_id
    })
