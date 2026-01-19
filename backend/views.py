from django.http import FileResponse
from pathlib import Path
from django.conf import settings
from django.http import JsonResponse

def health(request):
    return JsonResponse({
        "status": "ok",
        "env": "production",
    })

def frontend_app(request):
    index_file = Path(settings.BASE_DIR) / "backend" / "static" / "index.html"
    return FileResponse(open(index_file, "rb"))
