from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_routes, name="routes"),
    path("pages", views.get_pages, name="get_pages"),
]
