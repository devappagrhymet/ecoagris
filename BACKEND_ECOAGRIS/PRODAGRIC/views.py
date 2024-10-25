from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.views import APIView
from PARAMS.models import *
from rest_framework.response import Response
from rest_framework          import status
from INDICATEUR.serializers import *
from PARAMS.serializers import *
from PRODAGRIC.serializers import *
from rest_framework.decorators import api_view
from django.db.models import Sum

from INDICATEUR.models import Indicateur
from PARAMS.models import Sousysteme
from DIVADMIN.models import DivisionAdministrative
import requests

# Create your views here.
# View des categories des produits agricoles 
class CategorieSpeViewset(ModelViewSet):

    serializer_class = CategorieSpeSerializer

    def get_queryset(self):
        return CategorieSpe.objects.all()
    
# View des valeurs  des variables  
class SpeculationViewset(ModelViewSet):

    serializer_class = SpeculationSerializer
    
    def get_queryset(self):
        return Speculation.objects.all()

    def create(self, request, *args, **kwargs):
        codeSpeculation = request.data["codeSpeculation"]
        nomSpeculation = request.data["nomSpeculation"]
        categoriespe = request.data["categoriespe"]
    
        Speculation.objects.create(codeSpeculation = codeSpeculation,
                                   nomSpeculation = nomSpeculation,
                                   categoriespe = CategorieSpe.objects.get(id = int(request.data["categoriespe"]))
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)
    
      
# View des valeurs génerées des indicateurs   
class ProdagricIndItemViewset(ModelViewSet):

    serializer_class = ProdagricIndItemSerializer
    
    def get_queryset(self):
        return ProdagricIndItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur_gen = request.data["valeur_gen"]
        speculation = request.data["speculation"]
        indicateur = request.data["indicateur"]
        campagne = request.data["campagne"]
        divisionadministrative = request.data["divisionadministrative"]
        pays_id = request.data["pays_id"]
        valid_pfr = request.data["valid_pfr"]
        valid_pfp = request.data["valid_pfp"]
        public = request.data["public"]
    
        ProdagricIndItem.objects.create(valeur_gen = valeur_gen,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            indicateur = Indicateur.objects.get(id = int(request.data["indicateur"])),
                            campagne = Campagne.objects.get(id = int(request.data["campagne"])),
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            pays_id = pays_id,
                            valid_pfr = valid_pfr,
                            valid_pfp = valid_pfp,
                            public = public
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs génerées des indicateurs  
class ProdagricIndItemListViewset(ModelViewSet):

    serializer_class = ProdagricIndItemListSerializer

    def get_queryset(self):
        return ProdagricIndItem.objects.all()

# View des valeurs  des variables  
class ProdagricVarItemViewset(ModelViewSet):

    serializer_class = ProdagricVarItemSerializer
    
    def get_queryset(self):
        return ProdagricVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur = request.data["valeur"]
        speculation = request.data["speculation"]
        variable = request.data["variable"]
        campagne = request.data["campagne"]
        divisionadministrative = request.data["divisionadministrative"]
        pays_id = request.data["pays_id"]
    
        ProdagricVarItem.objects.create(valeur = valeur,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            variable = Variable.objects.get(id = int(request.data["variable"])),
                            campagne = Campagne.objects.get(id = int(request.data["campagne"])),
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            pays_id = pays_id
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs  des variables  
class ProdagricVarItemListViewset(ModelViewSet):

    serializer_class = ProdagricVarItemListSerializer

    def get_queryset(self):
        return ProdagricVarItem.objects.all()
    

# Fonction qui retoune la variable Quantite de production d'une culture (speculation)
@api_view(['GET'])
def VarQuantiteProd(request, *args, **kwargs):
    
    r_options = []   
    
    """ campagne = request.query_params["campagne"]
    speculation = request.query_params["speculation"]
    pays = request.query_params["pays"] """
    
    campagne = request.query_params.get('campagne',None)
    speculation = request.query_params.get('speculation',None)
    pays = request.query_params.get('pays',None)
    
    # response = request.data.get("http://127.0.0.1:8020/api/prodagric/getProdagric/2024-9-12")
    r = requests.get('http://127.0.0.1:8020/api/prodagric/getProdagric/'+campagne+'-'+speculation+'-'+pays, data=request.GET)
    
        
    donnee = r.json()
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "data": []
        }

    return Response(r_options)

# Fonction qui retoune la variable Superficie cultivée d'une culture (speculation)
@api_view(['GET'])
def VarSuperficieCult(request, *args, **kwargs):
    
    r_options = []   
    
    campagne = request.query_params.get('campagne',None)
    speculation = request.query_params.get('speculation',None)
    pays = request.query_params.get('pays',None)
    
    r = requests.get('http://127.0.0.1:8020/api/prodagric/getProdagric/'+campagne+'-'+speculation+'-'+pays, data=request.GET)
    
        
    donnee = r.json()
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "data": []
        }

    return Response(r_options)

