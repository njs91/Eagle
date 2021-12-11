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
        page = get_object_or_404(Page, pk=pk)
        serializer = PageSerializer(page)
        return Response(serializer.data)

    def create(self, request):
        # print(" *** TEST ***", request.POST["title"]) # fails with keyerror: 'title' MultiValueDictKeyError(key) django.utils.datastructures.MultiValueDictKeyError: 'title'
        # print(" *** TEST ***", request["title"]) # fails with TypeError: 'Request' object is not subscriptable
        # print("*** test ***: ", request.POST.get("title", "eh")) # fails as print eh
        # print("*** test ***: ", request.POST.get("title")) # fails as it just returns None
        # print("*** test 2 ***: ", request.get("title")) # fails with AttributeError: 'WSGIRequest' object has no attribute 'get'

        print(
            " *** TEST 1 self.request.query_params.get('title', None)",
            self.request.query_params.get("title", None),
        )
        print(
            " *** TEST 2 self.request.query_params", self.request.query_params
        )  # prints empty QueryDict: <QueryDict: {}>
        print("test 3: print(request.data['title'])", request.data["title"])

        # page = Page.objects.create(
        #     title="testing", type="other", slug="test-slug", notes="test notes"
        # )
        page = Page.objects.create(
            title=request.data["title"],
            type=request.data["type"],
            slug=request.data["slug"],
            notes=request.data["notes"],
        )
        serializer = PageSerializer(page)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        # use the request instead of pk? then can presumably fetch http://localhost:8000/api/pages/ rather than http://localhost:8000/api/pages/id?
        obj = get_object_or_404(Page, id=pk)
        obj.delete()
        return Response(status=204)


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
