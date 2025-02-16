from django.urls import path
from .views import (
    SendOTPView, SignupView, LoginView, 
    SendOTPForgetPassView, ForgetPasswordView,
    GoogleLogin, GoogleCallback
)

urlpatterns = [
    path('send-otp/', SendOTPView.as_view(), name='send_otp'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('send-otp-forgetpass/', SendOTPForgetPassView.as_view(), name='send_otp_forgetpass'),
    path('forget-password/', ForgetPasswordView.as_view(), name='forget_password'),
    path('forget-password', ForgetPasswordView.as_view(), name='forget_password_no_slash'),
    path('google/login/', GoogleLogin.as_view(), name='google_login'),
    path('google/callback/', GoogleCallback.as_view(), name='google_callback'),
]

