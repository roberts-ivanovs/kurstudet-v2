from django.db import models
from django.utils.translation import gettext_lazy as _


class Institution(models.Model):
    """
    Store an institution entry
    """

    name = models.CharField(
        help_text=_(
            "The full name of the given institution e.g - `Ventspils Augstskola`"
        ),
        max_length=100,
        unique=True,
    )
    abbr = models.CharField(
        verbose_name=_("Abbreviation"),
        help_text=_(
            "A short, concise way of how the institution wants it's name "
            "represented e.g - `VeA`, `LU`, `RTU`"
        ),
        max_length=10,
        unique=True,
    )
    location = models.CharField(
        verbose_name=_("Location"),
        help_text=_(
            "The exact country, city, address of where the main building for "
            "the given institution is located at"
        ),
        max_length=50,
    )

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
        """
        Learnign types defines the way how the given material is taught.
        It can be split into three distinct groups: real-life, mostly distant
        with occasional real life interaction and full on self-taught by the
        students with no interaction with the teacher what so ever.
        """
        REAL_LIFE = "IRL", _("Real life: Day, Night")
        DISTANT = "DIS", _("Semi-real life: Weekends, Sessions, E-studies")
        EXTRAMURAL = "EKS", _("Self taught")

    name = models.CharField(max_length=100, null=True, blank=True)
    institution = models.ForeignKey(Institution, on_delete=models.PROTECT)
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
