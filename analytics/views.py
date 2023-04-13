import json
from datetime import datetime

import psycopg2
import asyncio
from dateutil.relativedelta import relativedelta
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages

from administration.models import Commercial, Equipe
from users.models import CustomUser
from analytics import data
from django.http import JsonResponse

conn = psycopg2.connect(
    dbname='BSCS',
    user='postgres',
    password='password',
    host='localhost',
    port='5432'
)


def getDateBorne():
    query = f"""SELECT MIN(date_facture) AS date_min, MAX(date_facture) AS date_max FROM public.base_dobb; """

    with conn.cursor() as cursor:
        cursor.execute(query)
        dates = cursor.fetchall()

    min_date = dates[0][0]
    max_date = dates[0][1]
    return min_date, max_date


def get_user_entities(user):
    # Vérifier si l'utilisateur est chef d'agence
    if Commercial.objects.filter(commercial=user).exists():
        # commercial_obj = Commercial.objects.get(commercial=user)
        return 'Commercial'
    # Vérifier si l'utilisateur est chef de zone
    if Equipe.objects.filter(manager=user).exists():
        return 'Manager'
    return None


def getSearch(entities, user):
    search = ''
    if entities == 'Commercial':
        commercial_obj = Commercial.objects.get(commercial=user)
        full_name = f"{commercial_obj.commercial.first_name} {commercial_obj.commercial.last_name}"
        search = f"""
            and LOWER(TRIM(commercial)) = '{full_name.lower().strip()}'
        """
    elif entities == 'Manager':
        equipe = Equipe.objects.get(manager=user)
        search = f"""
            and LOWER(TRIM(segment)) = '{equipe.name.lower().strip()}'
        """
    return search


class FacturationView(LoginRequiredMixin, View):
    univers = 'Mobile'

    def get(self, request):
        univers = data.getDistinctProduct(colonne='univers')
        products = data.getDistinctProduct(colonne='groupe_produit')
        min_date, max_date = getDateBorne()

        greeting = {
            'heading': self.univers,
            'pageview': "Dashboards",
            'product_type': self.univers,
            'min_date': min_date,
            'max_date': max_date,
            'univers': univers,
            'products': products
        }
        return render(request, 'analytics/facturation/facturation.html', greeting)

    def post(self, request):
        user = request.user
        entities = get_user_entities(user)
        search = getSearch(entities, user)

        # Récupération des données de la requête
        request_data = json.load(request)
        univers = request_data['univers']
        self.univers = univers
        start_date = request_data['startDate']
        end_date = request_data['endDate']
        start_date = f'{start_date[:-2]}01'

        # Obtention des données
        parc_actif = data.getParcAtif(univers=univers, get='parc', debut_periode=start_date,
                                      fin_periode=end_date, search=search)
        ca_parc_actif = data.getParcAtif(univers=univers, get='ca', debut_periode=start_date,
                                         fin_periode=end_date, search=search)
        evo_ytd = data.getEvoPeriode(univers=univers, debut_periode=start_date,
                                     fin_periode=end_date, evo_type="ytd", search=search)
        evo_mom = data.getEvoPeriode(univers=univers, debut_periode=start_date,
                                     fin_periode=end_date, evo_type="mom", search=search)
        evo_diff = data.getHausseBasse(univers=univers, debut_periode=start_date, fin_periode=end_date, search=search)

        # Préparation de la réponse
        response_data = {
            'volume': parc_actif,
            'ca': ca_parc_actif,
            'evo_ytd': evo_ytd,
            'evo_mom': evo_mom,
            'evo_diff': evo_diff
        }
        return JsonResponse(response_data)


class VariationTop200View(LoginRequiredMixin, View):
    def get(self, request):
        heading = "Clients Top 200"
        greeting = {'heading': heading, 'pageview': "Dashboards"}
        return render(request, 'analytics/monitoring/variation_top_200.html', greeting)

    def post(self, request):
        request_data = json.load(request)
        start_date = request_data['startDate']
        end_date = request_data['endDate']

        client = data.ClientTop200()
        client_top200, client_top200_ = client.getClientEntrant(date_debut=start_date, date_fin=end_date)

        response_data = {
            'client_top200_': client_top200_
        }

        return JsonResponse(response_data)


class CATop200View(LoginRequiredMixin, View):
    def get(self, request):
        heading = "Contribution au CA"
        greeting = {'heading': heading, 'pageview': "Dashboards"}
        return render(request, 'analytics/monitoring/CA_top_200.html', greeting)

    def post(self, request):
        searche = ''
        user = request.user
        entities = get_user_entities(user)
        search = getSearch(entities, user)

        request_data = json.load(request)
        start_date = request_data['startDate']
        end_date = request_data['endDate']

        get_data = data.ClientTop200()
        mom_caf = get_data.getGraphData(sheet_name='MoM CAF',
                                        date_debut=start_date,
                                        date_fin=end_date,
                                        search=search)
        ca_univers = data.CAUnivers(date_debut=start_date,
                                    date_fin=end_date,
                                    search=search)
        response_data = {'mom_caf': mom_caf, 'ca_univers': ca_univers}

        return JsonResponse(response_data)


async def get_data(start_date, end_date, search):
    instance = data.PortefeuilleDashboard(date_debut=start_date, date_fin=end_date, search=search)
    ca_univers = await instance.caUnivers()
    performance = await instance.dataPerformance()
    gros_clients, pourcent_client, nb_client, nb_client_total = await instance.loiPareto()

    return ca_univers, performance, gros_clients, pourcent_client, nb_client, nb_client_total


