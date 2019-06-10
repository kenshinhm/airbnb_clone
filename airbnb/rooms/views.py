from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import generics
from django_filters import rest_framework
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from airbnb.rooms.serializers import RoomSerializer, ReviewSerializer
from .models import Room, Review
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
    queryset = Room.objects.all().prefetch_related('room_photos')
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

        serializer = RoomSerializer(room, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class RoomReviews(APIView):

    def get(self, request, room_id):

        try:
            reviews = Review.objects.filter(room__pk=room_id)
            # room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ReviewSerializer(reviews, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, room_id):

        user = request.user

        try:
            room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user, room=room)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomReview(APIView):

    def get(self, request, room_id, review_id):
        try:
            review = Review.objects.get(id=review_id, room__id=room_id)
        except Review.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ReviewSerializer(review)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, room_id, review_id):

        user = request.user

        try:
            review = Review.objects.get(id=review_id, creator=user, room__id=room_id)
            review.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Review.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

