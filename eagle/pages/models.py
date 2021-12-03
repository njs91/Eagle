from django.db import models

PAGE_TYPES = [("landing", "landing"), ("sale", "sale"), ("other", "other")]


class Page(models.Model):
    """A page on the account-holder's site"""

    title = models.CharField(max_length=100, null=True, blank=False)
    type = models.CharField(max_length=100, choices=PAGE_TYPES, null=True, blank=False)
    slug = models.CharField(max_length=200, null=True, blank=True)
    notes = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title


class Keyword(models.Model):
    """A target keyword belonging to a page"""

    name = models.CharField(max_length=100, null=True, blank=False)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, null=True, blank=False)

    def __str__(self):
        return self.name
