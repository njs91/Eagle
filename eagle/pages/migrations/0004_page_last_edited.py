# Generated by Django 3.2.9 on 2021-12-17 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_auto_20211114_1120'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='last_edited',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
