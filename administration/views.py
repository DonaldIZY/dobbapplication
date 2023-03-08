from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.core.paginator import Paginator

from administration import models
from administration import forms
from django.contrib.auth.models import Group
from users.models import CustomUser


# =================================================== Agence View ======================================================
class EquipeView(LoginRequiredMixin, View):
    def get(self, request):
        agence_stats = models.Equipe.objects.annotate(
            nb_commerciaux=Count('commercial', distinct=True)
        )
        paginator = Paginator(agence_stats, 7)  # Show 7 Users per page.

        context = {
            "equipes": paginator.get_page(request.GET.get('page')),
            "colors": {'primary': 'primary', 'success': 'success', 'dark': 'dark'},
            "page_title": "Equipe"
        }
        return render(request, "administration/equipe-list.html", context)


class DetailsEquipeView(LoginRequiredMixin, View):

    def get(self, request, id):
        if request.user.has_perm('administration.change_equipe'):
            equipe_obj = get_object_or_404(models.Equipe, id=id)
            agence_stats = models.Equipe.objects.filter(zone=equipe_obj).annotate(
                nb_commerciaux=Count('commercial', distinct=True)).order_by('name')
            paginator = Paginator(agence_stats, 7)
            print(agence_stats[0].nb_commerciaux)

            context = {
                "equipe_obj": equipe_obj,
                "equipes": paginator.get_page(request.GET.get('page')),
                "colors": {'primary': 'primary', 'success': 'success', 'dark': 'dark'},
                "page_title": "Information sur l'équipe"
            }
            return render(request, "administration/equipe-details.html", context)
        else:
            messages.warning("Vous n'êtes autorisé à accéder à cette page")
            raise PermissionDenied()


class EditEquipeView(LoginRequiredMixin, View):
    context = {"page_title": "Modifier les informations de l'équipe"}

    def get(self, request, id):
        if request.user.has_perm('administration.change_equipe'):
            agence_obj = get_object_or_404(models.Equipe, id=id)
            form = forms.EquipeForm(instance=agence_obj)
            self.context["agence_obj"] = agence_obj
            self.context["form"] = form
            print(form)
            return render(request, "administration/equipe-add.html", self.context)
        else:
            messages.warning(request, "Vous n'êtes pas autorisé à accéder à cette page !")
            return redirect("administration:equipe")

    def post(self, request, id):
        if request.user.has_perm('administration.change_equipe'):
            agence_obj = get_object_or_404(models.Equipe, id=id)
            form = forms.EquipeForm(request.POST, instance=agence_obj)
            if form.is_valid():
                agence_obj = form.save()
                return redirect('administration:equipe')
            else:
                messages.warning(request, 'Quelque a mal fonctionné !')
                self.context['form'] = form
                return render(request, 'administration/equipe-add.html', self.context)
        else:
            messages.warning(request, "Vous n'êtes pas autorisé à accéder à cette page !")
            return redirect("administration:equipe")


class AddEquipeView(LoginRequiredMixin, View):
    context = {"page_title": "Création d'équipe"}

    def get(self, request):
        form = forms.EquipeForm()
        self.context['form'] = form
        return render(request, 'administration/equipe-add.html', self.context)

    def post(self, request):
        form = forms.EquipeForm(request.POST)
        print(form)
        if form.is_valid():
            form.save()
            messages.success(request, 'Agence Crée avec Succès')
            return redirect('administration:equipe')
        else:
            messages.warning(request, 'Il existe une agence portant ce nom')
            self.context['form'] = form
            return render(request, 'administration/equipe-add.html', self.context)


class DeleteEquipeView(View):

    def get(self, request, id):
        if request.user.is_authenticated and request.user.has_perm('administration.delete_equipe'):
            equipe_obj = models.Equipe.objects.get(id=id)
            if equipe_obj:
                nom_agence = equipe_obj.name
                equipe_obj.delete()
                messages.success(request, f"Vous venez de supprimer l'équipe {nom_agence}")
            else:
                messages.warning(request, "Cette agence n'existe pas")
        else:
            messages.warning(request, "Vous n'êtes pas autorisé à supprimer une équipe !")
        return redirect('administration:equipe')


