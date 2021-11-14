from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"pages", views.PagesViewSet, basename="page")
urlpatterns = router.urls

# urlpatterns = [
#     path("", views.get_routes, name="routes"),
#     path("pages", views.pages, name="pages"),
#     # path("page/<pk>", views.get_page, name="get_page"),
# ]
