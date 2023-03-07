from django.urls import path
from analytics import views

app_name = 'analytics'
urlpatterns = [
    # Comité Crédit
    path('facturation/', views.FacturationView.as_view(), name='facturation'),

    # Monitoring
    path('variation-top-200/', views.VariationTop200View.as_view(), name='variation_top_200'),
    path('CA-top-200/', views.CATop200View.as_view(), name='ca_top_200'),
    path('performance-CA-YTD/', views.PerformanceCAView.as_view(), name='performance_ca')
]
