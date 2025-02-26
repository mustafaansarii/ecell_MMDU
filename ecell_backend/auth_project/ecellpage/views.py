from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from django.core.mail import send_mail
from rest_framework import status
from django.core.cache import cache
from django.shortcuts import render

# Create your views here.

class GalleryList(APIView):
    def get(self, request):
        gallery = Gallery.objects.all()
        serializer = GallerySerializer(gallery, many=True)
        return Response(serializer.data)

class ContactSubmissionView(APIView):
    def post(self, request):
        serializer = ContactSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            # Save the submission
            submission = serializer.save()
            
            # Send email
            subject = f"New E-Cell Contact Submission from {submission.name}"
            message = f"""
            New E-Cell contact submission received :
            
            Name: {submission.name}
            Email: {submission.email}
            Message: {submission.message}`
            """
            
            send_mail(
                subject,
                message,
                'mmduecell@gmail.com',  # From email
                ['mustafaa.edu@gmail.com'],  # To email
                fail_silently=False,
            )
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeamList(APIView):
    def get(self, request):
        # Simply return all team data without caching
        team = Team.objects.all()
        serializer = TeamSerializer(team, many=True)
        return Response(serializer.data)

