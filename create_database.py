# selenium 임포트
import random
import django
import os
import pickle
from django.core.files.uploadedfile import SimpleUploadedFile

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
django.setup()

from airbnb.rooms.models import Room, RoomPhoto

rooms = Room.objects.all()
room_photos = RoomPhoto.objects.all()

with open('rooms.pkl', 'wb') as f:
    pickle.dump(rooms, f)

with open('room_photos.pkl', 'wb') as f:
    pickle.dump(room_photos, f)

print('Rooms dump 완료')

