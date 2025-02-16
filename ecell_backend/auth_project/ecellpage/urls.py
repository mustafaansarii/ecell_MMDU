from django.urls import path
from .views import *

urlpatterns = [
    path('events/', EventList.as_view()),
    path('gallery/', GalleryList.as_view()),
    path('collaborators/', CollaboratorList.as_view()),
    path('initiatives/', InitiativeList.as_view()),
    path('social-media/', SocialMediaList.as_view()),
    path('stats/', StatList.as_view()),
    path('hero-content/', HeroContentDetail.as_view()),
    path('about-us/', AboutUsDetailView.as_view(), name='about-us-detail'),
    path('contact/', ContactSubmissionView.as_view(), name='contact-submission'),
] 