class DashboardView(LoginRequiredMixin, View):
    univers = 'Mobile'

    def post(self, request):
        # Récupération des données de la requête
        request_data = json.load(request)
        start_date = request_data['startDate']
        end_date = request_data['endDate']

        user = request.user
        entities = get_user_entities(user)
        search = getSearch(entities, user)

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        univers, performance, gros_clients, pourcent_client, nb_client, nb_client_total = loop.run_until_complete(
            get_data(start_date, end_date, search))
        loop.close()
        nb_mois = data.getNbMois(date_debut=start_date, date_fin=end_date)

        # Préparation de la réponse
        response_data = {
            'univers': univers,
            'performance': performance,
            'gros_clients': gros_clients,
            'nb_mois': int(nb_mois),
            'pourcent_client': float(pourcent_client),
            'nb_client': int(nb_client),
            'nb_client_total': int(nb_client_total)
        }
        return JsonResponse(response_data)

    def get(self, request):
        min_date, max_date = getDateBorne()

        greeting = {
            'heading': self.univers,
            'pageview': "Dashboards",
            'product_type': self.univers,
            'min_date': min_date,
            'max_date': max_date
        }
        return render(request, 'analytics/portefeuille/dashboard.html', greeting)


class DashboardViewManager(LoginRequiredMixin, View):

    def post(self, request, id):
        request_data = json.load(request)
        start_date = request_data['startDate']
        start_date = f'{start_date[:-2]}01'
        end_date = request_data['endDate']

        user = CustomUser.objects.get(id=id)

        entities = get_user_entities(user)
        search = getSearch(entities, user)

        nb_mois = data.getNbMois(date_debut=start_date, date_fin=end_date)
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        univers, performance, gros_clients, pourcent_client, nb_client, nb_client_total = loop.run_until_complete(
            get_data(start_date, end_date, search))

        # Préparation de la réponse
        response_data = {
            'full_name': str(user),
            'univers': univers,
            'performance': performance,
            'gros_clients': gros_clients,
            'nb_mois': int(nb_mois),
            'pourcent_client': float(pourcent_client),
            'nb_client': int(nb_client),
            'nb_client_total': int(nb_client_total)
        }
        return JsonResponse(response_data)

    def get(self, request, id):
        min_date, max_date = getDateBorne()
        greeting = {
            'pageview': "Dashboards",
        }
        return render(request, 'analytics/portefeuille/dashboard.html', greeting)


class ClienteleView(LoginRequiredMixin, View):
    univers = 'univers'

    def get(self, request):
        user = request.user
        entities = get_user_entities(user)

        if entities == 'Commercial':
            commercial_obj = Commercial.objects.get(commercial=user)
            full_name = f"{commercial_obj.commercial.first_name} {commercial_obj.commercial.last_name}"
            search = f"""
                LOWER(TRIM(commercial)) = '{full_name.strip().lower()}'
            """

            query = f"""
                SELECT client, secteur_activite, SUM(montant) as total_montant
                FROM public.base_dobb
                WHERE {search}
                GROUP BY client, secteur_activite ORDER BY total_montant DESC;
            """

            with conn.cursor() as cursor:
                cursor.execute(query)
                clients = cursor.fetchall()

        greeting = {
            'heading': self.univers,
            'pageview': "Dashboards",
            'product_type': self.univers,
            'clients': clients
        }
        return render(request, 'analytics/portefeuille/clientele.html', greeting)


class SuiviEquipeView(LoginRequiredMixin, View):
    def get(self, request):
        univers = data.getDistinctProduct(colonne='univers')
        products = data.getDistinctProduct(colonne='groupe_produit')

        greeting = {
            'pageview': "Dashboards",
            'univers': univers,
            'products': products
        }
        return render(request, 'analytics/ressources/suivi_equipe.html', greeting)

    def post(self, request):
        # Récupération des données de la requête
        request_data = json.load(request)
        start_date = request_data.get('startDate')
        end_date = request_data.get('endDate')
        univers = request_data.get('univers')
        product = request_data.get('product')

        user = request.user
        entities = get_user_entities(user)
        search = getSearch(entities, user)

        if univers and product:
            instance = data.ManagerSegment(date_debut=start_date, date_fin=end_date, search=search)
            recap_univers = instance.recapProduit(colonne='univers')
            recap_product = instance.recapProduit(colonne='groupe_produit')
            top_performers_univers = instance.topPerformer(colonne='univers', choix=univers)
            top_performers_product = instance.topPerformer(colonne='groupe_produit', choix=product)

            response_data = {
                'recap_univers': recap_univers,
                'recap_product': recap_product,
                'top_performers_univers': top_performers_univers,
                'top_performers_product': top_performers_product,
            }
            return JsonResponse(response_data)

        elif product:
            instance = data.ManagerSegment(date_debut=start_date, date_fin=end_date, search=search)
            recap_product = instance.recapProduit(colonne='groupe_produit')
            top_performers_product = instance.topPerformer(colonne='groupe_produit', choix=product)
            response_data = {
                'recap_product': recap_product,
                # 'recap_product_2': recap_product_2,
                'top_performers_product': top_performers_product
            }
            return JsonResponse(response_data)

        elif univers:
            instance = data.ManagerSegment(date_debut=start_date, date_fin=end_date, search=search)
            recap_univers = instance.recapProduit(colonne='univers')
            top_performers_univers = instance.topPerformer(colonne='univers', choix=univers)
            response_data = {
                'recap_univers': recap_univers,
                # 'recap_univers_2': recap_univers_2,
                'top_performers_univers': top_performers_univers,
            }
            return JsonResponse(response_data)
