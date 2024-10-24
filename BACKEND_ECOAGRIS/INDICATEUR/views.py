from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from PARAMS.models import *
from rest_framework.response import Response
from rest_framework          import status
from INDICATEUR.serializers import *
from PARAMS.serializers import *
from rest_framework.decorators import api_view

# Create your views here.


# View Indicateur
class IndicateurViewset(ModelViewSet):

    serializer_class = IndicateurSerializer

    # Ajoutons un attribut de classe qui nous permet de définir notre serializer de détail
    #detail_serializer_class = IndicateurDetailSerializer

    def get_queryset(self):
        return Indicateur.objects.all()

    #def get_serializer_class(self):
    # Si l'action demandée est retrieve nous retournons le serializer de détail
        #if self.action == 'retrieve':
            #return self.detail_serializer_class
        #return super().get_serializer_class()
    
    def create(self, request, *args, **kwargs):
        code = request.data["code"]
        libelle = request.data["libelle"]
        libelle_ang = request.data["libelle_ang"]
        responsable_collecte = request.data["responsable_collecte"]
        description = request.data["description"]
        description_ang = request.data["description_ang"]
        indicateur_CRA = request.data["indicateur_CRA"]
        composite = request.data["composite"]
        frequence = request.data["frequence"]
        unite = request.data["unite"]
        niveau = request.data["niveau"]
        sousysteme = request.data["sousysteme"]
        statut = request.data["statut"]
        calcule = request.data["calcule"]
        Indicateur.objects.create(code = code,
                            libelle = libelle,
                            libelle_ang = libelle_ang,
                            responsable_collecte = responsable_collecte,
                            description = description,
                            description_ang = description_ang,
                            indicateur_CRA = indicateur_CRA,
                            composite = composite,
                            formule = 'Formule',
                            frequence = Frequence.objects.get(id = int(request.data["frequence"])),
                            unite = Unite.objects.get(id = int(request.data["unite"])),
                            niveau = Niveau.objects.get(id = int(request.data["niveau"])),
                            sousysteme = Sousysteme.objects.get(id = int(request.data["sousysteme"])),
                            statut = statut,
                            calcule = calcule
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)


# ______View Indicateur List____________
class IndicateurListViewset(ModelViewSet):

    serializer_class = IndicateurListSerializer

    def get_queryset(self):
        return Indicateur.objects.all()

# View Variable
class VariableViewset(ModelViewSet):

    serializer_class = VariableSerializer

    #update_serializer_class = UpdateVariableSerializer

    def get_queryset(self):
        return Variable.objects.all()

    """ def get_serializer_class(self):
   
        if self.action == 'retreive':
            return self.update_serializer_class
        else:
            return self.serializer_class """

    def create(self, request, *args, **kwargs):
        code = request.data["code"]
        libelle = request.data["libelle"]
        libelle_ang = request.data["libelle_ang"]
        api_url = request.data["api_url"]
        sousysteme = request.data["sousysteme"]

        Variable.objects.create(code = code,
                            libelle = libelle,
                            libelle_ang = libelle_ang,
                            api_url = api_url,
                            sousysteme = Sousysteme.objects.get(id = int(request.data["sousysteme"]))
                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# _______View Variable List__________
class VariableListViewset(ModelViewSet):

    serializer_class = VariableListSerializer

    #update_serializer_class = UpdateVariableSerializer

    def get_queryset(self):
        return Variable.objects.all()

# View Relation Indicteur Variable
class IndicateurVariableViewset(ModelViewSet):

    serializer_class = IndicateurVariableSerializer

    def get_queryset(self):
        return IndicateurVariable.objects.all()

    def create(self, request, *args, **kwargs):
        indicateur = request.data["indicateur"]
        variable = request.data["variable"]
        IndicateurVariable.objects.create(indicateur = Indicateur.objects.get(id = int(request.data["indicateur"])),
                                          variable = Variable.objects.get(id = int(request.data["variable"])),

                            )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

# ________View Relation Indicteur Variable______
class IndicateurVariableListViewset(ModelViewSet):

    serializer_class = IndicateurVariableListSerializer()

    def get_queryset(self):
        return IndicateurVariable.objects.all()

# View Configuration Formule Indicateur
class IndicateurFormuleViewset(ModelViewSet):

    serializer_class = IndicateurFormuleSerializer

    def get_queryset(self):
        return Indicateur.objects.all()
    
    
    def create(self, request, *args, **kwargs):
        formule = request.data["formule"]
        
        Indicateur.objects.create(
                            formule = formule
                            )
        return Response("Modification effectué avec succés", status = status.HTTP_200_OK)


#---
class GetIndicateurBySousystemeViewset(ModelViewSet):

    queryset = Indicateur.objects.all()
    serializer_class = IndicateurSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs
     
        indicateur = Indicateur.objects.filter(sousysteme = params['pk'])

        serializer = IndicateurSerializer(indicateur, many = True)

        return Response(serializer.data)
    
#---
class GetVariableBySousystemeViewset(ModelViewSet):

    queryset = Variable.objects.all()
    serializer_class = VariableSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs
      
        indicateur = Variable.objects.filter(sousysteme = params['pk'])

        serializer = VariableSerializer(indicateur, many = True)

        return Response(serializer.data)

#---
class GetIndicVarByIndicateurViewset(ModelViewSet):

    queryset = IndicateurVariable.objects.all()
    serializer_class = IndicateurVariableSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs
      
        indicateur = IndicateurVariable.objects.filter(indicateur = params['pk'])

        serializer = IndicateurVariableSerializer(indicateur, many = True)

        return Response(serializer.data)
    

