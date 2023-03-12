from django import forms
from django.db.models import Q

from administration import models
from users.models import CustomUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import Group


# Création d'agence
class EquipeForm(forms.ModelForm):
    name = forms.CharField(required=True, label="Nom de l'équipe")
    manager_group = Group.objects.get(name="Manager")
    manager = forms.ModelChoiceField(queryset=CustomUser.objects.filter(groups__in=[manager_group]),
                                     required=True, label="Manager")

    class Meta:
        model = models.Equipe
        fields = ['name', 'manager']

    def save(self, commit=True):
        # Save the provided password in hashed format
        equipe = super().save()
        return equipe


# Création d'un commercial
class CommercialForm(forms.ModelForm):
    Commercial_group = Group.objects.get(name="Commercial")
    try:
        commercial = forms.ModelChoiceField(queryset=CustomUser.objects.filter(
            groups__in=[Commercial_group]
        ).exclude(
            Q(equipe__isnull=False)
        ), required=True, label="Commercial")
    except CustomUser.DoesNotExist:
        commercial = None

    equipe = forms.ModelChoiceField(queryset=models.Equipe.objects.all(), required=True, label="Equipe")

    class Meta:
        model = models.Commercial
        fields = ['commercial', 'equipe']


# Modifier l'agence associée à un chargé d'affaire
class EditCommercialForm(forms.ModelForm):
    equipe = forms.ModelChoiceField(queryset=models.Equipe.objects.all(), required=True, label="Equipe")

    class Meta:
        model = models.Commercial
        fields = ('equipe',)
