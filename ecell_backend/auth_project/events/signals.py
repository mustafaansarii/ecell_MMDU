from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Event
from django.utils import timezone

@receiver(pre_save, sender=Event)
def update_event_status(sender, instance, **kwargs):
    # Only update status if it's not already being set
    if not instance._state.adding:  # Check if this is not a new instance
        now = timezone.now()
        if instance.start_date <= now <= instance.end_date and instance.status != 'active':
            instance.status = 'active'
        elif now > instance.end_date and instance.status != 'past':
            instance.status = 'past' 