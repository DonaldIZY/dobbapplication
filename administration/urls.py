from django.urls import path, include
from administration import views


app_name = 'administration'
urlpatterns = [
    # Agence
    path('agence/', views.EquipeView.as_view(), name='equipe'),
    path('add-agence/', views.AddEquipeView.as_view(), name="add-equipe"),
    path('details-zone/<int:id>/', views.DetailsEquipeView.as_view(), name="details-equipe"),
    path('delete-agence/<int:id>/', views.DeleteEquipeView.as_view(), name='delete-equipe'),
    path('edit-agence/<int:id>/', views.EditEquipeView.as_view(), name='edit-equipe'),

    # Gestionnaire
    path('commercial/', views.CommercialView.as_view(), name='commercial'),
    path('add-commercial/', views.AddCommercialView.as_view(), name="add-commercial"),
    path('delete-commercial/<int:id>/', views.DeleteCommercialView.as_view(), name='delete-commercial'),
    path('delete-multiple-commercial/', views.DeleteMultipleCommercialView.as_view(),
         name='delete-multiple-commercial'),
    path('commercial-details/<int:id>/', views.DetailsCommercialView.as_view(),
         name='details-commercial'),
]
