from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_event_data, name='submit_event_data'),
    path('create/', views.create_event, name='create_event'),
    path('register/', views.register_for_event, name='register_for_event'),
    path('all/', views.EventListView.as_view(), name='event_list'),
    path('join-ecell/', views.JoinEcellRegistrationView.as_view(), name='join_ecell_registration'),
    path('logout/', views.logout_view, name='logout'),
    path('export/joinecell/', views.export_joinecell_csv, name='export_joinecell_csv'),
    path('', views.home, name='home'),
    path('event-details/', views.event_registration_list, name='event_registration_list'),
] 