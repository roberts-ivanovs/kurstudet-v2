from django.db import models

from django.utils.translation import gettext_lazy as _


class CollectedEmails(models.Model):
    """
    These are the collected emails that people have left to which we can
    send email notifications
    """

    email = models.EmailField(_("e-mail"), max_length=254, unique=True)
