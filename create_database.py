# selenium 임포트
import random
import django
import os
import pickle
from django.core.files.uploadedfile import SimpleUploadedFile

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
django.setup()

from airbnb.rooms.models import Room

rooms = Room.objects.all()

with open('rooms.pkl', 'wb') as f:
    pickle.dump(rooms, f)

print('Rooms dump 완료')

