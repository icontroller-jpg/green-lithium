from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include

def home(request):
    return JsonResponse({
        "status": "ok",
        "service": "green-lithium backend"
    })

urlpatterns = [
    path("", home),              # 👈 add this
    path("admin/", admin.site.urls),
    path("api/seller/", include("sellers.urls")),
]
