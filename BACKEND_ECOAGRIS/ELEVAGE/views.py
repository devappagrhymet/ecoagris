from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework          import status
from ELEVAGE.serializers import *
from PRODAGRIC.serializers import *
from rest_framework.decorators import api_view
from django.db.models import Sum
from INDICATEUR.models import Indicateur
from DIVADMIN.models import DivisionAdministrative
import requests
from filter_and_pagination import FilterPagination


# Create your views here.  
# View des valeurs génerées des indicateurs   
class ElevageIndItemViewset(ModelViewSet):

    serializer_class = ElevageIndItemSerializer
    
    def get_queryset(self):
        return ElevageIndItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur_gen = request.data["valeur_gen"]
        speculation = request.data["speculation"]
        indicateur = request.data["indicateur"]
        debut_campagne = request.data["debut_campagne"]
        fin_campagne = request.data["fin_campagne"]
        divisionadministrative = request.data["divisionadministrative"]
        pays_id = request.data["pays_id"]
        valid_pfr = request.data["valid_pfr"]
        valid_pfp = request.data["valid_pfp"]
        public = request.data["public"]
    
        ElevageIndItem.objects.create(valeur_gen = valeur_gen,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            indicateur = Indicateur.objects.get(id = int(request.data["indicateur"])),
                            debut_campagne = debut_campagne,
                            fin_campagne = fin_campagne,
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            pays_id = pays_id,
                            valid_pfr = valid_pfr,
                            valid_pfp = valid_pfp,
                            public = public
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs génerées des indicateurs  
class ElevageIndItemListViewset(ModelViewSet):

    serializer_class = ElevageIndItemListSerializer

    def get_queryset(self):
        return ElevageIndItem.objects.all()

# View des valeurs  des variables  
class ElevageVarItemViewset(ModelViewSet):

    serializer_class = ElevageVarItemSerializer
    
    def get_queryset(self):
        return ElevageVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur = request.data["valeur"]
        speculation = request.data["speculation"]
        variable = request.data["variable"]
        debut_campagne = request.data["debut_campagne"]
        fin_campagne = request.data["fin_campagne"]
        divisionadministrative = request.data["divisionadministrative"]
        pays_id = request.data["pays_id"]
    
        ElevageVarItem.objects.create(valeur = valeur,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            variable = Variable.objects.get(id = int(request.data["variable"])),
                            debut_campagne = debut_campagne,
                            fin_campagne = fin_campagne,
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            pays_id = pays_id,
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs  des variables  
class ElevageVarItemListViewset(ModelViewSet):

    serializer_class = ElevageVarItemListSerializer

    def get_queryset(self):
        return ElevageVarItem.objects.all()
#---
#_______ELEVAGE BY PAYS___________________________________________
class GetElevageByPaysViewset(ModelViewSet):

    queryset = ElevageIndItem.objects.all()
    serializer_class = ElevageIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        """ req = ElevageIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, pays_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM elevage_elevageinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[2]+" AND indicateur_id = "+params_list[3]+" GROUP BY debut_campagne, fin_campagne, pays_id, speculation_id")

        serializer = ElevageIndItemListSerializer(req, many = True)


        return Response(serializer.data) """
        
        # result = ElevageIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        # serializer = ElevageIndItemListSerializer(result, many = True)

        # return Response(serializer.data)
        
        tmp = (ElevageIndItem.objects
                            .filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                            .annotate(Sum('valeur_gen'))
                            .order_by('debut_campagne')
            )
        
        serializer = ElevageIndItemListSerializer(tmp, many = True)

        return Response(serializer.data)
#_______ELEVAGE BY NIVEAU 1_______________________________________
class GetElevageByNiveau1Viewset(ModelViewSet):

    queryset = ElevageIndItem.objects.all()
    serializer_class = ElevageIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        req = ElevageIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, divisionadministrative_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM elevage_elevageinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[1]+" AND indicateur_id = "+params_list[2]+" GROUP BY debut_campagne, fin_campagne, divisionadministrative_id, speculation_id")

        serializer = ProdagricIndItemListSerializer(req, many = True)


        return Response(serializer.data)
        
        # """ result = ElevageIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        # serializer = ElevageIndItemListSerializer(result, many = True)

        # return Response(serializer.data) """
#_______ELEVAGE BY NIVEAU 2_______________________________________
class GetElevageByNiveau2Viewset(ModelViewSet):

    queryset = ElevageIndItem.objects.all()
    serializer_class = ElevageIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        """ req = ElevageIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, divisionadministrative_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM elevage_elevageinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[1]+" AND indicateur_id = "+params_list[2])

        serializer = ElevageIndItemListSerializer(req, many = True)


        return Response(serializer.data) """
        
        # result = ElevageIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        # serializer = ElevageIndItemListSerializer(result, many = True)

        # return Response(serializer.data)
        
        tmp = (ElevageIndItem.objects
                            .filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                            .order_by('debut_campagne')
            )
        
        serializer = ElevageIndItemListSerializer(tmp, many = True)
