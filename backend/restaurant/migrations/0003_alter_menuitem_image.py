# Generated by Django 4.2 on 2023-04-29 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("restaurant", "0002_menuitem_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="menuitem",
            name="image",
            field=models.ImageField(
                blank=True, default="default.jpeg", null=True, upload_to="menu_items/"
            ),
        ),
    ]
