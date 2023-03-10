import json

from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from analytics import data
from django.http import JsonResponse


class FacturationView(LoginRequiredMixin, View):
    univers = 'Mobile'

    def post(self, request):
        # Récupération des données de la requête
        set_univers = json.load(request)['univers']
        self.univers = set_univers

        # Obtention des données
        parc_actif = data.getParcAtif(univers=set_univers, get='parc', debut_periode='2022-01-01',
                                      fin_periode='2022-11-01')
        ca_parc_actif = data.getParcAtif(univers=set_univers, get='ca', debut_periode='2022-01-01',
                                         fin_periode='2022-11-01')
        evo_ytd = data.getEvoPeriode(univers=set_univers, debut_periode='2022-01-01',
                                     fin_periode='2022-11-01', evo_type="ytd")
        evo_mom = data.getEvoPeriode(univers=set_univers, debut_periode='2022-06-01',
                                     fin_periode='2022-11-01', evo_type="mom")
        evo_diff = data.getHausseBasse(univers=set_univers, debut_periode='2022-01-01', fin_periode='2022-11-01')

        # Préparation de la réponse
        response_data = {
            'volume': parc_actif,
            'ca': ca_parc_actif,
            'evo_ytd': evo_ytd,
            'evo_mom': evo_mom,
            'evo_diff': evo_diff
        }
        return JsonResponse(response_data)

    def get(self, request):
        greeting = {'heading': self.univers, 'pageview': "Dashboards", 'product_type': self.univers,
                    "menu_wallet": True}
        return render(request, 'analytics/facturation/facturation.html', greeting)


class VariationTop200View(LoginRequiredMixin, View):
    def get(self, request):
        heading = "Clients Top 200"
        greeting = {'heading': heading, 'pageview': "Dashboards"}
        return render(request, 'analytics/monitoring/variation_top_200.html', greeting)

    def post(self, request):
        # Récupération des données de la requête
        param1 = request.POST.get('param1')
        param2 = request.POST.get('param2')

        client = data.ClientTop200()
        client_entrant = client.getClient(sheet_name='client entrant')
        client_sortant = client.getClient(sheet_name='client sortant')
        response_data = {'client_entrant': client_entrant, 'client_sortant': client_sortant}

        return JsonResponse(response_data)


class CATop200View(LoginRequiredMixin, View):
    def get(self, request):
        heading = "Contribution au CA"
        greeting = {'heading': heading, 'pageview': "Dashboards"}
        return render(request, 'analytics/monitoring/CA_top_200.html', greeting)

    def post(self, request):
        # Récupération des données de la requête
        param1 = request.POST.get('param1')
        param2 = request.POST.get('param2')

        get_data = data.ClientTop200()
        mom_caf = get_data.getGraphData(sheet_name='MoM CAF')
        ca_univers = data.CAUnivers()
        response_data = {'mom_caf': mom_caf, 'ca_univers': ca_univers}

        return JsonResponse(response_data)


class PerformanceCAView(LoginRequiredMixin, View):
    def get(self, request):
        heading = "Performance CA YTD"
        greeting = {'heading': heading, 'pageview': "Dashboards"}
        return render(request, 'analytics/dashboard/monitoring/performanceCAYTD.html', greeting)
