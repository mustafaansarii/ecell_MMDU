from django.db import models
from django.utils import timezone

class EventManager(models.Manager):
    def get_active_event(self):
        now = timezone.now()
        try:
            return self.get(status='active')
        except Event.DoesNotExist:
            return None

    def get_upcoming_events(self):
        return self.filter(status='upcoming')

    def get_past_events(self):
        return self.filter(status='past') 