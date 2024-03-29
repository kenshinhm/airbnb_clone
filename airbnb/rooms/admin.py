from django.contrib import admin

from airbnb.rooms.models import Room, RoomPhoto, Amenity, Review, Reservation

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):

    list_display_links = (
        'id',
    )

    search_fields = (
        'city',
        'location',
        'name',
    )

    list_filter = (
        'price',
        'capacity',
    )

    list_display = (
        'id',
        'host',
        'city',
        'location',
        'name',
        'price',
        'capacity',

    )


@admin.register(RoomPhoto)
class RoomPhotoAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'room',
        'photo',
    )

    search_fields = (
        'id',
        'room',
    )


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'key',
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'room',
        'creator',
        'message',
        'rating',
    )


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'room',
        'creator',
        'start_date',
        'end_date',
        'guest_count',
    )
