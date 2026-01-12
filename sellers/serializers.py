from rest_framework import serializers
from .models import Seller, Product
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

class SellerSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    company_name = serializers.CharField(
        required=False,
        allow_blank=True
    )

    class Meta:
        model = Seller
        fields = ("email", "password", "company_name")  # ✅ include all declared fields

    def create(self, validated_data):
        seller = Seller(
            email=validated_data["email"],
            company_name=validated_data.get("company_name", "")
        )
        seller.set_password(validated_data["password"])
        seller.save()
        return seller


class SellerLoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        identifier = attrs.get("email_or_username")
        password = attrs.get("password")

        if not identifier or not password:
            raise serializers.ValidationError("Email/Username and password are required.")

        # Determine if it's email or something else
        if "@" in identifier:
            # assume email login
            user = authenticate(username=identifier, password=password)
        else:
            # optionally, login by company_name
            try:
                user_obj = Seller.objects.get(company_name=identifier)
                user = authenticate(username=user_obj.email, password=password)
            except Seller.DoesNotExist:
                raise serializers.ValidationError("Invalid email/username or password.")

        if not user:
            raise serializers.ValidationError("Invalid email/username or password.")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        attrs["user"] = user
        return attrs

class SellerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ["id", "company_name", "email"]  # only public info

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "image")

class SellerProfileSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)  # related_name="products"

    class Meta:
        model = Seller
        fields = ("id", "company_name", "products")