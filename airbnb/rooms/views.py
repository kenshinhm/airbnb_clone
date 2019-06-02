from rest_framework import generics
from django_filters import rest_framework

from airbnb.rooms.serializers import RoomSerializer
from.models import Room, RoomPhoto, Amenity
# from django.shortcuts import render


class RoomsFilter(rest_framework.FilterSet):

    city = rest_framework.CharFilter(lookup_expr='contains')
    location = rest_framework.CharFilter(lookup_expr='contains')

    class Meta:
        model = Room
        fields = ['id', 'city', 'location', 'capacity_cnt']


class Rooms(generics.ListAPIView):
    """
        returns list of rooms filtered by query fields.
        fields = ['id', 'city', 'location', 'capacity_cnt']
    """
    queryset = Room.objects.all().prefetch_related('room_photos', 'amenity')
    serializer_class = RoomSerializer
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_class = RoomsFilter


