from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import generics
from django_filters import rest_framework
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from airbnb.rooms.serializers import RoomSerializer
from .models import Room, RoomPhoto, Amenity
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


class RoomDetail(APIView):

    def get(self, request, room_id):

        try:
            room = Room.objects.get(pk=room_id)
            # room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = RoomSerializer(room)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

