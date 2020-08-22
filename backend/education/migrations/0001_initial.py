# Generated by Django 3.0.9 on 2020-08-22 08:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Institution",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        help_text="The full name of the given institution e.g - `Ventspils Augstskola`",
                        max_length=100,
                        unique=True,
                    ),
                ),
                (
                    "abbr",
                    models.CharField(
                        help_text="A short, concise way of how the institution wants it's name represented e.g - `VeA`, `LU`, `RTU`",
                        max_length=10,
                        unique=True,
                        verbose_name="Abbreviation",
                    ),
                ),
                (
                    "location",
                    models.CharField(
                        help_text="The exact country, city, address of where the main building for the given institution is located at",
                        max_length=50,
                        verbose_name="Location",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Programme",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "degree",
                    models.CharField(
                        choices=[
                            ("CL", "College"),
                            ("BA", "Bachelors"),
                            ("MA", "Masters"),
                            ("PHD", "Doctors"),
                        ],
                        max_length=100,
                    ),
                ),
                ("duration_years", models.DecimalField(decimal_places=2, max_digits=4)),
                ("faculty", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "learning_type",
                    models.CharField(
                        choices=[
                            ("IRL", "Real life: Day, Night"),
                            ("DIS", "Semi-real life: Weekends, Sessions, E-studies"),
                            ("EKS", "Self taught"),
                        ],
                        max_length=100,
                    ),
                ),
                ("full_time", models.BooleanField()),
                ("budget_places", models.IntegerField()),
                ("total_places", models.IntegerField()),
                ("website", models.URLField(blank=True, max_length=300, null=True)),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "institution",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="education.Institution",
                    ),
                ),
            ],
        ),
    ]
