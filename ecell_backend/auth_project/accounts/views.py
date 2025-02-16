import random
import os
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
from django.utils import timezone
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from django.conf import settings
from django.urls import reverse
from urllib.parse import urlencode

class SendOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")
        
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        user = CustomUser.objects.filter(email=email).first()
        
        # Check if user exists and is already active
        if user and user.is_active:
            return Response({"error": "User already exists and is verified."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Generate OTP
        otp = str(random.randint(100000, 999999))
        
        if user:
            # Update existing user's OTP
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()
        else:
            # Create temporary user record
            user = CustomUser.objects.create_user(
                email=email,
                full_name="Temporary",  # Will be updated in signup
                password="temporary",  # Will be updated in signup
                is_active=False
            )
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()
        
        if not self.send_otp_email(email, otp):
            return Response({"error": "Failed to send OTP email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response({"message": "OTP sent to email."}, status=status.HTTP_200_OK)

    def send_otp_email(self, email, otp):
        subject = "Verify Your Email"
        message = f"Your OTP for email verification is: {otp}"
        sender_email = os.getenv("EMAIL_HOST_USER")
        try:
            send_mail(
                subject,
                message,
                sender_email,
                [email],
                fail_silently=False,
            )
            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

class SignupView(APIView):
    def post(self, request):
        email = request.data.get("email")
        full_name = request.data.get("full_name")
        password = request.data.get("password")
        otp = request.data.get("otp")

        user = CustomUser.objects.filter(email=email).first()
        
        if not user:
            return Response({"error": "User not found. Please request OTP first."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Verify OTP
        if user.otp != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
        if timezone.now() > user.otp_created_at + timedelta(minutes=5):
            return Response({"error": "OTP has expired."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Update user details
        user.full_name = full_name
        user.set_password(password)
        user.is_active = True
        user.otp = None
        user.otp_created_at = None
        user.save()
        
        return Response({"message": "Signup successful."}, status=status.HTTP_201_CREATED)

class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        user = CustomUser.objects.filter(email=email, otp=otp).first()
        if user:
            # Check if OTP is expired (5 minutes)
            if timezone.now() > user.otp_created_at + timedelta(minutes=5):
                return Response({"error": "OTP has expired."}, status=status.HTTP_400_BAD_REQUEST)
                
            user.is_active = True
            user.otp = None
            user.otp_created_at = None
            user.save()
            return Response({"message": "Email verified successfully."}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid OTP or user not found."}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)
        
        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
        if not user.is_active:
            return Response({"error": "Please verify your email first"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)

class SendOTPForgetPassView(APIView):
    def post(self, request):
        email = request.data.get("email")
        
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        user = CustomUser.objects.filter(email=email).first()
        
        # Check if user exists
        if not user:
            return Response({"error": "User does not exist with this email."}, status=status.HTTP_404_NOT_FOUND)
            
        # Generate OTP
        otp = str(random.randint(100000, 999999))
        
        # Update user's OTP
        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()
        
        if not self.send_otp_email(email, otp):
            return Response({"error": "Failed to send OTP email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response({"message": "OTP sent to email for password reset."}, status=status.HTTP_200_OK)

    def send_otp_email(self, email, otp):
        subject = "Password Reset OTP"
        message = f"Your OTP for password reset is: {otp}"
        sender_email = os.getenv("EMAIL_HOST_USER")
        try:
            send_mail(
                subject,
                message,
                sender_email,
                [email],
                fail_silently=False,
            )
            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

class ForgetPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        new_password = request.data.get("new_password")

        if not all([email, otp, new_password]):
            return Response({"error": "Email, OTP, and new password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.filter(email=email).first()
        
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            
        # Verify OTP
        if user.otp != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
        if timezone.now() > user.otp_created_at + timedelta(minutes=5):
            return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Update password
        user.set_password(new_password)
        user.otp = None
        user.otp_created_at = None
        user.save()
        
        return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)

class GoogleLogin(APIView):
    def get(self, request):
        redirect_uri = os.getenv('LOCAL_GOOGLE_LOGIN_REDIRECT_URI') if settings.IS_LOCAL else os.getenv('LIVE_GOOGLE_LOGIN_REDIRECT_URI')
        return redirect(f'{os.getenv("GOOGLE_AUTH_URL")}?'
                       f'redirect_uri={redirect_uri}&'
                       f'client_id={settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY}&'
                       f'access_type=offline&'
                       f'response_type=code&'
                       f'prompt=consent&'
                       f'scope=email profile')

class GoogleCallback(APIView):
    def get(self, request):
        code = request.GET.get('code')
        if not code:
            return Response({'error': 'Authorization code not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            import requests
            
            # Exchange authorization code for tokens
            token_url = os.getenv("GOOGLE_TOKEN_URL")
            redirect_uri = os.getenv('LOCAL_GOOGLE_LOGIN_REDIRECT_URI') if settings.IS_LOCAL else os.getenv('LIVE_GOOGLE_LOGIN_REDIRECT_URI')
            data = {
                'code': code,
                'client_id': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
                'client_secret': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
                'redirect_uri': redirect_uri,
                'grant_type': 'authorization_code'
            }
            
            token_response = requests.post(token_url, data=data)
            token_response.raise_for_status()
            tokens = token_response.json()
            
            # Get user info using access token
            userinfo_url = os.getenv("GOOGLE_USERINFO_URL")
            headers = {
                'Authorization': f'Bearer {tokens["access_token"]}'
            }
            userinfo_response = requests.get(userinfo_url, headers=headers)
            userinfo_response.raise_for_status()
            user_data = userinfo_response.json()
            
            email = user_data.get('email')
            if not email:
                return Response({'error': 'Email not provided by Google'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if user exists
            user = CustomUser.objects.filter(email=email).first()
            
            if not user:
                # Create new user
                user = CustomUser.objects.create_user(
                    email=email,
                    full_name=user_data.get('name', ''),
                    password=None,  # No password for OAuth users
                    is_active=True,
                    is_oauth=True
                )
            elif not user.is_oauth:
                # Convert existing user to OAuth user
                user.set_unusable_password()
                user.is_oauth = True
                user.save()
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            
            # Create redirect URL with tokens and user data as parameters
            frontend_url = settings.FRONTEND_CALLBACK_URL
            params = {
                'access': access_token,
                'refresh': refresh_token,
                'user_id': user.id,
                'email': user.email,
                'full_name': user.full_name,
                'is_active': str(user.is_active).lower(),
                'is_verified': str(user.is_active).lower()
            }
            redirect_url = f"{frontend_url}?{urlencode(params)}"
            
            return redirect(redirect_url)
            
        except requests.exceptions.HTTPError as e:
            error_response = e.response.json() if e.response else str(e)
            return Response({'error': f'Google authentication failed: {error_response}'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
