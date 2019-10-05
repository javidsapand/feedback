
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
    created = graphene.Boolean(default_value = False)
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

        if action.upper() == 'CREATE':q
            model = Group.objects.create(**kwargs)
            return GroupCrud(model=model ,created=True)

        if action.upper() == 'UPDATE':
            Group.objects.filter(id = id_to_int(id)).update(**kwargs)
            model = get_object_by_id(GroupCrud , id)
            return GroupCrud(model=model , updated = True)

        if action.upper() == 'DELETE':
            Group.objects.filter(id=id_to_int(id)).delete()
            return GroupCrud(deleted=True)


class AssignGroup(relay.ClientIDMutation):
    class Input:
        user_id = graphene.ID(required=True)
        group_id = graphene.ID(required=True)

    group = graphene.Field(GroupT)
    user = graphene.Field(UserT)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        kwargs.pop('client_mutation_id')
        user_id = kwargs.get('user_id')
        group_id = kwargs.get('group_id')
        group = get_object_by_id(Group , id = group_id)
        user = get_object_by_id(User , id = user_id)
        user.groups.add(group)
        return AssignGroup(group=group , user=user)



class Singup(relay.ClientIDMutation):
    class Input:
        is_staff = graphene.Boolean()
        is_superuser = graphene.Boolean()
        email = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
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
        print(kwargs)
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
        print(kwargs)
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

    group_crud = GroupCrud.Field()
    user_crud = UserCrud.Field()
    signup = Singup.Field()
    assign_group = AssignGroup.Field()