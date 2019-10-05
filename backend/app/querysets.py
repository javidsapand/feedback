from django.db.models import QuerySet
from django.utils import timezone

class BaseQuerySet(QuerySet):
    def update(self, **kwargs):
        return super().update(**{'timestamp': timezone.now(), **kwargs})



class NotificationQuerySet(QuerySet):

    def unread(self, include_deleted=False):
        return self.filter(unread=True, deleted=False)


    def read(self, include_deleted=False):
        return self.filter(unread=False, deleted=False)


    def mark_all_as_read(self, recipient=None):
        qs = self.unread(True)
        if recipient:
            qs = qs.filter(recipient=recipient)

        return qs.update(unread=False)

    def mark_all_as_unread(self, recipient=None):
        qs = self.read(True)
        if recipient:
            qs = qs.filter(recipient=recipient)
        return qs.update(unread=True)

    def deleted(self):
        return self.filter(deleted=True)

    def active(self):
        return self.filter(deleted=False)

    def mark_all_as_deleted(self, recipient=None):
        qs = self.active()
        if recipient:
            qs = qs.filter(recipient=recipient)

        return qs.update(deleted=True)

    def mark_all_as_active(self, recipient=None):
        qs = self.deleted()
        if recipient:
            qs = qs.filter(recipient=recipient)

        return qs.update(deleted=False)

