from django.db import models


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

    DEGREES = [
        ("CL", "College"),
        ("BA", "Bachelors"),
        ("MA", "Masters"),
        ("PHD", "Doctors"),
    ]

    LEARNING_TYPES = [
        ("IRL", "Real life: Day, Night"),
        ("SRL", "Semi-real life: Weekends, Sessions, E-studies"),
        ("EKS", "Self taught: Extramural."),
    ]

    # Core information
    name = models.CharField(max_length=100, null=True, blank=True)
    university = models.ForeignKey(University, on_delete=models.PROTECT)
    degree = models.CharField(max_length=100, choices=DEGREES)
    duration_years = models.DecimalField(max_digits=4, decimal_places=2)
    faculty = models.CharField(max_length=100, null=True, blank=True)

    website = models.URLField(max_length=300, null=True, blank=True)

    description = models.TextField(null=True, blank=True)
    learning_type = models.CharField(max_length=100, choices=LEARNING_TYPES)
    full_time = models.BooleanField()

    def __str__(self):
        return self.title
