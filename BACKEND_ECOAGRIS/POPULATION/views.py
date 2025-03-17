from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework          import status
from POPULATION.serializers import *
from PRODAGRIC.serializers import *
from rest_framework.decorators import api_view
from django.db.models import Sum
from INDICATEUR.models import Indicateur
from DIVADMIN.models import DivisionAdministrative
import requests
from filter_and_pagination import FilterPagination

# Create your views here.

# View des valeurs  des variables  
class PopVarItemViewset(ModelViewSet):

    serializer_class = PopVarItemSerializer
    
    def get_queryset(self):
        return PopVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        nombre_pop = request.data["nombre_pop"]
        annee = request.data["annee"]
        pays = request.data["pays"]
    
        PopVarItem.objects.create(
                            nombre_pop = nombre_pop,
                            annee = annee,
                            pays = DivisionAdministrative.objects.get(id = int(request.data["pays"]))
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)
    
class GetPopulationViewset(ModelViewSet):

    queryset = PopVarItem.objects.all()
    serializer_class = PopVarItemSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        
        tmp = (PopVarItem.objects
                        .filter(annee=params_list[0])
                        .order_by('annee')
            )
        
        serializer = PopVarItemSerializer(tmp, many = True)

        return Response(serializer.data)

