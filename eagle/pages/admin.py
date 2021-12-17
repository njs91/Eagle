from django.contrib import admin
from .models import Page, Keyword


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "type",
        "date_created",
    )
    readonly_fields = (
        "date_created",
        "last_edited",
    )  # shows date_created on individual 'page' pages


@admin.register(Keyword)
class PageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "page",
    )
