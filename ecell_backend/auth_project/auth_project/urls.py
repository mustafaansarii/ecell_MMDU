from django.contrib import admin
from django.urls import path, include
from accounts.views import GoogleLogin, GoogleCallback

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('auth/', include('social_django.urls', namespace='social')),
    path('api/auth/google/login/', GoogleLogin.as_view(), name='google_login'),
    path('api/auth/google/callback/', GoogleCallback.as_view(), name='google_callback'),
    path('api/ecell/', include('ecellpage.urls')),
]
