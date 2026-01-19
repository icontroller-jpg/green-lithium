# backend/views.py
from django.http import JsonResponse
from django.views.generic import TemplateView


def frontend_config(request):
    return JsonResponse({
        "API_BASE": "https://green-lithium.onrender.com"
    })


class FrontendAppView(TemplateView):
    template_name = "index.html"
