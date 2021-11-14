from django.db import models


class Page(models.Model):
    notes = models.TextField(null=True, blank=True)
