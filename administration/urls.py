from django.urls import path, include
from administration import views


app_name = 'administration'
urlpatterns = [
    # Agence
    path('segment/', views.EquipeView.as_view(), name='equipe'),
    path('ajouter-segment/', views.AddEquipeView.as_view(), name="add-equipe"),
    path('details-segment/<int:id>/', views.DetailsEquipeView.as_view(), name="details-equipe"),
    path('supprimer-segment/<int:id>/', views.DeleteEquipeView.as_view(), name='delete-equipe'),
    path('editer-segment/<int:id>/', views.EditEquipeView.as_view(), name='edit-equipe'),

    # Gestionnaire
    path('commercial/', views.CommercialView.as_view(), name='commercial'),
    path('ajouter-commercial/', views.AddCommercialView.as_view(), name="add-commercial"),
    path('supprimer-commercial/<int:id>/', views.DeleteCommercialView.as_view(), name='delete-commercial'),
    path('supprimer-multiple-commercial/', views.DeleteMultipleCommercialView.as_view(),
         name='delete-multiple-commercial'),
    path('details-commercial/<int:id>/', views.DetailsCommercialView.as_view(),
         name='details-commercial'),
]