# Fonction qui genere et retourne le rendement d'une culture (speculation)
@api_view(['GET'])
def IndRendement(request, *args, **kwargs):
    
    r_options = [] 

    quantite = request.query_params.get('quantite',None)
    superficie = request.query_params.get('superficie',None)
    
    IndRendement:float  = 0
    
    IndRendement = float(quantite) / float(superficie)
    
    if (IndRendement > 0):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "result": IndRendement
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "result": []
        }

    return Response(r_options)


# 
class ProductionagricoleViewset(ModelViewSet):

    serializer_class = ProductionagricoleSerializer

    def get_queryset(self):
        return Productionagricole.objects.all()
    
#---
class GetProdagricViewset(ModelViewSet):

    queryset = ProdagricIndItem.objects.all()
    serializer_class = ProdagricIndItemListSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs

        params_list = params['pk'].split('-')
      
        prod = ProdagricIndItem.objects.filter(campagne = params_list[0],pays_id = params_list[1],indicateur = params_list[2])

        serializer = ProdagricIndItemListSerializer(prod, many = True)

        return Response(serializer.data)
  
        
# Nombre totales des données des indicateurs
@api_view(('GET',))
def nbrDataIndicateur(request, *args, **kwargs):
    
    r_options = [] 

    prod = ProdagricIndItem.objects.all().count()
    
    if (prod):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "result": prod
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "result": []
        }

    return Response(r_options)    

# Nombre totales des indicateurs
@api_view(('GET',))
def nbrIndicateur(request, *args, **kwargs):
    
    r_options = [] 

    ind = Indicateur.objects.all().count()
    
    if (ind):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "result": ind
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "result": []
        }

    return Response(r_options)    

# Nombre totales des sous-systemes
@api_view(('GET',))
def nbrSousysteme(request, *args, **kwargs):
    
    r_options = [] 

    sous = Sousysteme.objects.all().count()
    
    if (sous):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "result": sous
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "result": []
        }

    return Response(r_options) 

# Nombre totales des pays
@api_view(('GET',))
def nbrPays(request, *args, **kwargs):
    
    r_options = [] 

    sous = DivisionAdministrative.objects.filter(niveauDivision = 0).count()
    
    if (sous):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "result": sous
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "result": []
        }

    return Response(r_options)     


# Donnees indicateur par année
@api_view(('GET',))
def indicateurItemByAnnee(request, *args, **kwargs):
    
    r_options = [] 
    
    params_indicateur = request.query_params.get('params_indicateur',None)
    params_speculation = request.query_params.get('params_speculation',None)
    params_pays = request.query_params.get('params_pays',None)

    result = (ProdagricIndItem.objects
                            .values('campagne','indicateur')
                            .filter(indicateur=params_indicateur,speculation=params_speculation,pays_id=params_pays)
                            .annotate(valeur_gen=Sum('valeur_gen'))
                            .order_by('campagne')
            )
    
    if (result):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "result": result
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "result": []
        }

    return Response(r_options)  


#---
@api_view(('GET',))
def getProdPays(request, *args, **kwargs):
    
    r_options = [] 
    
    
    params_campagne = request.query_params.get('params_campagne',None)
    params_pays = request.query_params.get('params_pays',None)
    params_indicateur = request.query_params.get('params_indicateur',None)

    result = (ProdagricIndItem.objects
                            .values('id','campagne','indicateur','speculation','divisionadministrative')
                            .filter(campagne=params_campagne,pays_id=params_pays,indicateur=params_indicateur)
                            .annotate(valeur_gen=Sum('valeur_gen'))
                            .order_by('campagne')
            )
    
    if (result):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "result": result
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "result": []
        }

    return Response(r_options)  



# Detail View des valeurs génerées des indicateurs  
class AlphaViewset(ModelViewSet):

    serializer_class = ProdagricIndItemSerializer

    queryset = ProdagricIndItem.objects.all()
   

    def retrieve(self, request, *args, **kwargs):

        params = kwargs

        params_list = params['pk'].split('-')
      
        # prod = ProdagricIndItem.objects.filter(campagne = params_list[0],pays_id = params_list[1],indicateur = params_list[2])
        prod = (ProdagricIndItem.objects
                            .values('campagne','indicateur')
                            .filter(indicateur= params_list[0],speculation=params_list[1],pays_id=params_list[2])
                            .annotate(valeur_gen=Sum('valeur_gen'))
                            .order_by('campagne')
               )

        serializer = ProdagricIndItemSerializer(prod, many = True)

        return Response(serializer.data)
                                        
         
       

