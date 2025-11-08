from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Użytkownik musi mieć adres e-mail")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    USER_ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('organizer', 'Organizator'),
        ('user', 'User'),
    ]
        
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    user_image = models.ImageField(upload_to='user_images/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    wants_to_be_organizer = models.BooleanField(default=False)
    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES, default='user')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname']

    def __str__(self):
        return f"{self.name} {self.surname}"
    
