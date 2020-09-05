from rest_framework import permissions, viewsets
from forum.serializers import AnswerSerializer, TagSerializer, QuestionSerializer
from forum.models import Answer, Question, Tag


class AnswerViewSet(viewsets.ModelViewSet):
    """
    CRUD `forum.models.Answer` items

    Permissions
    ----------
    - Only authenticated users can do `Create` `Update` `Delete`
    - Anyone can `Read`
    ----------

    Response item
    ----------
    {
        "id": int,
        "answer": str,
        "author_fk": int,
    }

    Method calls
    ----------
    :url - base URL
    :id - primary key for the model
    :obj - a single response item

    GET     ":url"      -> [:obj, :obj, ... ]                   | status 200
    GET     ":url/:id"  -> :obj                                 | status 200
    POST    ":url"      -> :obj (the newly created object)      | status 201
    PUT     ":url/:id"  -> :obj (the newly updated object)      | status 200
    DELETE  ":url"      -> { "message": str }                   | status 204
    DELETE  ":url/:id"  -> { "message": str }                   | status 204
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TagViewSet(viewsets.ModelViewSet):
    """
    CRUD `forum.models.Tag` items

    Permissions
    ----------
    - Only authenticated users can do `Create` `Update` `Delete`
    - Anyone can `Read`
    ----------

    Response item
    ----------
    {
        "id": int,
        "tag": str,
        "tagged_questions": [int, ..],
    }

    Method calls
    ----------
    :url - base URL
    :id - primary key for the model
    :obj - a single response item

    GET     ":url"      -> [:obj, :obj, ... ]                   | status 200
    GET     ":url/:id"  -> :obj                                 | status 200
    POST    ":url"      -> :obj (the newly created object)      | status 201
    PUT     ":url/:id"  -> :obj (the newly updated object)      | status 200
    DELETE  ":url"      -> { "message": str }                   | status 204
    DELETE  ":url/:id"  -> { "message": str }                   | status 204
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class QuestionViewSet(viewsets.ModelViewSet):
    """
    CRUD `forum.models.Question` items

    Permissions
    ----------
    - Only authenticated users can do `Create` `Update` `Delete`
    - Anyone can `Read`
    ----------

    Response item
    ----------
    {
        "id": int,
        "title": str,
        "clarification": str,
        "author_fk": int,
    }

    Method calls
    ----------
    :url - base URL
    :id - primary key for the model
    :obj - a single response item

    GET     ":url"      -> [:obj, :obj, ... ]                   | status 200
    GET     ":url/:id"  -> :obj                                 | status 200
    POST    ":url"      -> :obj (the newly created object)      | status 201
    PUT     ":url/:id"  -> :obj (the newly updated object)      | status 200
    DELETE  ":url"      -> { "message": str }                   | status 204
    DELETE  ":url/:id"  -> { "message": str }                   | status 204
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
