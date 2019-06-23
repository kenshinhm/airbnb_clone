# selenium 임포트
import django
import os
import pickle
from django.core.files.uploadedfile import SimpleUploadedFile

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")
django.setup()

from airbnb.rooms.models import Room
from airbnb.users.models import User

with open('rooms.pkl', 'rb') as f:
    rooms = pickle.load(f)

    # DB create
    # db_host = User.objects.get(username='admin')

    room = rooms[0]
    Room.objects.create(name=room.name,
                        city=room.city,
                        location=room.location,
                        type=room.type,
                        capacity=room.capacity,
                        bedroom=room.bedroom,
                        bathroom=room.bathroom,
                        bed=room.bed,
                        summary=room.summary,
                        room_info_0=room.room_info_0,
                        room_info_1=room.room_info_1,
                        room_info_2=room.room_info_2,
                        room_info_3=room.room_info_3,
                        price=room.price,
                        host=room.host,
                        lat=room.lat,
                        lng=room.lng,
                        )

    print('Room DB Finish')

