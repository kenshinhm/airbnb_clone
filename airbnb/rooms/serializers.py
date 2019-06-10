from rest_framework import serializers

from airbnb.rooms.models import Room, RoomPhoto, Review
from airbnb.users.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only=True)
    room = serializers.StringRelatedField()
    is_own = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Review
        fields = (
            'id',
            'creator',
            'message',
            'room',
            'rating',
            'is_own'
        )

    def get_is_own(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if request.user == obj.creator:
                return True
            else:
                return False

        return False


class RoomPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoomPhoto
        fields = (
            'photo',
        )


class RoomSerializer(serializers.ModelSerializer):

    # hostimages = HostImageSerializer(read_only=True)
    # amenity = serializers.StringRelatedField(many=True, read_only=True)
    # reviews = serializers.ListField(read_only=True, child=ReviewSerializer())
    reviews = ReviewSerializer(many=True)
    room_photos = RoomPhotoSerializer(many=True)
    host = UserSerializer(read_only=True)
    rating = serializers.ReadOnlyField()

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

                  'reviews',
                  'review_count',

                  # relation
                  # 'amenity',
                  'room_photos',
                  )
