from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('id_user', 'name', 'surname', 'email', 'is_active', 'created_at')
    search_fields = ('name', 'email')
    ordering = ('-created_at',)

admin.site.register(User, UserAdmin)