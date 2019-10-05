from django.contrib import admin



from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

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


admin.site.register(Permission)
admin.site.register(ContentType)
admin.site.register(LinkInternal)
admin.site.register(User)
admin.site.register(Activity)
admin.site.register(Course)
admin.site.register(Semester)
admin.site.register(Department)
admin.site.register(Answer)
admin.site.register(Question)
admin.site.register(SurveyResponse)
admin.site.register(Survey)
