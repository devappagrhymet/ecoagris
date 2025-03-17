from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.views import APIView
from PARAMS.models import *
from rest_framework.response import Response
from rest_framework          import status
from INDICATEUR.serializers import *
from PARAMS.serializers import *
from MARCHE.serializers import *
from rest_framework.decorators import api_view
from django.db.models import Sum

from INDICATEUR.models import Indicateur
from PARAMS.models import Sousysteme
from DIVADMIN.models import DivisionAdministrative
import requests
from filter_and_pagination import FilterPagination

# Create your views here.

# View des valeurs génerées des indicateurs   
class MarchAgricIndItemViewset(ModelViewSet):

    serializer_class = MarchAgricIndItemSerializer
    
    def get_queryset(self):
        return MarchAgricIndItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur_gen = request.data["valeur_gen"]
        mois = request.data["mois"]
        annee = request.data["annee"]
        speculation = request.data["speculation"]
        indicateur = request.data["indicateur"]
        code_devise = request.data["code_devise"]
        divisionadministrative = request.data["divisionadministrative"]
        niveau1_id = request.data["niveau1_id"]
        pays_id = request.data["pays_id"]
        valid_pfr = request.data["valid_pfr"]
        valid_pfp = request.data["valid_pfp"]
        public = request.data["public"]
    
        MarchAgricIndItem.objects.create(valeur_gen = valeur_gen,
                            mois = mois,
                            annee = annee,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            indicateur = Indicateur.objects.get(id = int(request.data["indicateur"])),
                            code_devise = code_devise,
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            niveau1_id = niveau1_id,
                            pays_id = pays_id,
                            valid_pfr = valid_pfr,
                            valid_pfp = valid_pfp,
                            public = public
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs génerées des indicateurs  
class MarchAgricIndItemListViewset(ModelViewSet):

    serializer_class = MarchAgricIndItemListSerializer

    def get_queryset(self):
        return MarchAgricIndItem.objects.all()

# View des valeurs  des variables  
class MarchAgricVarItemViewset(ModelViewSet):

    serializer_class = MarchAgricVarItemSerializer
    
    def get_queryset(self):
        return MarchAgricVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur = request.data["valeur"]
        mois = request.data["mois"]
        annee = request.data["annee"]
        speculation = request.data["speculation"]
        variable = request.data["variable"]
        nom_marche = request.data["nom_marche"]
        type_prix = request.data["type_prix"]
        code_unite = request.data["code_unite"]
        code_devise = request.data["code_devise"]
        divisionadministrative = request.data["divisionadministrative"]
        niveau1_id = request.data["niveau1_id"]
        pays_id = request.data["pays_id"]
    
        MarchAgricVarItem.objects.create(valeur = valeur,
                            mois = mois,
                            annee = annee,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            variable = variable,
                            nom_marche =  nom_marche,
                            type_prix =   type_prix,
                            code_unite =  code_unite,
                            code_devise = code_devise,
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            niveau1_id = niveau1_id,
                            pays_id = pays_id
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs  des variables  
class MarchAgricVarItemListViewset(ModelViewSet):

    serializer_class = MarchAgricVarItemListSerializer

    def get_queryset(self):
        return MarchAgricVarItem.objects.all()

#_______MARCHEAGRICOLE BY PAYS___________________________________________
""" class GetMarcheAgricolePaysViewset(ModelViewSet):

    queryset = MarchAgricIndItem.objects.all()
    serializer_class = MarchAgricIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        r_options = []
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        tmp = (MarchAgricIndItem.objects
                            .filter(annee=params_list[0],pays_id=params_list[1],type_prix=params_list[2])
                            .annotate(Sum('valeur_gen'))
                            .order_by('annee')
            )
        
        serializer = MarchAgricIndItemListSerializer(tmp, many = True)

        return Response(serializer.data) """

#__________________________Betail_____________________


# ______Suivi des prix du betail ind______   
class MarchBetailIndItemViewset(ModelViewSet):

    serializer_class = MarchBetailIndItemSerializer
    
    def get_queryset(self):
        return MarchBetailIndItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur_gen = request.data["valeur_gen"]
        mois = request.data["mois"]
        annee = request.data["annee"]
        speculation = request.data["speculation"]
        indicateur = request.data["indicateur"]
        espece = request.data["espece"]
        divisionadministrative = request.data["divisionadministrative"]
        niveau1_id = request.data["niveau1_id"]
        pays_id = request.data["pays_id"]
        valid_pfr = request.data["valid_pfr"]
        valid_pfp = request.data["valid_pfp"]
        public = request.data["public"]
    
        MarchBetailIndItem.objects.create(valeur_gen = valeur_gen,
                            mois = mois,
                            annee = annee,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            indicateur = Indicateur.objects.get(id = int(request.data["indicateur"])),
                            espece = espece,
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            niveau1_id = niveau1_id,
                            pays_id = pays_id,
                            valid_pfr = valid_pfr,
                            valid_pfp = valid_pfp,
                            public = public
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

#  ______Detail Suivi des prix du betail ind______   
class MarchBetailIndItemListViewset(ModelViewSet):

    serializer_class = MarchBetailIndItemListSerializer

    def get_queryset(self):
        return MarchBetailIndItem.objects.all()

# Betail var
class MarchBetailVarItemViewset(ModelViewSet):

    serializer_class = MarchBetailVarItemSerializer
    
    def get_queryset(self):
        return MarchBetailVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur = request.data["valeur"]
        mois = request.data["mois"]
        annee = request.data["annee"]
        speculation = request.data["speculation"]
        variable = request.data["variable"]
        nom_marche = request.data["nom_marche"]
        type_prix = request.data["type_prix"]
        code_unite = request.data["code_unite"]
        code_devise = request.data["code_devise"]
        divisionadministrative = request.data["divisionadministrative"]
        niveau1_id = request.data["niveau1_id"]
        pays_id = request.data["pays_id"]
    
        MarchBetailVarItem.objects.create(valeur = valeur,
                            mois = mois,
                            annee = annee,
                            speculation = Speculation.objects.get(id = int(request.data["speculation"])),
                            variable = variable,
                            nom_marche =  nom_marche,
                            type_prix =   type_prix,
                            code_unite =  code_unite,
                            code_devise = code_devise,
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            pays_id = pays_id
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail Betail var 
class MarchBetailVarItemListViewset(ModelViewSet):

    serializer_class = MarchBetailVarItemListSerializer

    def get_queryset(self):
        return MarchAgricVarItem.objects.all()

#_______MARCHE betail BY PAYS___________________________________________
""" class GetMarcheBetailPaysViewset(ModelViewSet):

    queryset = MarchBetailIndItem.objects.all()
    serializer_class = MarchBetailIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        r_options = []
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        tmp = (MarchBetailIndItem.objects
                            .filter(annee=params_list[0],pays_id=params_list[1])
                            .annotate(Sum('valeur_gen'))
                            .order_by('annee')
            )
        
        serializer = MarchBetailIndItemListSerializer(tmp, many = True)

        return Response(serializer.data) """
#---
""" class GetMarchagricViewset(ModelViewSet):

    #queryset = ProdagricIndItem.objects.all()
    serializer_class = MarchAgricIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        queryset = FilterPagination.filter_and_pagination(request, MarchAgricIndItem)

        params = kwargs

        params_list = params['pk'].split('-')
      
        prod = MarchAgricIndItem.objects.filter(campagne = params_list[0],pays_id = params_list[1],indicateur = params_list[2])

        #serializer = ProdagricIndItemListSerializer(prod, many = True)
        
        serialize_data = MarchAgricIndItemListSerializer(prod, many=True).data
        resultset = {'dataset': serialize_data, 'pagination': queryset['pagination']}

        return Response(resultset)
         """

#==============================COMEXT============
# View des valeurs  des variables  
class ProduitComextViewset(ModelViewSet):

    serializer_class = ProduitComextSerializer
    
    def get_queryset(self):
        return ProduitComext.objects.all()

    def create(self, request, *args, **kwargs):
        codeProduit = request.data["codeProduit"]
        nomProduit = request.data["nomProduit"]
        nomProduit_ang = request.data["nomProduit_ang"]
    
        ProduitComext.objects.create(codeProduit = codeProduit,
                                      nomProduit = nomProduit_ang,
                                      nomProduit_ang = nomProduit_ang
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# View des valeurs génerées des indicateurs   
class ComextIndItemViewset(ModelViewSet):

    serializer_class = ComextIndItemSerializer
    
    def get_queryset(self):
        return ComextIndItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur_gen = request.data["valeur_gen"]
        unite_devise = request.data["unite_devise"]
        indicateur = request.data["indicateur"]
        annee = request.data["annee"]
        type = request.data["type"]
        divisionadministrative = request.data["divisionadministrative"]
        valid_pfr = request.data["valid_pfr"]
        valid_pfp = request.data["valid_pfp"]
        public = request.data["public"]
        
    
        ComextIndItem.objects.create(valeur_gen = valeur_gen,
                                     unite_devise = unite_devise,
                                     indicateur = Indicateur.objects.get(id = int(request.data["indicateur"])),
                                     annee = annee,
                                     type  = type,
                                     divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                                     valid_pfr = valid_pfr,
                                     valid_pfp = valid_pfp,
                                     public = public
                                )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs génerées des indicateurs  
class ComextIndItemListViewset(ModelViewSet):

    serializer_class = ComextIndItemListSerializer

    def get_queryset(self):
        return ComextIndItem.objects.all()

# View des valeurs  des variables  
class ComextVarItemViewset(ModelViewSet):

    serializer_class = ComextVarItemSerializer
    
    def get_queryset(self):
        return ComextVarItem.objects.all()

    def create(self, request, *args, **kwargs):
        valeur = request.data["valeur"]
        devise = request.data["devise"]
        quantite = request.data["quantite"]
        produit = request.data["produit"]
        variable = request.data["variable"]
        debut_campagne = request.data["debut_campagne"]
        fin_campagne = request.data["fin_campagne"]
        divisionadministrative = request.data["divisionadministrative"]
        type = request.data["type"]
        provenance = request.data["provenance"]
        destination = request.data["destination"]
        pays_id = request.data["pays_id"]
        
    
        ComextVarItem.objects.create(valeur = valeur,
                                     devise = devise,
                                     quantite = quantite,
                                     produit = ProduitComext.objects.get(id = int(request.data["produit"])),
                                     variable = Variable.objects.get(id = int(request.data["variable"])),
                                     debut_campagne =  debut_campagne,
                                     fin_campagne = fin_campagne,
                                     divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                                     type = type,
                                     provenance = provenance,
                                     destination = destination,
                                     pays_id = pays_id
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# Detail View des valeurs  des variables  
class ComextVarItemListViewset(ModelViewSet):

    serializer_class = ComextVarItemListSerializer

    def get_queryset(self):
        return ComextVarItem.objects.all()
    
#---
class GetComExtViewset(ModelViewSet):

    serializer_class = ComextIndItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        queryset = FilterPagination.filter_and_pagination(request, ComextIndItem)

        params = kwargs

        params_list = params['pk'].split('-')
      
        prod = ComextIndItem.objects.filter(campagne = params_list[0],pays_id = params_list[1],indicateur = params_list[2])

        
        serialize_data = ComextIndItemListSerializer(prod, many=True).data
        resultset = {'dataset': serialize_data, 'pagination': queryset['pagination']}

        return Response(resultset)
      
       
#_______COMEXT BY PAYS___________________________________________
class GetImportExportByPaysViewset(ModelViewSet):

    queryset = ComextVarItem.objects.all()
    serializer_class = ComextVarItemListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        # req = ComextIndItem.objects.raw("SELECT * FROM marche_comextinditem WHERE debut_campagne="+params_list[0]+" AND fin_campagne="+params_list[1]+" AND pays_id = "+params_list[2]+" AND indicateur_id = "+params_list[3])

        # serializer = ComextIndItemListSerializer(req, many = True)


        # return Response(serializer.data)
        
        """ result = ComextIndItem.objects.filter(debut_campagne=params_list[0],fin_campagne=params_list[1],pays_id=params_list[2],indicateur_id=params_list[3])
                           
        serializer = ComextIndItemListSerializer(result, many = True)

        return Response(serializer.data) """
        
        tmp = ComextVarItem.objects.filter(fin_campagne=params_list[0],pays_id=params_list[1],type=params_list[2])
                          
        serializer = ComextVarItemListSerializer(tmp, many = True)
        
        return Response(serializer.data)



       
#_______MARCHE AGRICOLE BY PAYS___________________________________________
class GetMarcheAgricoleByPaysViewset(ModelViewSet):

    queryset = MarchAgricVarItem.objects.all()
    serializer_class = MarchAgricVarItemListSerializer
   
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        result = MarchAgricVarItem.objects.filter(annee=params_list[0],pays_id=params_list[1],variable=params_list[2])
                           
        serializer = MarchAgricVarItemListSerializer(result, many = True)

        return Response(serializer.data) 

class GetIndicateurAgricoleByPaysViewset(ModelViewSet):

    queryset = MarchAgricIndItem.objects.all()
    serializer_class = MarchAgricIndItemListSerializer
   
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        result = MarchAgricIndItem.objects.filter(annee=params_list[0],pays_id=params_list[1],indicateur=params_list[2])
                           
        serializer = MarchAgricIndItemListSerializer(result, many = True)

        return Response(serializer.data) 
        

#_______MARCHE BETAIL BY PAYS___________________________________________
class GetMarcheBetailByPaysViewset(ModelViewSet):

    queryset = MarchBetailVarItem.objects.all()
    serializer_class = MarchBetailVarItemListSerializer
   
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        result = MarchBetailVarItem.objects.filter(annee=params_list[0],pays_id=params_list[1])
                           
        serializer = MarchBetailVarItemListSerializer(result, many = True)

        return Response(serializer.data) 
    
class GetIndicateurBetailByPaysViewset(ModelViewSet):

    queryset = MarchBetailIndItem.objects.all()
    serializer_class = MarchBetailIndItemListSerializer
   
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        result = MarchBetailIndItem.objects.filter(annee=params_list[0],pays_id=params_list[1])
                           
        serializer = MarchBetailIndItemListSerializer(result, many = True)

        return Response(serializer.data)
        
class GetIndicateurComextViewset(ModelViewSet):

    queryset = ComextIndItem.objects.all()
    serializer_class = ComextIndItemListSerializer
   
    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs

        params_list = params['pk'].split('-')
        
        result = ComextIndItem.objects.filter(annee=params_list[0],indicateur=params_list[1])
                           
        serializer = ComextIndItemListSerializer(result, many = True)

        return Response(serializer.data)


