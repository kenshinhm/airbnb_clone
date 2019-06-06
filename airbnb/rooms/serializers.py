from rest_framework import serializers

from airbnb.rooms.models import Room, RoomPhoto
from airbnb.users.serializers import UserSerializer


class RoomPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoomPhoto
        fields = (
            'photo',
        )


class RoomSerializer(serializers.ModelSerializer):

    # hostimages = HostImageSerializer(read_only=True)
    amenity = serializers.StringRelatedField(many=True, read_only=True)
    room_photos = RoomPhotoSerializer(many=True)
    host = UserSerializer(read_only=True)
    # def get_room_photo(self, obj):
    #     return obj.room_photos.values_list('room_photos', flat=True)

    class Meta:
        model = Room
        fields = ('id',
                  'name',
                  'city',
                  'location',

                  'type',
                  'capacity_cnt',
                  'bedroom_cnt',
                  'bathroom_cnt',
                  'bed_cnt',

                  'detail_summary',
                  'detail_space',
                  'detail_guest_access',
                  'detail_guest_interaction',
                  'detail_others',

                  'price',
                  'rating',

                  'host',
                  'is_super_host',

                  'lat',
                  'lng',
                  'location_info',

                  # relation
                  'amenity',
                  'room_photos',
                  )
