import uuid
from django.db import models
from django.db.models.aggregates import Sum, Avg
from django.utils import six, timezone, datetime_safe
from django.http import HttpRequest
from django.utils.text import Truncator
from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin


from model_utils import Choices
from jsonfield.fields import JSONField

from .middleware import RequestMiddleware

from .managers import UserManager
from .querysets import BaseQuerySet , NotificationQuerySet


class Model(models.Model):
    id = models.AutoField(primary_key=True, serialize=True)
    timestamp = models.DateTimeField(default=timezone.now)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE, related_name='+', blank=True, null=True)
    updator = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE, related_name='+', blank=True, null=True)
    objects = BaseQuerySet().as_manager()

    def save(self, *args, **kwargs):
        self.timestamp = timezone.now()
        return super().save(*args, **kwargs)

    class Meta:
        abstract = True



class Notification(models.Model):
    LEVELS = Choices('success', 'info', 'warning', 'error' , 'message' , 'admin')
    level = models.CharField(choices=LEVELS, default=LEVELS.info, max_length=20)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE , blank=False, related_name='notifications')
    unread = models.BooleanField(default=True, blank=False)
    verb = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    actor_content_type = models.ForeignKey(ContentType,on_delete=models.CASCADE, related_name='notify_actor')
    actor_object_id = models.CharField(max_length=255)
    actor = GenericForeignKey('actor_content_type', 'actor_object_id')



    target_content_type = models.ForeignKey(ContentType,on_delete=models.CASCADE, related_name='notify_target', blank=True, null=True)
    target_object_id = models.CharField(max_length=255, blank=True, null=True)
    target = GenericForeignKey('target_content_type', 'target_object_id')

    action_object_content_type = models.ForeignKey(ContentType,on_delete=models.CASCADE, blank=True, null=True,related_name='notify_action_object')
    action_object_object_id = models.CharField(max_length=255, blank=True, null=True)
    action_object = GenericForeignKey('action_object_content_type', 'action_object_object_id')

    timestamp = models.DateTimeField(default=timezone.now)
    public = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)
    emailed = models.BooleanField(default=False)
    data = JSONField(blank=True, null=True)
    objects = NotificationQuerySet.as_manager()

    class Meta:
        ordering = ('-timestamp', )
        app_label = 'notifications'



class LinkInternal(Model):
    activity = GenericRelation('Activity', related_query_name='linkinternal')
    src = models.FileField(upload_to='linked/', default='empty.doc')

    def __str__(self):
        return self.src.name

    def __repr__(self):
        return self.src.name



class User(AbstractBaseUser, PermissionsMixin):
    BOOL = ((True, 'YES'), (False, 'NO'))
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)

    secret = models.TextField(blank=True)
    about = models.TextField(blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    phone_work = models.CharField(max_length=50, null=True, blank=True)
    phone_home = models.CharField(max_length=50, null=True, blank=True)


    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True, choices=BOOL)
    is_staff = models.BooleanField( default=False, choices=BOOL)
    is_superuser = models.BooleanField(default=False, choices=BOOL)


    avatar = models.ForeignKey('LinkInternal', on_delete=models.CASCADE, blank=True, null=True)
    department = models.ForeignKey('Department', on_delete=models.CASCADE, blank=True, null=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')


class Activity(models.Model):
    action = models.CharField(max_length=150, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    content = GenericForeignKey('content_type', 'object_id')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'Activity: {self.user.first_name} {self.user.last_name} {self.action} {self.content_type.name}:{self.object_id}'

    def __repr__(self):
        return f'Activity: {self.user.first_name} {self.user.last_name} {self.action} {self.content_type.name}:{self.object_id}'

    class Meta:
        verbose_name = _('Activity')
        verbose_name_plural = _('Activities')


class Course(Model):
    activity = GenericRelation('Activity', related_query_name='course')
    name = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(blank=True , null=True)
    teachers = models.ManyToManyField(settings.AUTH_USER_MODEL , blank=True , related_name='teachers')
    students = models.ManyToManyField(settings.AUTH_USER_MODEL , blank=True, related_name='students')
    semester = models.ForeignKey('Semester',models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.name)

    def __repr__(self):
        return str(self.name)

    class Meta:
        verbose_name = _('Course')
        verbose_name_plural = _('Courses')


class Semester(Model):
    SM_NAME = {
        1:'One',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Sex',
        7: 'Seven',
        8: 'Eight',
    }

    activity = GenericRelation('Activity', related_query_name='semester')
    level = models.IntegerField(default=1)

    def __str__(self):
        return f'Semester {self.SM_NAME[self.level]}'

    def __repr__(self):
        return f'Semester {self.SM_NAME[self.level]}'

    class Meta:
        verbose_name = _('Semester')
        verbose_name_plural = _('Semesters')


class Department(Model):
    activity = GenericRelation('Activity', related_query_name='department')
    name = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(blank=True , null=True)
    courses = models.ManyToManyField('Course' , blank=True)

    def __str__(self):
        return str(self.name)

    def __repr__(self):
        return str(self.name)

    class Meta:
        verbose_name = _('Department')
        verbose_name_plural = _('Departments')



class Answer(Model):
    activity = GenericRelation('Activity', related_query_name='answer')
    description = models.TextField(blank=True , null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.user)

    def __repr__(self):
        return str(self.user)


class Question(Model):
    activity = GenericRelation('Activity', related_query_name='question')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(blank=True , null=True)
    answers = models.ManyToManyField(Answer, blank=True,related_name='questions')

    def __str__(self):
        return str(self.title)

    def __repr__(self):
        return str(self.title)


class SurveyResponse(Model):
    activity = GenericRelation('Activity', related_query_name='surveyresponse')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,models.CASCADE, blank=True, null=True)
    description = models.TextField(blank=True , null=True)
    responses = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return str(self.user)

    def __repr__(self):
        return str(self.user)

    class Meta:
        verbose_name = _('SurveyResponse')
        verbose_name_plural = _('SurveyResponses')


class Survey(Model):
    activity = GenericRelation('Activity', related_query_name='survey')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(blank=True , null=True)
    responses = models.ManyToManyField(SurveyResponse, blank=True)

    def __str__(self):
        return str(self.title)

    def __repr__(self):
        return str(self.title)

    class Meta:
        verbose_name = _('Survey')
        verbose_name_plural = _('Surveys')
