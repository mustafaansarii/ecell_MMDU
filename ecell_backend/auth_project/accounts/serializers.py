from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'full_name']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'full_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=False)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data.get('password'))
        
        if not user:
            # Check if user exists but is OAuth user
            user = CustomUser.objects.filter(email=data['email']).first()
            if user and user.is_oauth:
                raise serializers.ValidationError("Please use Google login for this account")
            raise serializers.ValidationError("Invalid credentials")
            
        if not user.is_active:
            raise serializers.ValidationError("Please verify your email first")
            
        return user

