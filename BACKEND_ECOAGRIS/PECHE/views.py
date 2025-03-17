from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework          import status
from PECHE.serializers import *
from PRODAGRIC.serializers import *
from rest_framework.decorators import api_view
from django.db.models import Sum
from INDICATEUR.models import Indicateur
from DIVADMIN.models import DivisionAdministrative
import requests
from filter_and_pagination import FilterPagination


# Create your views here.  
# View des valeurs génerées des indicateurs   
class PecheIndItemViewset(ModelViewSet):

    serializer_class = PecheIndItemSerializer
    
    def get_queryset(self):
        return PecheIndItem.objects.all()

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
    
        PecheIndItem.objects.create(valeur_gen = valeur_gen,
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
class PecheIndItemListViewset(ModelViewSet):

    serializer_class = PecheIndItemListSerializer

    def get_queryset(self):
        return PecheIndItem.objects.all()

# View des valeurs  des variables  
class PecheVarItemViewset(ModelViewSet):

    serializer_class = PecheVarItemSerializer
    
    def get_queryset(self):
        return PecheVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur = request.data["valeur"]
        speculation = request.data["speculation"]
        variable = request.data["variable"]
        debut_campagne = request.data["debut_campagne"]
        fin_campagne = request.data["fin_campagne"]
        divisionadministrative = request.data["divisionadministrative"]
        pays_id = request.data["pays_id"]
    
        PecheVarItem.objects.create(valeur = valeur,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            variable = Variable.objects.get(id = int(request.data["variable"])),
                            debut_campagne = debut_campagne,
                            fin_campagne = fin_campagne,
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            pays_id = pays_id
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs  des variables  
class PecheVarItemListViewset(ModelViewSet):

    serializer_class = PecheVarItemListSerializer

    def get_queryset(self):
        return PecheVarItem.objects.all()
    
    
#---
class GetPecheViewset(ModelViewSet):

    serializer_class = PecheVarItemSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        queryset = FilterPagination.filter_and_pagination(request, PecheVarItem)

        params = kwargs

        params_list = params['pk'].split('-')
      
        prod = PecheVarItem.objects.filter(campagne = params_list[0],pays_id = params_list[1],indicateur = params_list[2])

       
        
        serialize_data = PecheVarItemSerializer(prod, many=True).data
        resultset = {'dataset': serialize_data, 'pagination': queryset['pagination']}

        return Response(resultset)



#_______PECHE BY PAYS___________________________________________
class GetPecheByPaysViewset(ModelViewSet):

    queryset = PecheIndItem.objects.all()
    serializer_class = PecheIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        # req = PecheIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, pays_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM peche_pecheinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[2]+" AND indicateur_id = "+params_list[3]+" GROUP BY debut_campagne, fin_campagne, pays_id, speculation_id")

        # serializer = PecheIndItemListSerializer(req, many = True)


        # return Response(serializer.data)
        
        """    result = PecheIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        serializer = PecheIndItemListSerializer(result, many = True)

        return Response(serializer.data) """
        
        tmp = (PecheIndItem.objects
                            .filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                            .annotate(Sum('valeur_gen'))
                            .order_by('debut_campagne')
            )
        
        serializer = PecheIndItemListSerializer(tmp, many = True)
        
        return Response(serializer.data)
        
#_______PECHE BY NIVEAU 1_______________________________________
class GetPecheByNiveau1Viewset(ModelViewSet):

    queryset = PecheIndItem.objects.all()
    serializer_class = PecheIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        req = PecheIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, pays_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM peche_pecheinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[2]+" AND indicateur_id = "+params_list[3]+" GROUP BY debut_campagne, fin_campagne, pays_id, speculation_id")

        serializer = ProdagricIndItemListSerializer(req, many = True)


        return Response(serializer.data)
        
        """  result = PecheIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        serializer = PecheIndItemListSerializer(result, many = True)

        return Response(serializer.data) """
#_______PECHE BY NIVEAU 2_______________________________________
class GetPecheByNiveau2Viewset(ModelViewSet):

    queryset = PecheIndItem.objects.all()
    serializer_class = PecheIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        # req = PecheIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, pays_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM peche_pecheinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[2]+" AND indicateur_id = "+params_list[3])

        # serializer = PecheIndItemListSerializer(req, many = True)


        # return Response(serializer.data)
        """    result = PecheIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        serializer = PecheIndItemListSerializer(result, many = True)

        return Response(serializer.data) """
        
        tmp = (PecheIndItem.objects
                            .filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                            .order_by('debut_campagne')
            )
        
        serializer = PecheIndItemListSerializer(tmp, many = True)
        
        return Response(serializer.data)
               