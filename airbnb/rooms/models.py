from django.db import models
from airbnb.users.models import User
import numpy as np


class TimestampModel(models.Model):

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Room(TimestampModel):

    # room info
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=40)
    location = models.CharField(max_length=40, null=True)

    # refactor
    type = models.CharField(max_length=30, blank=True, null=True)
    capacity = models.IntegerField()
    bedroom = models.IntegerField()
    bathroom = models.IntegerField()
    bed = models.IntegerField()

    # refactor
    summary = models.TextField(blank=True)
    room_info_0 = models.TextField(blank=True)
    room_info_1 = models.TextField(blank=True)
    room_info_2 = models.TextField(blank=True)
    room_info_3 = models.TextField(blank=True)

    price = models.IntegerField()

    # room_amenity
    # amenity = models.ManyToManyField('Amenity', blank=True)

    # room_booking

    # host
    # TODO: divide host user, guest user
    host = models.ForeignKey(User, on_delete=models.CASCADE)

    # room location
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)

    @property
    def review_count(self):
        return self.reviews.all().count()

    @property
    def rating(self):
        rating_query = self.reviews.all().values('rating')
        rating_list = [query['rating'] for query in rating_query]
        if not rating_list:
            rating_list.append(0.0)

        return '{rating:.1f}'.format(rating=np.mean(rating_list))

    def __str__(self):
        return self.name


class Amenity(models.Model):

    key = models.CharField(max_length=50)

    def __str__(self):
        return self.key


class Review(TimestampModel):

    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='reviews')
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    rating = models.FloatField(default=5.0)

    def __str__(self):
        return '{}-{}'.format(self.creator, self.room)


class RoomPhoto(TimestampModel):

    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='room_photos')
    # TODO: save room photo on specific folder
    photo = models.ImageField(upload_to='room/')

    def __str__(self):
        return self.room.name


class Reservation(TimestampModel):

    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='reservations')
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    guest_count = models.IntegerField()

    def __str__(self):
        return '{},{}-{}'.format(self.room, self.start_date, self.end_date)


