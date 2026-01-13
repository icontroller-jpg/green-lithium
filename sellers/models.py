from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from .manager import SellerManager

class Seller(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    company_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = SellerManager()

    def __str__(self):
        return self.email


class Product(models.Model):
    seller = models.ForeignKey(
        "Seller",
        on_delete=models.CASCADE,
        related_name="products"  # important for serializers
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



