from django.db import models
from users.models import CustomUser


class Equipe(models.Model):
    name = models.CharField(max_length=100, unique=True)
    manager = models.OneToOneField(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class Commercial(models.Model):
    commercial = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    equipe = models.ForeignKey(Equipe, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.commercial.first_name} {self.commercial.last_name}"
