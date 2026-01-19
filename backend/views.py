from django.http import FileResponse
from pathlib import Path
from django.conf import settings


def frontend_app(request):
    index_file = Path(settings.BASE_DIR) / "backend" / "static" / "index.html"
    return FileResponse(open(index_file, "rb"))
