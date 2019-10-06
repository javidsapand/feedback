
from graphene_django_subscriptions.subscription import Subscription
import graphene
import graphql_jwt
import uuid
import base64
from .utils import get_object_by_id , id_to_int
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField


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


class LinkInternalCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)


    model = graphene.Field(LinkInternalT)
    created = graphene.Boolean(default_value = False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)


    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        if action.upper() == 'CREATE':
            model = LinkInternal.objects.create(**kwargs)
            return LinkInternalCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            LinkInternal.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(LinkInternal , id)
            return LinkInternalCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            LinkInternal.objects.filter(id=id_to_int(id)).delete()
            return LinkInternalCrud(deleted=True)



class UserCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        action = graphene.String(required=True)
        first_name = graphene.String(required=False)
        password = graphene.String(required=False)
        last_name = graphene.String(required=False)
        email = graphene.String(required=False)
        about = graphene.String(required=False)
        address = graphene.String(required=False)
        phone_work = graphene.String(required=False)
        phone_home = graphene.String(required=False)
        avatar_id = graphene.ID(required = True)
        department_id = graphene.ID(required = True)
        groups_add = graphene.List(graphene.ID , required=False )
        groups_remove = graphene.List(graphene.ID , required=False )


    model = graphene.Field(UserT)
    created = graphene.Boolean(default_value=False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)


    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        groups_add = kwargs.pop('groups_add' , [])
        groups_remove = kwargs.pop('groups_remove' , [])

        GroupThrough = User.groups.through

        if action.upper() == 'CREATE':
            model = User.objects.create(**kwargs)

            for group in groups_add:
                GroupThrough.objects.create(
                    user_id = model.id,
                    group_id = group
                    )

            if 'password' in kwargs:
                model.set_password(model.password)

            return UserCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            User.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(User , id)

            if 'password' in kwargs:
                model.set_password(model.password)

            for group in groups_add:
                GroupThrough.objects.create(
                    user_id = model.id,
                    group_id = group
                    )

            if 'groups_remove' in kwargs:
                GroupThrough.objects.filter(group__id__in=groups_remove).delete()

            return UserCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            User.objects.filter(id=id_to_int(id)).delete()
            return UserCrud(deleted=True)


class GroupCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        name = graphene.String(required=True)
        action = graphene.String(required = True)


    model = graphene.Field(GroupT)
    created = graphene.Boolean(default_value = False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)


    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        if action.upper() == 'CREATE':
            model = Group.objects.create(**kwargs)
            return GroupCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            Group.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(Group , id)
            return GroupCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            Group.objects.filter(id=id_to_int(id)).delete()
            return GroupCrud(deleted=True)



class CourseCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        name = graphene.String(required = True)
        description = graphene.String(required = False)

        teachers_add = graphene.List(graphene.ID , required=False )
        teachers_remove = graphene.List(graphene.ID , required=False )

        students_add = graphene.List(graphene.ID , required=False )
        students_remove = graphene.List(graphene.ID , required=False )

        semester_id = graphene.ID(required = True)
        
        action = graphene.String(required = True)


    model = graphene.Field(CourseT)
    created = graphene.Boolean(default_value = False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)



    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        teachers_add = kwargs.pop('teachers_add' , [])
        teachers_remove = kwargs.pop('teachers_remove' , [])

        students_add = kwargs.pop('students_add' , [])
        students_remove = kwargs.pop('students_remove' , [])



        StudenThrough = Course.students.through
        TeacherThrough = Course.teachers.through

        if action.upper() == 'CREATE':
            model = Course.objects.create(**kwargs)

            for teacher in teachers_add:
                TeacherThrough.objects.create(
                    course_id = model.id,
                    user_id = teacher
                    )

            for student in students_add:
                StudenThrough.objects.create(
                    course_id = model.id,
                    user_id = student
                    )

            return CourseCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':

            for teacher in teachers_add:
                TeacherThrough.objects.create(
                    course_id = model.id,
                    user_id = teacher
                    )

            for student in students_add:
                StudenThrough.objects.create(
                    course_id = model.id,
                    user_id = student
                    )

            TeacherThrough.objects.filter(user__id__in=teachers_remove).delete()
            StudenThrough.objects.filter(user__id__in=students_remove).delete()
            
            Course.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(Course , id)
            return CourseCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            Course.objects.filter(id=id_to_int(id)).delete()
            return CourseCrud(deleted=True)



class SemesterCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        level = graphene.Int(required = True)

    model = graphene.Field(SemesterT)
    created = graphene.Boolean(default_value = False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)


    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        if action.upper() == 'CREATE':
            model = Semester.objects.create(**kwargs)
            return SemesterCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            Semester.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(Semester , id)
            return SemesterCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            Semester.objects.filter(id=id_to_int(id)).delete()
            return SemesterCrud(deleted=True)



class DepartmentCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        action = graphene.String(required=True)

        name = graphene.String(required=True)
        description = graphene.String(required=False)

        courses_add = graphene.List(graphene.ID , required=False )
        courses_remove = graphene.List(graphene.ID , required=False )


    model = graphene.Field(DepartmentT)
    created = graphene.Boolean(default_value=False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)


    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        courses_add = kwargs.pop('courses_add' , [])
        courses_remove = kwargs.pop('courses_remove' , [])

        CourseThrough = Department.courses.through

        if action.upper() == 'CREATE':
            model = Department.objects.create(**kwargs)

            for course in courses_add:
                CourseThrough.objects.create(
                    department_id = model.id,
                    course_id = course
                    )

            return DepartmentCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            Department.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(Department , id)

            for course in courses_add:
                CourseThrough.objects.create(
                    department_id = model.id,
                    course_id = course
                    )

            
            CourseThrough.objects.filter(course__id__in=courses_remove).delete()

            return DepartmentCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            Department.objects.filter(id=id_to_int(id)).delete()
            return DepartmentCrud(deleted=True)


class AnswerCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        question_id = graphene.ID(required = True)
        description = graphene.String(required = True)
        action = graphene.String(required = True)


    model = graphene.Field(AnswerT)
    created = graphene.Boolean(default_value = False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)



    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        Through = Question.answers.through

        if action.upper() == 'CREATE':
            model = Answer.objects.create(user_id = 1 , description=kwargs['description'] )
            Through.objects.create(answer_id = model.id , question_id=kwargs['question_id'] )
            return AnswerCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            kwargs.pop('question_id')
            Answer.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(Answer , id)
            return AnswerCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            Answer.objects.filter(id=id_to_int(id)).delete()
            return AnswerCrud(deleted=True)


class QuestionCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        action = graphene.String(required = True)

        user_id = graphene.ID(required = False)


    model = graphene.Field(QuestionT)
    created = graphene.Boolean(default_value = False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)


    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        if action.upper() == 'CREATE':
            model = Question.objects.create(**kwargs)
            return QuestionCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            Question.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(Question , id)
            return QuestionCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            Question.objects.filter(id=id_to_int(id)).delete()
            return QuestionCrud(deleted=True)


class SurveyResponseCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        survey_id = graphene.ID(required = True)
        description = graphene.String(required = True)
        action = graphene.String(required = True)


    model = graphene.Field(SurveyResponseT)
    created = graphene.Boolean(default_value = False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)



    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        Through = Survey.responses.through

        if action.upper() == 'CREATE':
            model = SurveyResponse.objects.create(**kwargs)
            Through.objects.create(survey_response_id = model.id , survey_id=kwargs['survey_id'] )
            return SurveyResponseCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            kwargs.pop('survey_id')
            SurveyResponse.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(SurveyResponse , id)
            return SurveyResponseCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            SurveyResponse.objects.filter(id=id_to_int(id)).delete()
            return SurveyResponseCrud(deleted=True)



class SurveyCrud(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required = False)
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        action = graphene.String(required = True)
        user_id = graphene.ID(required = False)


    model = graphene.Field(SurveyT)
    created = graphene.Boolean(default_value = False)
    updated = graphene.Boolean(default_value=False)
    deleted = graphene.Boolean(default_value=False)


    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        action = kwargs.pop('action')
        id = kwargs.pop('id' , None)

        if action.upper() == 'CREATE':
            model = Survey.objects.create(**kwargs)
            return SurveyCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            Survey.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(Survey , id)
            return SurveyCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            Survey.objects.filter(id=id_to_int(id)).delete()
            return SurveyCrud(deleted=True)


class Singup(relay.ClientIDMutation):
    class Input:
        email = graphene.String()
        password = graphene.String()

    user = graphene.Field(UserT)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        print(kwargs)
        kwargs.pop('client_mutation_id', None)
        user = User.objects.create(**kwargs)
        user.set_password(kwargs['password'])
        user.save()
        return Singup(user=user)


class RenewPassword(relay.ClientIDMutation):
    class Input:
        password = graphene.String()
        secret = graphene.String()

    user = graphene.Field(UserT)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id', None)
        user = User.objects.get(secret=kwargs['secret'])
        user.set_password(kwargs['password'])
        user.save()
        return RenewPassword(user=user)


class ForgetPassword(relay.ClientIDMutation):
    class Input:
        email = graphene.String()

    user = graphene.Field(UserT)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id', None)
        user = User.objects.get(email=kwargs['email'])
        user.secret = uuid.uuid4()
        user.save()
        return ForgetPassword(user=user)



class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

    renew_password = RenewPassword.Field()
    forget_password = ForgetPassword.Field()
    signup = Singup.Field()

    file_crud = LinkInternalCrud.Field()
    user_crud = UserCrud.Field()
    group_crud = GroupCrud.Field()
    course_crud = CourseCrud.Field()
    department_crud = DepartmentCrud.Field()
    semester_crud = SemesterCrud.Field()
    answer_crud = AnswerCrud.Field()
    question_crud = QuestionCrud.Field()
    survey_response_crud = SurveyResponseCrud.Field()
    survey_crud = SurveyCrud.Field()