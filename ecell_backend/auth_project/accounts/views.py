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
