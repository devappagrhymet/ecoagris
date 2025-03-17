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
from django.db.models import Avg

from INDICATEUR.models import Indicateur
from PARAMS.models import Sousysteme
from DIVADMIN.models import DivisionAdministrative
import requests
from filter_and_pagination import FilterPagination
from MARCHE.models import *
from ELEVAGE.models import *
from PECHE.models import *
from PRODINDUST.models import *
from STOCK.models import *
from POPULATION.models import *

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
        debut_campagne = request.data["debut_campagne"]
        fin_campagne = request.data["fin_campagne"]
        divisionadministrative = request.data["divisionadministrative"]
        pays_id = request.data["pays_id"]
        valid_pfr = request.data["valid_pfr"]
        valid_pfp = request.data["valid_pfp"]
        public = request.data["public"]
    
        ProdagricIndItem.objects.create(valeur_gen = valeur_gen,
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
        speculation = request.data["produit"]
        categorie = request.data["categorie"]
        superficie_prod_agricole = request.data["superficie_prod_agricole"]
        unite_1 = request.data["unite_1"]
        rendement_prod_agricole = request.data["rendement_prod_agricole"]
        unite_2 = request.data["unite_2"]
        quantite_prod_agricole = request.data["quantite_prod_agricole"]
        unite_3 = request.data["unite_3"]
        debut_campagne = request.data["debut_campagne"]
        fin_campagne = request.data["fin_campagne"]
        divisionadministrative = request.data["divisionadministrative"]
        pays_id = request.data["pays_id"]
    
        ProdagricVarItem.objects.create(speculation = Speculation.objects.get(id = int(request.data["produit"])),
                            categorie = categorie,
                            superficie_prod_agricole = superficie_prod_agricole,
                            unite_1 = unite_1,
                            rendement_prod_agricole = rendement_prod_agricole,
                            unite_2 = unite_2,
                            quantite_prod_agricole = quantite_prod_agricole,
                            unite_3 = unite_3,
                            debut_campagne = debut_campagne,
                            fin_campagne = fin_campagne,
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
    
    #IndRendement = eval(quantite / superficie)
    
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

   
#---
class GetProdagricViewset(ModelViewSet):

    #queryset = ProdagricIndItem.objects.all()
    serializer_class = ProdagricIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        queryset = FilterPagination.filter_and_pagination(request, ProdagricIndItem)

        params = kwargs

        params_list = params['pk'].split('-')
      
        prod = ProdagricIndItem.objects.filter(debut_campagne = params_list[0], fin_campagne = params_list[1],pays_id = params_list[2],indicateur = params_list[3])

        #serializer = ProdagricIndItemListSerializer(prod, many = True)
        
        serialize_data = ProdagricIndItemListSerializer(prod, many=True).data
        resultset = {'dataset': serialize_data, 'pagination': queryset['pagination']}

        return Response(resultset)
#_______PRODAGRIC BY PAYS - DONNEES___________________________________________
class GetProductionByPaysViewset(ModelViewSet):

    queryset = ProdagricVarItem.objects.all()
    serializer_class = ProdagricVarItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        r_options = []
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        # req = ProdagricIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, pays_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM prodagric_prodagricinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[2]+" AND indicateur_id = "+params_list[3]+" GROUP BY debut_campagne, fin_campagne, pays_id, speculation_id")
       
        
        #__old result = ProdagricIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        # serializer = ProdagricIndItemListSerializer(req, many = True)

        # return Response(serializer.data)
    
        tmp = (ProdagricVarItem.objects
                            .filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2])
                            .order_by('debut_campagne')
            )
        
        serializer = ProdagricVarItemListSerializer(tmp, many = True)

        return Response(serializer.data)
        
        """ if (result):
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

        return Response(r_options) """
    
#_______PRODAGRIC BY PAYS - INDICATEUR___________________________________________
class GetProdagricIndicateurViewset(ModelViewSet):

    queryset = ProdagricIndItem.objects.all()
    serializer_class = ProdagricIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        tmp = ProdagricIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur=params_list[3])
              
        serializer = ProdagricIndItemListSerializer(tmp, many = True)

        return Response(serializer.data)

#_______PRODAGRIC BY NIVEAU 1_______________________________________
class GetProductionByNiveau1Viewset(ModelViewSet):

    queryset = ProdagricIndItem.objects.all()
    serializer_class = ProdagricIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        # result = ProdagricIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        # serializer = ProdagricIndItemListSerializer(result, many = True)

        # return Response(serializer.data)
        
        req = ProdagricIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, pays_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM prodagric_prodagricinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[2]+" AND indicateur_id = "+params_list[3]+" GROUP BY debut_campagne, fin_campagne, pays_id, speculation_id")

        serializer = ProdagricIndItemListSerializer(req, many = True)


        return Response(serializer.data)
