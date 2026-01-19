from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    SellerLoginSerializer,
    SellerSignupSerializer,
    SellerListSerializer,
    SellerProfileSerializer,
    ProductSerializer
)
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import Seller, Product
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.generic import TemplateView

class FrontendAppView(TemplateView):
    template_name = "index.html"


def frontend_config(request):
    return JsonResponse({
        "API_BASE": "https://green-lithium.onrender.com"
    })

@api_view(["POST"])
@permission_classes([AllowAny])
def seller_signup(request):
    serializer = SellerSignupSerializer(data=request.data)
    if not serializer.is_valid():
        print("SIGNUP ERRORS:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(
        {"message": "Seller account created successfully"},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def seller_login(request):
    serializer = SellerLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data["user"]

    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    return Response({
        "message": "Login successful",
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user_id": user.id,
        "email": user.email
    }, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def seller_list(request):
    sellers = Seller.objects.all()
    serializer = SellerListSerializer(sellers, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def seller_profile(request, seller_id):
    try:
        seller = Seller.objects.get(id=seller_id)
    except Seller.DoesNotExist:
        return Response({"detail": "Seller not found"}, status=404)
    except Exception as e:
        # Show the actual error for debugging
        return Response({"detail": str(e)}, status=500)

    serializer = SellerProfileSerializer(seller)
    return Response(serializer.data)  # ✅ only one return


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def seller_products(request, seller_id):
    try:
        seller = Seller.objects.get(id=seller_id)
    except Seller.DoesNotExist:
        return Response({"detail": "Seller not found"}, status=404)

    # GET all products
    if request.method == "GET":
        products = Product.objects.filter(seller=seller)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # POST add new product
    if request.method == "POST":
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(seller=seller)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_product(request, seller_id):
    try:
        seller = Seller.objects.get(id=seller_id)
    except Seller.DoesNotExist:
        return Response({"detail": "Seller not found"}, status=404)

    # Use request.data and request.FILES for image
    serializer = ProductSerializer(
        data=request.data,
        context={"request": request}
    )

    if serializer.is_valid():
        serializer.save(seller=seller)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)