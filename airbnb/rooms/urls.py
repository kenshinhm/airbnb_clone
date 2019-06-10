from django.urls import path
from . import views

app_name = "rooms"
urlpatterns = [
    path("", view=views.Rooms.as_view(), name="rooms"),
    path("<int:room_id>/", view=views.RoomDetail.as_view(), name="room_detail"),
    path("<int:room_id>/reviews/", view=views.RoomReviews.as_view(), name="room_reviews"),
    path("<int:room_id>/reviews/<int:review_id>", view=views.RoomReview.as_view(), name="room_review"),
]