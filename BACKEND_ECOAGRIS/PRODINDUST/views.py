from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework          import status
from PRODINDUST.serializers import *
from PRODAGRIC.serializers import *
from rest_framework.decorators import api_view
from django.db.models import Sum
from INDICATEUR.models import Indicateur
from DIVADMIN.models import DivisionAdministrative
import requests
from filter_and_pagination import FilterPagination

# Create your views here.

# View des valeurs  des variables  
class ProdVarItemViewset(ModelViewSet):

    serializer_class = ProdVarItemSerializer
    
    def get_queryset(self):
        return ProdVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        quantite_prod = request.data["quantite_prod"]
        unite = request.data["unite"]
        speculation = request.data["speculation"]
        categorie_spe = request.data["categorie_spe"]
        debut_campagne = request.data["debut_campagne"]
        fin_campagne = request.data["fin_campagne"]
        pays = request.data["pays"]
    
        ProdVarItem.objects.create(quantite_prod = quantite_prod,
                            unite = unite,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            categorie_spe = categorie_spe,
                            debut_campagne = debut_campagne,
                            fin_campagne = fin_campagne,
                            pays = DivisionAdministrative.objects.get(id = int(request.data["pays"]))
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)
    
class GetProdIndusViewset(ModelViewSet):

    queryset = ProdVarItem.objects.all()
    serializer_class = ProdVarItemSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        
        tmp = (ProdVarItem.objects
                        .filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays=params_list[2])
                        .order_by('debut_campagne')
            )
        
        serializer = ProdVarItemSerializer(tmp, many = True)

        return Response(serializer.data)
