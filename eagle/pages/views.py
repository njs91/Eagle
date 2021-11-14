from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PageSerializer
from .models import Page


@api_view(["GET"])  # can also pass in others e.g. PUT, POST, etc
def get_routes(request):
    routes = [
        {"Endpoint": "/test/", "method": "GET", "body": None, "description": "Test"},
    ]
    return Response(routes)


@api_view(["GET"])
def get_pages(request):
    pages = Page.objects.all()
    serializer = PageSerializer(
        pages, many=True
    )  # many = serialise many objects; return queryset
    return Response(serializer.data)