#_______PRODAGRIC BY NIVEAU 2_______________________________________
class GetProductionByNiveau2Viewset(ModelViewSet):

    queryset = ProdagricIndItem.objects.all()
    serializer_class = ProdagricIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        # result = ProdagricIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        # serializer = ProdagricIndItemListSerializer(result, many = True)

        # return Response(serializer.data)
        
        """ req = ProdagricIndItem.objects.raw("SELECT id, debut_campagne, fin_campagne, indicateur_id, pays_id, speculation_id, SUM(valeur_gen) as valeur_gen FROM prodagric_prodagricinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[2]+" AND indicateur_id = "+params_list[3])

        serializer = ProdagricIndItemListSerializer(req, many = True)


        return Response(serializer.data) """
        
        tmp = (ProdagricIndItem.objects
                            .filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                            .order_by('debut_campagne')
            )
        
        serializer = ProdagricIndItemListSerializer(tmp, many = True)

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
    
    
    params_debut_campagne = request.query_params.get('params_debut_campagne',None)
    params_fin_campagne = request.query_params.get('params_fin_campagne',None)
    params_pays = request.query_params.get('params_pays',None)
    params_indicateur = request.query_params.get('params_indicateur',None)

    result = (ProdagricIndItem.objects
                            .values('id','campagne','indicateur','speculation','divisionadministrative')
                            .filter(debut_campagne=params_debut_campagne,fin_campagne=params_fin_campagne,pays_id=params_pays,indicateur=params_indicateur)
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
    
                                        
         
# Fonction qui recupere la Superficie, la Quantite, le Rendement dans PREGEC_BILAN_ALIMENTAIRE
@api_view(['GET'])
def getDataProductionAgricole(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
    
    # 172.16.15.206
    # 154.127.90.197                
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeProductionAgricole?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    
    donnee = r.json()
    
    nbrExistData = ProdagricVarItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)  

#_____________________________MARCHE AGRICOLE____________________________________
# Fonction qui recupere le prix des produits agricoles
@api_view(['GET'])
def getDataMarcheAgricole(request, *args, **kwargs):
    
    r_options = []   
    
    annee = request.query_params.get('annee',None)
    
    pays = request.query_params.get('pays',None)
    
    type = request.query_params.get('type',None)
    
    r = requests.get('http://127.0.0.1:8020/api/marche/marche_agricole_data/'+annee+'-'+pays+'-'+type)
    donnee = r.json()
    
    nbrExistData = MarchAgricVarItem.objects.filter(annee=annee,type_prix=type,pays_id=pays).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)  



#_____________________________MARCHE  betail____________________________________
# Fonction qui recupere le prix du betail 
@api_view(['GET'])
def getDataMarcheBetail(request, *args, **kwargs):
    
    r_options = []   
    
    annee = request.query_params.get('annee',None)
    
    pays = request.query_params.get('pays',None)
    
    
    r = requests.get('http://127.0.0.1:8020/api/marche/marche_betail_data/'+annee+'-'+pays)
    donnee = r.json()
   
    nbrExistData = MarchBetailIndItem.objects.filter(annee=annee,pays_id=pays).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)  


#_____________________________ELEVAGE____________________________________                       
# Fonction qui recupere la production viande dans PREGEC_BILAN_ALIMENTAIRE
@api_view(['GET'])
def getDataProductionViande(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
    indicateur= request.query_params.get('indicateur',None)
    
    # 172.16.15.206
    # 154.127.90.197    
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeProductionViande?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    
    donnee = r.json()
    #_______________________
    nbrExistData = ElevageIndItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays,indicateur=indicateur).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)


# Fonction qui recupere la production oeuf dans PREGEC_BILAN_ALIMENTAIRE
@api_view(['GET'])
def getDataProductionOeuf(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
    indicateur= request.query_params.get('indicateur',None)
                      
    # 172.16.15.206
    # 154.127.90.197  
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeProductionOeuf?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    
    donnee = r.json()
    #_______________________
    nbrExistData = ElevageIndItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays,indicateur=indicateur).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options) 


# Fonction qui recupere la production laitiere dans PREGEC_BILAN_ALIMENTAIRE
@api_view(['GET'])
def getDataProductionLaitiere(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
    indicateur= request.query_params.get('indicateur',None)
                      
    # 172.16.15.206
    # 154.127.90.197
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeProductionLaitiere?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    
    donnee = r.json()
    #_______________________
    nbrExistData = ElevageIndItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays,indicateur=indicateur).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options) 


#_____________________________PECHE____________________________________      
                   
# Fonction qui recupere la production peche dans PREGEC_BILAN_ALIMENTAIRE
@api_view(['GET'])
def getDataProductionPeche(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
    
    # 172.16.15.206
    # 154.127.90.197
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeCapturePeche?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    
    #print("http://172.16.15.206/app_pregec/api/index.php/listeCapturePeche?annee_debut="+annee_debut+"&annee_fin="+annee_fin+"&pays="+pays)
    
    donnee = r.json()
   
    nbrExistData = PecheIndItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)  


