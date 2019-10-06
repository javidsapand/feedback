import graphene
from graphene_django import DjangoObjectType

from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

from .models import Notification
from .models import User
from .models import LinkInternal
from .models import Activity
from .models import Course
from .models import Semester
from .models import Department
from .models import Answer
from .models import Question
from .models import SurveyResponse
from .models import Survey



class PermissionT(DjangoObjectType):
    class Meta:
        model = Permission
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Permission.objects.get(id=id)



class ContentTypeT(DjangoObjectType):
    class Meta:
        model = ContentType
        filter_fields = '__all__'
        interfaces = (graphene.Node, )


    @classmethod
    def get_node(cls, info, id):
        return ContentType.objects.get(id=id)



class GroupT(DjangoObjectType):
    class Meta:
        model = Group
        filter_fields = '__all__'
        interfaces = (graphene.Node, )


    @classmethod
    def get_node(cls, info, id):
        return Group.objects.get(id=id)


class UserT(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = '__all__'
        interfaces = (graphene.Node, )


    @classmethod
    def get_node(cls, info, id):
        return User.objects.get(id=id)


class NotificationT(DjangoObjectType):
    class Meta:
        model = Notification
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Notification.objects.get(id=id)


class LinkInternalT(DjangoObjectType):
    class Meta:
        model = LinkInternal
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return LinkInternal.objects.get(id=id)


class ActivityT(DjangoObjectType):
    class Meta:
        model = Activity
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Activity.objects.get(id=id)


class CourseT(DjangoObjectType):
    class Meta:
        model = Course
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Course.objects.get(id=id)

class SemesterT(DjangoObjectType):
    class Meta:
        model = Semester
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Semester.objects.get(id=id)

class DepartmentT(DjangoObjectType):
    class Meta:
        model = Department
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Department.objects.get(id=id)

class AnswerT(DjangoObjectType):
    class Meta:
        model = Answer
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Answer.objects.get(id=id)

class QuestionT(DjangoObjectType):
    class Meta:
        model = Question
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Question.objects.get(id=id)


class SurveyResponseT(DjangoObjectType):
    class Meta:
        model = SurveyResponse
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return SurveyResponse.objects.get(id=id)


class SurveyT(DjangoObjectType):
    class Meta:
        model = Survey
        filter_fields = '__all__'
        interfaces = (graphene.Node, )

    @classmethod
    def get_node(cls, info, id):
        return Survey.objects.get(id=id)

