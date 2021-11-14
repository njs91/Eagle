from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import PageSerializer
from .models import Page


class PagesViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Page.objects.all().order_by("-date_created")
        serializer = PageSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Page.objects.all()
        page = get_object_or_404(queryset, pk=pk)
        serializer = PageSerializer(page)
        return Response(serializer.data)

    def create(self, request):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


# https://www.django-rest-framework.org/api-guide/viewsets/

# old way using functions
# from rest_framework.decorators import api_view
# @api_view(["GET"])  # can also pass in others e.g. PUT, POST, etc
# def get_routes(request):
#     routes = [
#         {
#             "Endpoint": "/pages/",
#             "method": "GET",
#             "body": None,
#             "description": "Fetches pages",
#         },
#     ]
#     return Response(routes)


# @api_view(["GET", "POST", "PUT", "DELETE"])
# def pages(request):
#     if request.method == "GET":
#         pages = Page.objects.all().order_by("-date_created")
#         serializer = PageSerializer(
#             pages, many=True
#         )  # many = serialise many objects; return queryset
#         return Response(serializer.data)

#     if request.method == "POST":
#         data = request.data
#         page = Page.objects.create(body=data["body"])
#         serializer = PageSerializer(page, many=False)
#         return Response(serializer.data)


# @api_view(["GET"])
# def get_pages(request):
#     pages = Page.objects.all().order_by("-date_created")
#     serializer = PageSerializer(
#         pages, many=True
#     )  # many = serialise many objects; return queryset
#     return Response(serializer.data)


# @api_view(["GET"])
# def get_page(request, pk):
#     pages = Page.objects.get(id=pk)
#     serializer = PageSerializer(pages, many=False)
#     return Response(serializer.data)


# if request.method == 'GET':
# if request.method == 'POST':
