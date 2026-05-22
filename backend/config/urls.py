from django.contrib import admin
from django.urls import include, path

urlpatterns = [path("admin/", admin.site.urls), path("api/", include("app.urls"))]

admin.site.site_url = "http://localhost:5173"
