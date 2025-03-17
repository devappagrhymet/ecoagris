from rest_framework import serializers
from POPULATION.models import *
from PARAMS.serializers import *
from INDICATEUR.serializers import *
from DIVADMIN.serializers import *
from PRODAGRIC.serializers import *


# Serializer des valeurs  des variables  
class PopVarItemSerializer(serializers.HyperlinkedModelSerializer):

    
    pays = DivisionAdministrativeSerializer()
    
    class Meta:
        model = PopVarItem
        fields = ["id","nombre_pop","annee","pays","date_created","date_updated"]
