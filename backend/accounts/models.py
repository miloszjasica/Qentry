from django.db import models


class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    role = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    user_image = models.ImageField(upload_to='user_images/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} {self.surname}"

