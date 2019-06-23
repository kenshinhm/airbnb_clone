# selenium 임포트
import django
import os
import pickle
from django.core.files.uploadedfile import SimpleUploadedFile

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
django.setup()

from airbnb.rooms.models import Room, RoomPhoto
from airbnb.users.models import User

with open('rooms.pkl', 'rb') as f_rooms:

    with open('room_photos.pkl', 'rb') as f_room_photos:

        rooms_pickle = pickle.load(f_rooms)
        room_photos_pickle = pickle.load(f_room_photos)

        # DB create
        db_host = User.objects.get(username='admin')

        room = rooms_pickle.get(id=930)
        photos = room_photos_pickle.filter(room__id=room.id)

        rm = Room.objects.create(name=room.name,
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
                                 host=db_host,
                                 lat=room.lat,
                                 lng=room.lng,
                                 )

        for photo in photos:
            RoomPhoto.objects.create(room=rm, photo=photo.photo)

        print('Room DB Finish')

