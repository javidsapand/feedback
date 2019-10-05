import graphene
from graphene_django import DjangoConnectionField
from graphene_django.filter import DjangoFilterConnectionField

from .types import GroupT
from .types import ContentTypeT
from .types import PermissionT
from .types import NotificationT
from .types import UserT
from .types import LinkInternalT
from .types import ActivityT
from .types import CourseT
from .types import SemesterT
from .types import DepartmentT
from .types import AnswerT
from .types import QuestionT
from .types import SurveyResponseT
from .types import SurveyT


class Query(graphene.ObjectType):
    groups = DjangoFilterConnectionField(GroupT)
    content_types = DjangoFilterConnectionField(ContentTypeT)
    permissions = DjangoFilterConnectionField(PermissionT)
    notifications = DjangoFilterConnectionField(NotificationT)
    users = DjangoFilterConnectionField(UserT)
    links = DjangoConnectionField(LinkInternalT)
    activitys = DjangoFilterConnectionField(ActivityT)
    courses = DjangoFilterConnectionField(CourseT)
    semesters = DjangoFilterConnectionField(SemesterT)
    departments = DjangoFilterConnectionField(DepartmentT)
    answers = DjangoFilterConnectionField(AnswerT)
    questions = DjangoFilterConnectionField(QuestionT)
    survey_responses = DjangoFilterConnectionField(SurveyResponseT)
    surveys = DjangoFilterConnectionField(SurveyT)


    group = DjangoFilterConnectionField(GroupT)
    content_type = DjangoFilterConnectionField(ContentTypeT)
    permission = DjangoFilterConnectionField(PermissionT)
    notification = DjangoFilterConnectionField(NotificationT)
    user = graphene.relay.Node.Field(UserT)
    link = graphene.relay.Node.Field(LinkInternalT)
    activity = graphene.relay.Node.Field(ActivityT)
    course = graphene.relay.Node.Field(CourseT)
    semester = graphene.relay.Node.Field(SemesterT)
    department = graphene.relay.Node.Field(DepartmentT)
    answer = graphene.relay.Node.Field(AnswerT)
    question = graphene.relay.Node.Field(QuestionT)
    survey_response = graphene.relay.Node.Field(SurveyResponseT)
    survey = graphene.relay.Node.Field(SurveyT)