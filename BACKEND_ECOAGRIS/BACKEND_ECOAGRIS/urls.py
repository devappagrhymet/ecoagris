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
from django.conf.urls.static import static
from django.conf import settings
from PRODAGRIC import views




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/divadmin/', include('DIVADMIN.routers')),
    path('api/gestuser/', include('GESTUSER.routers')),
    path('api/parametre/', include('PARAMS.routers')),
    path('api/indicateur/', include('INDICATEUR.routers')),
    path('api/prodagric/', include('PRODAGRIC.routers')),
    #_________________PRODAGRIC_____________________________________
    path('api/prodagric/varQuantiteProd',       views.VarQuantiteProd, name='VarQuantiteProd'),
    path('api/prodagric/varSuperficieCult',     views.VarSuperficieCult, name='varSuperficieCult'),
    path('api/prodagric/indRendement',          views.IndRendement, name='indRendement'),
    path('api/prodagric/nbr_data_indicateur',   views.nbrDataIndicateur, name='nbr_data_indicateur'),
    path('api/prodagric/nbr_indicateur',        views.nbrIndicateur, name='nbr_indicateur'),
    path('api/prodagric/nbr_sousysteme',        views.nbrSousysteme, name='nbr_sousysteme'),
    path('api/prodagric/nbr_pays',              views.nbrPays, name='nbr_pays'),
    path('api/prodagric/indicateurItemByAnnee', views.indicateurItemByAnnee, name='indicateurItemByAnnee'),
    path('api/prodagric/getProdPays',           views.getProdPays, name='getProdPays')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)