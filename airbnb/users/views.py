from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, RedirectView, UpdateView
from rest_framework.views import APIView
from airbnb.rooms.models import Reservation
from rest_framework.response import Response
from rest_framework import status
from airbnb.rooms.serializers import ReservationSerializer

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ["name"]

    def get_success_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})

    def get_object(self):
        return User.objects.get(username=self.request.user.username)


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()


class UserReservationView(APIView):

    def get(self, request):

        user = request.user

        try:
            reservations = Reservation.objects.filter(creator=user)
        except Reservation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ReservationSerializer(reservations, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


user_reservations_view = UserReservationView.as_view()
