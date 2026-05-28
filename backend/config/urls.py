from django.contrib import admin
from django.urls import include, path
import os
from dotenv import load_dotenv

load_dotenv()

ADMIN_PATH_RETURN_TO_MAIN = os.getenv("ADMIN_RETURN_URL")

urlpatterns = [path("admin/", admin.site.urls), path("api/", include("app.urls"))]

admin.site.site_url = ADMIN_PATH_RETURN_TO_MAIN