# ================================================= Gestionnaire View ==================================================
class CommercialView(LoginRequiredMixin, View):
    def get(self, request):
        # groupe_gestionnaire = Group.objects.get(name="chargé d'affaire")
        gestionnaires_lise = models.Commercial.objects.filter()
        paginator = Paginator(gestionnaires_lise, 7)  # Show 7 Users per page.

        context = {
            "commerciaux": paginator.get_page(request.GET.get('page')),
            "colors": {'primary': 'primary', 'success': 'success', 'dark': 'dark'},
            "page_title": "Liste des Commerciaux"
        }
        return render(request, "administration/commercial-list.html", context)


class DetailsCommercialView(LoginRequiredMixin, View):
    context = None

    def get(self, request, id):
        if request.user.has_perm('administration.view_commercial'):
            commercial_obj = get_object_or_404(models.Commercial, id=id)
            form = forms.EditCommercialForm(instance=commercial_obj)
            context = {
                "gestionnaire_obj": commercial_obj,
                "user_group_perms": commercial_obj.commercial.get_group_permissions(),
                "user_perms": commercial_obj.commercial.get_user_permissions(),
                "page_title": "Information du commercial",
                "form": form
            }
            return render(request, "administration/commercial-details.html", context)
        else:
            messages.warning(request, "Vous n'êtes pas autorisé à accéder à cette page !")

    def post(self, request, id):
        commercial_obj = get_object_or_404(models.Commercial, id=id)
        form = forms.EditCommercialForm(request.POST, instance=commercial_obj)
        if form.is_valid():
            gestionnaire_obj = form.save()
            return redirect('administration:commercial')
        else:
            messages.warning(request, 'Quelque a mal fonctionné !')
            self.context['form'] = form
            return render(request, 'administration/commercial-details.html', self.context)


class AddCommercialView(LoginRequiredMixin, View):
    context = {"page_title": "Créer un Commercial"}

    def get(self, request):
        Commercial_group = Group.objects.get(name="Commercial")
        if Commercial_group:
            form = forms.CommercialForm()
            self.context['form'] = form
            return render(request, 'administration/commercial-add.html', self.context)
        else:
            messages.debug(request, "Vous devez dans un premier temps créer le rôle 'Commercial'")
            return redirect('administration:commercial')

    def post(self, request):
        form = forms.CommercialForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Succès de l'opération")
            return redirect('administration:commercial')
        else:
            messages.warning(request, 'Oops, il semble avoir une erreur')
            self.context['form'] = form
            return render(request, 'administration/commercial-add.html', self.context)


class DeleteCommercialView(View):

    def get(self, request, id):
        if request.user.is_authenticated and request.user.has_perm('administration.delete_commercial'):
            commercial_obj = models.Commercial.objects.get(id=id)
            if commercial_obj:
                last_name = commercial_obj.commercial.last_name
                first_name = commercial_obj.commercial.first_name
                commercial_obj.delete()
                messages.success(request, f"Vous venez de supprimer le chargé d'affaire {first_name} {last_name}")
            else:
                messages.warning(request, "Ce chargé d'affaire n'existe pas dans nos bases")
        else:
            messages.warning(request, "Vous n'êtes pas autorisé à supprimer un commercial !")
        return redirect('administration:commercial')


class DeleteMultipleCommercialView(View):

    def post(self, request):
        if request.user.is_authenticated and request.user.has_perm('administration.delete_commercial'):
            id_list = request.POST.getlist('id[]')
            id_list = [i for i in id_list if i != '']
            for id in id_list:
                user_obj = models.Commercial.objects.get(pk=id)
                if user_obj:
                    user_obj.delete()
                    response = JsonResponse({"success": 'Commercial supprimer avec succès'})
                else:
                    response = JsonResponse({"warning": "Ce Commercial n'existe pas"})

            response.status_code = 200
        else:
            messages.warning(request, "Vous n'êtes pas autorisé à supprimer des commerciaux !")
        return response