#_____________________________COMEXT___________________________________       
@api_view(['GET'])
def getDataImport(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
    indicateur= request.query_params.get('indicateur',None)
    
    # 172.16.15.206
    # 154.127.90.197
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeImport?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    
    donnee = r.json()
   
    nbrExistData = ComextVarItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays,variable=8).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)  



@api_view(['GET'])
def getDataExport(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
    indicateur= request.query_params.get('indicateur',None)
    
    # 172.16.15.206
    # 154.127.90.197
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeExport?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    donnee = r.json()
   
    nbrExistData = ComextVarItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays,variable=9).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)  


#_____________________________ELEVAGE CHEPTEL___________________________________       
@api_view(['GET'])
def getDataCheptel(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
    indicateur= request.query_params.get('indicateur',None)
    
    
    #r = requests.get('http://172.16.15.206/app_pregec/api/index.php/listeCheptel?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    r = requests.get('http://172.16.15.206/app_pregec/api/index.php/listeCheptel?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    donnee = r.json()
   
    nbrExistData = ElevageIndItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays,indicateur=indicateur).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)  

#==================================================================================
#================Calcule des indicateur Marche - Import / Export===================
#==================================================================================
#================Variables Marche - Import / Export===================
#==================================================================================
#-----------------Importation Zone CEDEAO + Autre anne n ------------------------
#-----------------Importation Zone CEDEAO + Autre anne n-1 ----------------------
#-----------------Valeur des Importation Zone CEDEAO par pays -------------------
#-----------------Importation Zone CEDEAO ---------------------------------------
#-----------------Importation Autres --------------------------------------------
@api_view(['GET'])

def TauxCroiAnImportation(request, *args, **kwargs):
    
    r_options = [] 
    
    annee_n = request.query_params.get('params_annee',None)
    annee_n_1 = int(annee_n) - 1
    
    importation_n = (ComextIndItem.objects
                        .values('debut_campagne')
                        .filter(debut_campagne=annee_n)
                        .annotate(valeur_gen=Sum('valeur_gen'))
                    )
    
    print('Somme importation n : '+int(importation_n["valeur_gen"]))
    # IndRendement:float  = 0
    
    # IndRendement = float(quantite) / float(superficie)
    
    #IndRendement = eval(quantite / superficie)
    
    if (importation_n):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "result": importation_n
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "result": []
        }

    return Response(r_options)



#_____________________________PRODUCTION INDUSTRIELLE___________________________________       
@api_view(['GET'])
def getDataProductionIndus(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
   
    # 172.16.15.206
    # 154.127.90.197
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeIndustrielle?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    
    donnee = r.json()
   
    nbrExistData = ProdVarItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)


#_____________________________STOCK___________________________________       
@api_view(['GET'])
def getDataStock(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
   
    
    # 172.16.15.206
    # 154.127.90.197
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listeStocks?annee_debut='+annee_debut+'&annee_fin='+annee_fin+'&pays='+pays)
    
    #r = requests.get('http://172.16.15.206/app_pregec/api/index.php/listeStocks')
    donnee = r.json()
   
    nbrExistData = StockVarItem.objects.filter(debut_campagne=annee_debut,fin_campagne=annee_fin,pays_id=pays).count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)



#_____________________________POPULATION___________________________________       
@api_view(['GET'])
def getDataPopulation(request, *args, **kwargs):
    
    r_options = []   
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
   
    
    
    r = requests.get('http://154.127.90.197/app_pregec/api/index.php/listePopulation')
    donnee = r.json()
   
    nbrExistData = PopVarItem.objects.filter().count()
    
    if (donnee):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": donnee
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)




#===========================Calcule des indicateurs Production Agricole===========#
# Fonction qui retourne la superficie, le rendement et la production
@api_view(['GET'])
def fetchProdagric(request, *args, **kwargs):
    
    r_options = [] 
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
   
    
    tmp = ProdagricVarItem.objects.filter(debut_campagne = annee_debut,fin_campagne = annee_fin, pays_id = pays)
    
    serializer = ProdagricVarItemListSerializer(tmp, many = True)

    #return Response(serializer.data)
    
    nbrExistData = ProdagricVarItem.objects.filter(debut_campagne = annee_debut,fin_campagne = annee_fin, pays_id = pays).count()
    
    if (serializer.data):
        r_options = {
            "message": "Données disponible",
            "status": status.HTTP_200_OK,
            "nbrExistData": nbrExistData,
            "data": serializer.data
        }
    else:
        r_options = {
            "message": "Données non disponible",
            "status": status.HTTP_404_NOT_FOUND,
            "nbrExistData": nbrExistData,
            "data": []
        }

    return Response(r_options)

