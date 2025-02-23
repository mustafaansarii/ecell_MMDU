from django.contrib import admin
from django.urls import path, include
from accounts.views import GoogleLogin, GoogleCallback
from events.views import home, logout_view, export_joinecell_csv,event_registration_list

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('auth/', include('social_django.urls', namespace='social')),
    path('api/auth/google/login/', GoogleLogin.as_view(), name='google_login'),
    path('api/auth/google/callback/', GoogleCallback.as_view(), name='google_callback'),
    path('api/ecell/', include('ecellpage.urls')),
    path('api/events/', include('events.urls')),
    path('', home, name='home'),
    path('logout/', logout_view, name='logout'),
    path('export/joinecell/', export_joinecell_csv, name='export_joinecell_csv'),
    path('event-details/', event_registration_list, name='event_registration_list'),
]
