
import base64
from django.shortcuts import get_object_or_404
import collections

from .signals import notify
from .models import Notification
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Group
from django.utils import timezone


def get_object_by_id(model , id):
    if isinstance(id, str):
        if id.isnumeric():
            return get_object_or_404(model , id=int(id))

        value = base64.urlsafe_b64decode(id).decode()
        value = int(value.split(':')[1])
        return get_object_or_404(model , id=int(value))
    else:
        return get_object_or_404(model , id=int(id))



def id_to_int(id):
    if id.isnumeric():
        return int(id)

    value = base64.urlsafe_b64decode(id).decode()
    value = int(value.split(':')[1])
    return int(value)




def notify_handler(verb, **kwargs):
    kwargs.pop('signal', None)
    recipient = kwargs.pop('recipient')
    actor = kwargs.pop('sender')
    optional_objs = [
        (kwargs.pop(opt, None), opt)
        for opt in ('target', 'action_object')
    ]
    public = bool(kwargs.pop('public', True))
    description = kwargs.pop('description', None)
    timestamp = kwargs.pop('timestamp', timezone.now())
    level = kwargs.pop('level', Notification.LEVELS.info)

    # Check if User or Group
    if isinstance(recipient, Group):
        recipients = recipient.user_set.all()
    else:
        recipients = [recipient]

    for recipient in recipients:
        newnotify = Notification(
            recipient=recipient,
            actor_content_type=ContentType.objects.get_for_model(actor),
            actor_object_id=actor.pk,
            verb= verb,
            public=public,
            description=description,
            timestamp=timestamp,
            level=level,
        )

        # Set optional objects
        for obj, opt in optional_objs:
            if obj is not None:
                setattr(newnotify, '%s_object_id' % opt, obj.pk)
                setattr(newnotify, '%s_content_type' % opt,
                        ContentType.objects.get_for_model(obj))

        if len(kwargs):
            newnotify.data = kwargs

        newnotify.save()


# connect the signal
notify.connect(notify_handler, dispatch_uid='notifications.models.notification')
