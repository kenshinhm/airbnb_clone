from rest_framework.pagination import PageNumberPagination
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
    capacity = rest_framework.NumberFilter(lookup_expr='gte')
    startPrice = rest_framework.NumberFilter(field_name='price', lookup_expr='gte')
    endPrice = rest_framework.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Room
        fields = ['id', 'city', 'location', 'capacity', 'startPrice', 'endPrice']


class Rooms(generics.ListAPIView):
    """
        returns list of rooms filtered by query fields.
        fields = ['id', 'city', 'location', 'capacity_cnt']
    """
    serializer_class = RoomSerializer
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_class = RoomsFilter

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Room.objects.all().prefetch_related('room_photos').order_by('create_time')
        # queryset = queryset.filter(purchaser__username=username)
        return queryset

    def list(self, request, *args, **kwargs):
        # call the original 'list' to get the original response
        response = super(Rooms, self).list(request, *args, **kwargs)

        # customize the response data
        city = self.request.query_params.get('city', None)
        start_price = self.request.query_params.get('startPrice', None)
        end_price = self.request.query_params.get('endPrice', None)
        rooms = Room.objects.filter(city__icontains=city)
        rooms = rooms.filter(price__gte=start_price)
        rooms = rooms.filter(price__lte=end_price)

        response.data['average_price'] = self.get_average_price(rooms)
        response.data['average_rating'] = self.get_average_rating(rooms)
        response.data['total_reviews'] = self.get_total_reviews(rooms)

        # return response with this custom representation
        return response

    def get_average_price(self, rooms):

        total_rooms = len(rooms)
        total_price = 0

        for room in rooms:
            total_price += room.price

        return int(total_price/total_rooms)

    def get_average_rating(self, rooms):

        total_rooms = 0
        total_rating = 0

        for room in rooms:
            rating = float(room.rating)

            if rating > 0.0:
                total_rating += rating
                total_rooms += 1

        if total_rooms == 0:
            return 0.0
        else:
            return round(total_rating / total_rooms, 2)

    def get_total_reviews(self, rooms):

        total_review_count = 0

        for room in rooms:
            total_review_count += room.review_count

        return total_review_count


# class RoomsAverage(APIView):
#
#     def get(self, request):
#
#         city = request.query_params.get('city', None)
#         startPrice = request.query_params.get('startPrice', None)
#         endPrice = request.query_params.get('endPrice', None)
#
#         try:
#             room = Room.objects.filter(city=city)
#             # room = Room.objects.get(id=room_id)
#         except Room.DoesNotExist:
#             # return Response(status=status.HTTP_404_NOT_FOUND)
#
#         # serializer = RoomSerializer(room, context={"request": request})
#
#         return Response(status=status.HTTP_200_OK)


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

