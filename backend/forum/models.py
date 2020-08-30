from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class Question(models.Model):

    title = models.CharField(_("Question title"), max_length=100)
    clarification = models.TextField(_("Clarification"))
    asker_fk = models.ForeignKey(
        "core.User", verbose_name=_("Asker"), on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Question_detail", kwargs={"pk": self.pk})


class Answer(models.Model):

    answer = models.TextField(_("Answer"))
    answerer_fk = models.ForeignKey(
        "core.User", verbose_name=_("Answerer"), on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = _("Answer")
        verbose_name_plural = _("Answers")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Answer_detail", kwargs={"pk": self.pk})


class Tag(models.Model):

    tag = models.CharField(_("Tag"), max_length=20, unique=True)
    tagged_questions = models.ManyToManyField(
        "forum.Question", verbose_name=_("tagged Question")
    )

    class Meta:
        verbose_name = _("Tag")
        verbose_name_plural = _("Tags")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Tag_detail", kwargs={"pk": self.pk})
