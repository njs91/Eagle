from django.contrib import admin
from django.urls import path, include
from accounts.urls import router as account_urls
from pages.urls import router as page_urls
from rest_framework import routers

router = routers.DefaultRouter()
router.registry.extend(account_urls.registry)
router.registry.extend(page_urls.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include((router.urls, "api"), namespace="api")),
]
