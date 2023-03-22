import json
from datetime import datetime

import psycopg2
from dateutil.relativedelta import relativedelta
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
        query = f"""SELECT MIN(date_facture) AS date_min, MAX(date_facture) AS date_max FROM public.base_dobb; """

        with conn.cursor() as cursor:
            cursor.execute(query)
            dates = cursor.fetchall()

        min_date = dates[0][0]
        max_date = dates[0][1]

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
        user = request.user

        # Récupération des données de la requête
        # param1 = request.POST.get('param1')
        # param2 = request.POST.get('param2')
        
        request_data = json.load(request)
        start_date = request_data['startDate']
        end_date = request_data['endDate']

        client = data.ClientTop200()
        client_entrant = client.getClient(sheet_name='client entrant')
        client_sortant = client.getClient(sheet_name='client sortant')
        client_entrant2, client_top200 = client.getClientEntrant(date_debut=start_date, date_fin=end_date)
        response_data = {'client_entrant': client_entrant, 'client_sortant': client_sortant,
                         'client_entrant2': client_entrant2, 'client_top200': client_top200}

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

        univers = data.caUniversCommerciaux(date_debut=start_date, date_fin=end_date, search=search)
        perfomance = data.performGenerale(date_debut=start_date, date_fin=end_date, search=search)
        produit = data.produit(date_debut=start_date, date_fin=end_date, search=search)
        top_client = data.topClient(date_debut=start_date, date_fin=end_date, search=search)
        nb_mois = data.getNbMois(date_debut=start_date, date_fin=end_date)
        gros_clients, pourcent_client, nb_client, nb_client_total = data.top_80_20(date_debut=start_date,
                                                                                   date_fin=end_date, search=search)

        # Préparation de la réponse
        response_data = {
            'univers': univers,
            'performance': perfomance,
            'product': produit,
            'top_client': top_client,
            'gros_clients': gros_clients,
            'nb_mois': int(nb_mois),
            'pourcent_client': float(pourcent_client),
            'nb_client': int(nb_client),
            'nb_client_total': int(nb_client_total)
        }
        return JsonResponse(response_data)

    def get(self, request):
        query = f"""SELECT MIN(date_facture) AS date_min, MAX(date_facture) AS date_max FROM public.base_dobb; """

        with conn.cursor() as cursor:
            cursor.execute(query)
            dates = cursor.fetchall()

        min_date = dates[0][0]
        max_date = dates[0][1]

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
        commercial_obj = Commercial.objects.get(id=id)
        # Récupération des données de la requête
        request_data = json.load(request)
        start_date = request_data['startDate']
        end_date = request_data['endDate']

        # user = request.user
        full_name = f"{commercial_obj.commercial.first_name} {commercial_obj.commercial.last_name}"
        search = f"""
            and LOWER(TRIM(commercial)) = '{full_name.lower().strip()}'
        """

        univers = data.caUniversCommerciaux(date_debut=start_date, date_fin=end_date, search=search)
        perfomance = data.performGenerale(date_debut=start_date, date_fin=end_date, search=search)
        produit = data.produit(date_debut=start_date, date_fin=end_date, search=search)
        top_client = data.topClient(date_debut=start_date, date_fin=end_date, search=search)
        nb_mois = data.getNbMois(date_debut=start_date, date_fin=end_date)
        gros_clients, pourcent_client, nb_client, nb_client_total = data.top_80_20(date_debut=start_date,
                                                                                   date_fin=end_date, search=search)

        # Préparation de la réponse
        response_data = {
            'full_name': full_name,
            'univers': univers,
            'performance': perfomance,
            'product': produit,
            'top_client': top_client,
            'gros_clients': gros_clients,
            'nb_mois': int(nb_mois),
            'pourcent_client': float(pourcent_client),
            'nb_client': int(nb_client),
            'nb_client_total': int(nb_client_total)
        }
        return JsonResponse(response_data)

    def get(self, request, id):
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
            searche = f"""
                LOWER(TRIM(commercial)) = '{full_name.lower().strip()}'
            """

            query = f"""
                SELECT client, secteur_activite, SUM(montant) as total_montant
                FROM public.base_dobb
                WHERE {searche}
                GROUP BY client, secteur_activite ORDER BY total_montant DESC;
            """

            with conn.cursor() as cursor:
                cursor.execute(query)
                clients = cursor.fetchall()

        greeting = {
            'heading': self.univers,
            'pageview': "Dashboards",
            'product_type': self.univers,
            "menu_wallet": True,
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
        start_date = request_data['startDate']
        end_date = request_data['endDate']
        product = request_data['product']
        univers = request_data['univers']

        searche = ''
        user = request.user
        entities = get_user_entities(user)
        search = getSearch(entities, user)

        recap_univers = data.recapData(colonne='univers', date_debut=start_date, date_fin=end_date, search=search)
        recap_product = data.recapData(colonne='groupe_produit', date_debut=start_date,
                                       date_fin=end_date, search=search)
        top_performers_univers = data.getTopPerformers(colonne='univers', choix=univers, date_debut=start_date,
                                                       date_fin=end_date, search=search)
        top_performers_product = data.getTopPerformers(colonne='groupe_produit', choix=product, date_debut=start_date,
                                                       date_fin=end_date, search=search)

        # Préparation de la réponse
        response_data = {
            'recap_univers': recap_univers,
            'recap_product': recap_product,
            'top_performers_univers': top_performers_univers,
            'top_performers_product': top_performers_product
        }
        return JsonResponse(response_data)
