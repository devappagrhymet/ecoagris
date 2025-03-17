"""BACKEND_ECOAGRIS URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from DIVADMIN.views import *
from GESTUSER.views import *
from PARAMS.views import *
from INDICATEUR.views import *
from PRODAGRIC.views import *
from PRODINDUST.views import *
from POPULATION.views import *
from STOCK.views import *
from django.conf.urls.static import static
from django.conf import settings
from PRODAGRIC import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/divadmin/',   include('DIVADMIN.routers')),
    path('api/gestuser/',   include('GESTUSER.routers')),
    path('api/parametre/',  include('PARAMS.routers')),
    path('api/indicateur/', include('INDICATEUR.routers')),
    path('api/prodagric/',  include('PRODAGRIC.routers')),
    #_________________PRODAGRIC_____________________________________
    path('api/prodagric/fetchProdagric',            views.fetchProdagric, name='fetchProdagric'),
    path('api/prodagric/fetchProdCerealiere',       views.productionCereale, name='fetchProdCerealiere'),
    path('api/prodagric/nbr_data_indicateur',       views.nbrDataIndicateur, name='nbr_data_indicateur'),
    path('api/prodagric/nbr_indicateur',            views.nbrIndicateur, name='nbr_indicateur'),
    path('api/prodagric/nbr_sousysteme',            views.nbrSousysteme, name='nbr_sousysteme'),
    path('api/prodagric/nbr_pays',                  views.nbrPays, name='nbr_pays'),
    path('api/prodagric/indicateurItemByAnnee',     views.indicateurItemByAnnee, name='indicateurItemByAnnee'),
    path('api/prodagric/getProdPays',               views.getProdPays, name='getProdPays'),
    path('api/prodagric/getDataProductionAgricole', views.getDataProductionAgricole, name='getDataProductionAgricole'),
    #_________________MARCHE_____________________________________
    path('api/marche/',  include('MARCHE.routers')),
    #_________________ELEVAGE_____________________________________
    path('api/elevage/',  include('ELEVAGE.routers')),
    path('api/elevage/getDataCheptel', views.getDataCheptel, name='getDataCheptel'),
    path('api/elevage/getDataProductionViande', views.getDataProductionViande, name='getDataProductionViande'),
    path('api/elevage/getDataProductionOeuf', views.getDataProductionOeuf, name='getDataProductionOeuf'),
    path('api/elevage/getDataProductionLaitiere', views.getDataProductionLaitiere, name='getDataProductionLaitiere'),
    #_________________PECHE_____________________________________
    path('api/peche/',  include('PECHE.routers')),
    path('api/peche/getDataProductionPeche', views.getDataProductionPeche, name='getDataProductionPeche'),
    #_________________MARCHE COMEXT_____________________________________
    path('api/marche/getDataImport',views.getDataImport, name='getDataImport'),
    path('api/marche/getDataExport',views.getDataExport, name='getDataExport'),
    #_________________MARCHE  AGRICOLE & BETAIL_____________________________________
    path('api/marche/prix_produit_agricole', views.getDataMarcheAgricole, name='prix_produit_agricole'),
    path('api/marche/prix_betail',           views.getDataMarcheBetail,   name='prix_betail'),
    
    #________________CALCULE INDICATEUR____________________________________________
    path('api/marche/taux-importation', views.TauxCroiAnImportation, name='taux-importation'),
    
    #_________________PRODUCTION INDUSTRIELLE_____________________________________
    path('api/industrielle/',  include('PRODINDUST.routers')),
    #_________________STOCK_______________________________________________________
    path('api/stock/',  include('STOCK.routers')),
    #_________________POPULATION__________________________________________________
    path('api/pop/',  include('POPULATION.routers')),
    
    #_________________MARCHE  AGRICOLE & BETAIL_____________________________________
    path('api/prod/production_industrielle', views.getDataProductionIndus, name='production_industrielle'),
    path('api/stock/stock',                  views.getDataStock,           name='stock'),
    path('api/population/population',        views.getDataPopulation,      name='population'),
    #_________________MARCHE  AGRICOLE & BETAIL indicateur_____________________________________
    path('api/marche/marche_prix_consommateur', views.indicateurPrixConsommateur, name='marche_prix_consommateur'),
    path('api/marche/marche_prix_betail',       views.indicateurPrixBetail, name='marche_prix_betail'),
    path('api/marche/valeur_total_impexp_pays', views.valeurTotalImportExport, name='valeur_total_impexp_pays'),
    path('api/marche/qte_total_impexp_pays',    views.quantiteTotalImportExport, name='qte_total_impexp_pays'),
    path('api/marche/valeur_total_impexp_all',  views.valeurTotalImportExportAllCountries, name='valeur_total_impexp_all'),
    path('api/marche/quantite_total_impexp_all',  views.quantiteTotalImportExportAllCountries, name='quantite_total_impexp_all'),
                                           
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)