# Fonction qui retourne la quantité de la production cerealiere
@api_view(['GET'])
def productionCereale(request, *args, **kwargs):
    
    r_options = [] 
    
    annee_debut = request.query_params.get('annee_debut',None)
    annee_fin = request.query_params.get('annee_fin',None)
    pays = request.query_params.get('pays',None)
   
    
    result = (ProdagricVarItem.objects
                            .values('debut_campagne','fin_campagne','divisionadministrative','pays_id')
                            .filter(debut_campagne = annee_debut,fin_campagne = annee_fin, pays_id = pays, categorie = 1)
                            .annotate(quantite_production=Sum('quantite_prod_agricole'))
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

    



#===========================Calcule des indicateurs Marche Agricole & Betail ===========#
# Fonction qui retourne la le prix moyen des produits agricoles
@api_view(('GET',))
def indicateurPrixConsommateur(request, *args, **kwargs):
    
    # http://127.0.0.1:8000/api/marche/marche_prix_consommateur?params_annee=2009&params_pays=12&params_variable=3
    
    r_options = [] 
    
    params_variable = request.query_params.get('params_variable',None)
    params_annee = request.query_params.get('params_annee',None)
    params_pays = request.query_params.get('params_pays',None)

    result = (MarchAgricVarItem.objects
                            .values('annee','speculation','type_prix','code_devise','pays_id')
                            .filter(annee=params_annee,pays_id=params_pays,variable=params_variable)
                            .annotate(prix=Avg('valeur'))
                            .order_by('speculation')
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


# Fonction qui retourne la le prix moyen du betail
@api_view(('GET',))
def indicateurPrixBetail(request, *args, **kwargs):
    
    # http://127.0.0.1:8000/api/marche/marche_prix_betail?params_annee=2009&params_pays=12&params_variable=15
    
    r_options = [] 
    
    params_variable = request.query_params.get('params_variable',None)
    params_annee = request.query_params.get('params_annee',None)
    params_pays = request.query_params.get('params_pays',None)

    result = (MarchBetailVarItem.objects
                            .values('annee','speculation','type_prix','code_devise','pays_id')
                            .filter(annee=params_annee,pays_id=params_pays,variable=params_variable)
                            .annotate(prix=Avg('valeur'))
                            .order_by('speculation')
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



#===========================Calcule des indicateurs Import / Export ===========#
# Fonction qui retourne la valeur totale des importations ou exportations d'un pays
@api_view(['GET'])
def valeurTotalImportExport(request, *args, **kwargs):
    
    r_options = [] 
    
    params_type = request.query_params.get('params_type',None)
    params_annee = request.query_params.get('params_annee',None)
    #params_pays = request.query_params.get('params_pays',None)

    result = (ComextVarItem.objects
                            .values('debut_campagne','fin_campagne','type','devise','pays_id')
                            .filter(fin_campagne=params_annee,type=params_type)
                            .annotate(valeur=Sum('valeur'))
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

# Fonction qui retourne la quantite totale des importations ou exportations d'un pays
@api_view(['GET'])
def quantiteTotalImportExport(request, *args, **kwargs):
    
    r_options = [] 
    
    params_type = request.query_params.get('params_type',None)
    params_annee = request.query_params.get('params_annee',None)
    #params_pays = request.query_params.get('params_pays',None)

    result = (ComextVarItem.objects
                            .values('debut_campagne','fin_campagne','type','devise','pays_id')
                            .filter(fin_campagne=params_annee,type=params_type)
                            .annotate(quantite=Sum('quantite'))
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


# Fonction qui retourne la valeur totale des importations ou exportations de tous les pays
@api_view(['GET'])
def valeurTotalImportExportAllCountries(request, *args, **kwargs):
    
    r_options = [] 
    
    params_type = request.query_params.get('params_type',None)
    params_annee = request.query_params.get('params_annee',None)
    #params_pays = request.query_params.get('params_pays',None)

    result = (ComextVarItem.objects
                            .values('debut_campagne','fin_campagne','type','devise')
                            .filter(fin_campagne=params_annee,type=params_type)
                            .annotate(valeur=Sum('valeur'))
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

# Fonction qui retourne la quantite totale des importations ou exportations de tous les pays
@api_view(['GET'])
def quantiteTotalImportExportAllCountries(request, *args, **kwargs):
    
    r_options = [] 
    
    params_type = request.query_params.get('params_type',None)
    params_annee = request.query_params.get('params_annee',None)
    #params_pays = request.query_params.get('params_pays',None)

    result = (ComextVarItem.objects
                            .values('debut_campagne','fin_campagne','type','devise')
                            .filter(fin_campagne=params_annee,type=params_type)
                            .annotate(quantite=Sum('quantite'))
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

