from rest_framework import serializers

from airbnb.rooms.models import Room, RoomPhoto, Review, Reservation
from airbnb.users.serializers import UserSerializer


class RoomIdNameLocationPriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ('id',
                  'name',
                  'location',
                  'price',
                  )


class ReservationSerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only=True)
    room = RoomIdNameLocationPriceSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = (
            'id',
            'creator',
            'room',
            'start_date',
            'end_date',
            'guest_count',
        )


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
            'is_own',
            'create_time',
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
    reservations = ReservationSerializer(many=True)
    host = UserSerializer(read_only=True)
    rating = serializers.ReadOnlyField()

    class Meta:
        model = Room
        fields = ('id',
                  'name',
                  'city',
                  'location',

                  'type',
                  'capacity',
                  'bedroom',
                  'bathroom',
                  'bed',

                  'summary',
                  'room_info_0',
                  'room_info_1',
                  'room_info_2',
                  'room_info_3',

                  'price',
                  'rating',

                  'host',

                  'lat',
                  'lng',

                  'reviews',
                  'review_count',

                  # relation
                  # 'amenity',
                  'room_photos',
                  'reservations',
                  )
