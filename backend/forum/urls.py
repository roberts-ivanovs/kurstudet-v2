from django.urls import include, path

from rest_framework.routers import DefaultRouter
from forum.views import QuestionViewSet, AnswerViewSet, TagViewSet

router = DefaultRouter()
router.register(r"question", QuestionViewSet, basename="user")
router.register(r"answer", AnswerViewSet, basename="answer")
router.register(r"tag", TagViewSet, basename="tag")

router.urls

urlpatterns = [
    path("", include(router.urls)),
]
