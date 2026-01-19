from django.contrib import admin
from django.urls import path, include
from .views import frontend_app
from .views import health

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/seller/", include("sellers.urls")),

]

# 👇 React handles everything else
urlpatterns += [
    path("", frontend_app),
    path("api/health/", health),
]
