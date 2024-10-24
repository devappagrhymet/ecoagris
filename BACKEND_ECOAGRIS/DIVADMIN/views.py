from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from DIVADMIN.serializers import *
from DIVADMIN.models import *
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework          import status
# Create your views here.

class ZoneViewset(ModelViewSet):

    serializer_class = ZoneSerializer

    def get_queryset(self):
        return Zone.objects.all()
#---

class BassinViewset(ModelViewSet):

    serializer_class = BassinSerializer

    def get_queryset(self):
        return Bassin.objects.all()
#---
class DivisionAdministrativeViewset(ModelViewSet):

    queryset = DivisionAdministrative.objects.all()
    serializer_class = DivisionAdministrativeSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        codeDivision = request.data["codeDivision"]
        nomDivision = request.data["nomDivision"]
        niveauDivision = request.data["niveauDivision"]
        libelleNiveauDivision = request.data["libelleNiveauDivision"]
        bassin = request.data["bassin"]
        image = request.data["image"]
        divisionadministrative_id = request.data["divisionadministrative_id"]
        id_pays = request.data["id_pays"]
        bassin = request.data["bassin"]
        
        #======================================
        DivisionAdministrative.objects.create(codeDivision = codeDivision,
                                nomDivision = nomDivision,
                                niveauDivision = niveauDivision,
                                libelleNiveauDivision = libelleNiveauDivision,
                                image = image,
                                divisionadministrative_id = divisionadministrative_id,
                                id_pays = id_pays,
                                bassin = bassin
                            )
        return Response("Division administrative enregistrer avec succés", status = status.HTTP_200_OK)
#---

class ZoneDivisionAdministrativeViewset(ModelViewSet):

    queryset = ZoneDivisionAdministrative.objects.all()
    serializer_class = ZoneDivisionAdministrativeSerializer

    def create(self, request, *args, **kwargs):
        date_adhesion = request.data["date_adhesion"]
        date_sortie = request.data["date_sortie"]
        divisionadministrative = request.data["divisionadministrative"]
        zone = request.data["zone"]


        DivisionAdministrative.objects.create(date_adhesion = date_adhesion,
                                date_sortie = date_sortie,
                                divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                                zone = Zone.objects.get(id = int(request.data["zone"]))
                                 )
        return Response("Zone Division administrative enregistrer avec succés", status = status.HTTP_200_OK)
#---
class GetOneDivisionViewset(ModelViewSet):

    queryset = DivisionAdministrative.objects.all()
    serializer_class = DivisionAdministrativeSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs
        #params_list = params['pk']
        division = DivisionAdministrative.objects.filter(nomDivision = params['pk'])

        serializer = DivisionAdministrativeSerializer(division, many = True)

        return Response(serializer.data)
#---------Filtre liste des pays Niveau 0---------
class PaysListViewset(ModelViewSet):

    queryset = DivisionAdministrative.objects.all()
    serializer_class = DivadminSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs
        
        division = DivisionAdministrative.objects.filter(niveauDivision = params['pk'])

        serializer = DivadminSerializer(division, many = True)

        return Response(serializer.data)
#---------Filtre liste des autre division administrative Niveau 1 - 2---------
class DivadminListViewset(ModelViewSet):

    queryset = DivisionAdministrative.objects.all()
    serializer_class = DivadminSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs
        
        division = DivisionAdministrative.objects.filter(divisionadministrative_id = params['pk'])

        serializer = DivadminSerializer(division, many = True)

        return Response(serializer.data)