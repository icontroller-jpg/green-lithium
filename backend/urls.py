from django.contrib import admin
from django.urls import path, include, re_path
from .views import frontend_config, FrontendAppView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/seller/", include("sellers.urls")),
    path("config/", frontend_config),
]

# 👇 React handles everything else
urlpatterns += [
    re_path(r"^.*$", FrontendAppView.as_view()),
]
