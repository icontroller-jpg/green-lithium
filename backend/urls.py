from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path("", lambda r: redirect("/admin/")),
    path("admin/", admin.site.urls),   # ✅ REQUIRED
    path("api/seller/", include("sellers.urls")),

]
