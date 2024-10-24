from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from PARAMS.serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework          import status
from rest_framework.decorators import api_view

# Create your views here.
class FrequenceViewset(ModelViewSet):

    serializer_class = FrequenceSerializer

    def get_queryset(self):
        return Frequence.objects.all()

    def create(self, request, *args, **kwargs):
        codeFreq = request.data["codeFreq"]
        nomFreq = request.data["nomFreq"]
        nomFreq_ang = request.data["nomFreq_ang"]
        Frequence.objects.create(codeFreq = codeFreq,
                                nomFreq = nomFreq,
                                nomFreq_ang = nomFreq_ang
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

class UniteViewset(ModelViewSet):

    serializer_class = UniteSerializer

    def get_queryset(self):
        return Unite.objects.all()

    def create(self, request, *args, **kwargs):
        codeUnite = request.data["codeUnite"]
        nomUnite = request.data["nomUnite"]
        nomUnite_ang = request.data["nomUnite_ang"]
        Unite.objects.create(codeUnite = codeUnite,
                            nomUnite = nomUnite,
                            nomUnite_ang = nomUnite_ang
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

class CampagneViewset(ModelViewSet):

    serializer_class = CampagneSerializer

    def get_queryset(self):
        return Campagne.objects.all()

class NiveauViewset(ModelViewSet):

    serializer_class = NiveauSerializer

    def get_queryset(self):
        return Niveau.objects.all()

    def create(self, request, *args, **kwargs):
        codeNiveau = request.data["codeNiveau"]
        nomNiveau = request.data["nomNiveau"]
        nomNiveau_ang = request.data["nomNiveau_ang"]
        Niveau.objects.create(codeNiveau = codeNiveau,
                            nomNiveau = nomNiveau,
                            nomNiveau_ang = nomNiveau_ang
                            )

class SousystemeViewset(ModelViewSet):

    serializer_class = SousystemeSerializer
    # lister les permissions à avoir pour pouvoir manipuler
    # les objets de type fournisseur
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Sousysteme.objects.all()
    
    def create(self, request, *args, **kwargs):
        codeSys = request.data["codeSys"]
        nomSys = request.data["nomSys"]
        nomSys_ang = request.data["nomSys_ang"]
        Sousysteme.objects.create(codeSys = codeSys,
                                nomSys = nomSys,
                                nomSys_ang = nomSys_ang
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

