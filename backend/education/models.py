from django.db import models
from django.utils.translation import gettext_lazy as _


class University(models.Model):
    """
    Store a university entry
    """

    name = models.CharField(max_length=100, unique=True)
    abbr = models.CharField(max_length=10, unique=True)
    city = models.CharField(max_length=50)

    def __str__(self):
        return self.abbr


class Programme(models.Model):
    """
    The accumulation of all data that's associated for a given study programme
    """

    class Degrees(models.TextChoices):
        COLLEGE = "CL", _("College")
        BACHELOR = "BA", _("Bachelors")
        MASTER = "MA", _("Masters")
        DOCTOR = "PHD", _("Doctors")

    class LearningTypes(models.TextChoices):
        REAL_LIFE = "IRL", _("Real life: Day, Night")
        DISTANT = "DIS", _("Semi-real life: Weekends, Sessions, E-studies")
        EXTRAMURAL = "EKS", _("Self taught")

    name = models.CharField(max_length=100, null=True, blank=True)
    university = models.ForeignKey(University, on_delete=models.PROTECT)
    degree = models.CharField(max_length=100, choices=Degrees.choices)
    duration_years = models.DecimalField(max_digits=4, decimal_places=2)
    faculty = models.CharField(max_length=100, null=True, blank=True)
    learning_type = models.CharField(max_length=100, choices=LearningTypes.choices)
    full_time = models.BooleanField()
    budget_places = models.IntegerField()
    total_places = models.IntegerField()
    website = models.URLField(max_length=300, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title
