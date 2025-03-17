from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework          import status
from STOCK.serializers import *
from PRODAGRIC.serializers import *
from rest_framework.decorators import api_view
from django.db.models import Sum
from INDICATEUR.models import Indicateur
from DIVADMIN.models import DivisionAdministrative
import requests
from filter_and_pagination import FilterPagination

# Create your views here.

# View des valeurs  des variables  
class StockVarItemViewset(ModelViewSet):

    serializer_class = StockVarItemSerializer
    
    def get_queryset(self):
        return StockVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        speculation = request.data["speculation"]
        stock_initiaux_paysan = request.data["stock_initiaux_paysan"]
        stock_finaux_paysan = request.data["stock_finaux_paysan"]
        stock_initiaux_inst = request.data["stock_initiaux_inst"]
        stock_finaux_inst = request.data["stock_finaux_inst"]
        stock_initiaux_autre = request.data["stock_initiaux_autre"]
        stock_finaux_autre = request.data["stock_finaux_autre"]
        unite = request.data["unite"]
        categorie_spe = request.data["categorie_spe"]
        debut_campagne = request.data["debut_campagne"]
        fin_campagne = request.data["fin_campagne"]
        pays = request.data["pays"]
    
        StockVarItem.objects.create(
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            stock_initiaux_paysan = stock_initiaux_paysan,
                            stock_finaux_paysan = stock_finaux_paysan,
                            stock_initiaux_inst = stock_initiaux_inst,
                            stock_finaux_inst = stock_finaux_inst,
                            stock_initiaux_autre = stock_initiaux_autre,
                            stock_finaux_autre = stock_finaux_autre,
                            unite = unite,
                            categorie_spe = categorie_spe,
                            debut_campagne = debut_campagne,
                            fin_campagne = fin_campagne,
                            pays = DivisionAdministrative.objects.get(id = int(request.data["pays"]))
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

class GetStockViewset(ModelViewSet):

    queryset = StockVarItem.objects.all()
    serializer_class = StockVarItemSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        
        tmp = (StockVarItem.objects
                        .filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays=params_list[2])
                        .order_by('debut_campagne')
            )
        
        serializer = StockVarItemSerializer(tmp, many = True)

        return Response(serializer.data)