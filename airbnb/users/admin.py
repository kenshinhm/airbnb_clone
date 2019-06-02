from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from airbnb.users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name", "profile_image")}),) + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "email", "name", "is_superuser", "profile_image"]
    search_fields = ["name"]
