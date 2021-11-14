from rest_framework.serializers import ModelSerializer
from .models import Page


class PageSerializer(ModelSerializer):
    class Meta:
        model = Page  # model serialised
        fields = "__all__"  # fields serialised
