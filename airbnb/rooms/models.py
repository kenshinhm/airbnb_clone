from django.db import models
from airbnb.users.models import User


class TimestampModel(models.Model):

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Room(TimestampModel):

    # room info
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=20)
    location = models.CharField(max_length=20, null=True)

    # refactor
    type = models.CharField(max_length=20, blank=True, null=True)
    capacity_cnt = models.IntegerField()
    bedroom_cnt = models.IntegerField()
    bathroom_cnt = models.IntegerField()
    bed_cnt = models.IntegerField()

    # refactor
    detail_summary = models.TextField(blank=True)
    detail_space = models.TextField(blank=True)
    detail_guest_access = models.TextField(blank=True)
    detail_guest_interaction = models.TextField(blank=True)
    detail_others = models.TextField(blank=True)

    price = models.IntegerField()

    # room_amenity
    amenity = models.ManyToManyField('Amenity', blank=True)

    # room_booking

    # room_reviews
    rating = models.FloatField(blank=True, null=True)

    # host
    # TODO: divide host user, guest user
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='host')
    is_super_host = models.BooleanField(blank=True)

    # room location
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    location_info = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Amenity(models.Model):

    key = models.CharField(max_length=50)

    def __str__(self):
        return self.key


class RoomPhoto(TimestampModel):

    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='room_photos')
    # TODO: save room photo on specific folder
    photo = models.ImageField(upload_to='room/')

    def __str__(self):
        return self.room.name


