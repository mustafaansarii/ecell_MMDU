from django.urls import path
from .views import SendOTPView, SignupView, LoginView, SendOTPForgetPassView, ForgetPasswordView

urlpatterns = [
    path('send-otp/', SendOTPView.as_view(), name='send_otp'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('send-otp-forgetpass/', SendOTPForgetPassView.as_view(), name='send_otp_forgetpass'),
    path('forget-password/', ForgetPasswordView.as_view(), name='forget_password'),
    path('forget-password', ForgetPasswordView.as_view(), name='forget_password_no_slash'),
]

