from django.conf import settings
from django.http import JsonResponse

class BlockLocalhostMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host()

        if not settings.DEBUG:
            if "127.0.0.1" in host or "localhost" in host:
                return JsonResponse(
                    {"detail": "Localhost access is disabled in production"},
                    status=403,
                )

        return self.get_response(request)
