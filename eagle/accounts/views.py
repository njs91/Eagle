from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets


class AccountsViewSet(viewsets.ViewSet):
    # def list(self, request):
    #     queryset = Page.objects.all().order_by("-last_edited")
    #     serializer = PageSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, pk=None):
    #     # use request rather than pk?
    #     page = get_object_or_404(Page, pk=pk)
    #     serializer = PageSerializer(page)
    #     return Response(serializer.data)

    def create(self, request):
        pass
        # req_data = request.data
        # page = Page.objects.create(
        #     title=req_data["title"],
        #     type=req_data["type"],
        #     slug=req_data["slug"],
        #     notes=req_data["notes"],
        # )
        # serializer = PageSerializer(page)
        # return Response(serializer.data)

    # def update(self, request, pk=None):
    #     req_data = request.data
    #     page = get_object_or_404(Page, pk=pk)
    #     page.title = req_data["title"]
    #     page.type = req_data["type"]
    #     page.slug = req_data["slug"]
    #     page.notes = req_data["notes"]
    #     page.save()
    #     serializer = PageSerializer(page)
    #     return Response(serializer.data)

    # def partial_update(self, request, pk=None):
    #     # what's the difference between partial_update & update?
    #     pass

    # def destroy(self, request, pk=None):
    #     # use the request instead of pk? then can presumably fetch http://localhost:8000/api/pages/ rather than http://localhost:8000/api/pages/id?
    #     page = get_object_or_404(Page, id=pk)
    #     page.delete()
    #     return Response(status=204)
