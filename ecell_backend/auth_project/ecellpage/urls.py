from django.urls import path
from .views import *

urlpatterns = [
    path('gallery/', GalleryList.as_view()),
    path('contact/', ContactSubmissionView.as_view(), name='contact-submission'),
] 