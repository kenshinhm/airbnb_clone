from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

# 03_createsuperuser:
#   command: "source /opt/python/run/venv/bin/activate && python manage.py ebuser"


class Command(BaseCommand):

    def handle(self, *args, **options):

        User = get_user_model()
        User.objects.create_superuser('admin', 'admin@naver.com', 'pass')
