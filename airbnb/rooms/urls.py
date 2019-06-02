from django.urls import path
from . import views

app_name = "rooms"
urlpatterns = [
    path("", view=views.Rooms.as_view(), name="rooms"),
    # path("<int:room_id>/", view=views.ImageDetail.as_view(), name="image_detail"),
]