from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from django.core.mail import send_mail
from rest_framework import status

# Create your views here.

class EventList(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

class GalleryList(APIView):
    def get(self, request):
        gallery = Gallery.objects.all()
        serializer = GallerySerializer(gallery, many=True)
        return Response(serializer.data)

class CollaboratorList(APIView):
    def get(self, request):
        collaborators = Collaborator.objects.all()
        serializer = CollaboratorSerializer(collaborators, many=True)
        return Response(serializer.data)

class InitiativeList(APIView):
    def get(self, request):
        initiatives = Initiative.objects.all()
        serializer = InitiativeSerializer(initiatives, many=True)
        return Response(serializer.data)

class SocialMediaList(APIView):
    def get(self, request):
        social_media = SocialMedia.objects.all()
        serializer = SocialMediaSerializer(social_media, many=True)
        return Response(serializer.data)


    

class StatList(APIView):
    def get(self, request):
        stats = Stat.objects.all()
        serializer = StatSerializer(stats, many=True)
        return Response(serializer.data)

class HeroContentDetail(APIView):
    def get(self, request):
        try:
            hero_content = HeroContent.objects.latest('created_at')
            serializer = HeroContentSerializer(hero_content)
            return Response(serializer.data)
        except HeroContent.DoesNotExist:
            return Response({'detail': 'Hero content not found'}, status=404)

class AboutUsDetailView(generics.RetrieveAPIView):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer
    
    def get_object(self):
        # Return the first AboutUs instance
        return AboutUs.objects.first()

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
            Message: {submission.message}
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
