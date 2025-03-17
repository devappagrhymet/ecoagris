
from rest_framework import serializers
from PRODINDUST.models import *
from PARAMS.serializers import *
from INDICATEUR.serializers import *
from DIVADMIN.serializers import *
from PRODAGRIC.serializers import *


# Serializer des valeurs  des variables  
class ProdVarItemSerializer(serializers.HyperlinkedModelSerializer):

    speculation = SpeculationSerializer()
    
    pays = DivisionAdministrativeSerializer()
    
    class Meta:
        model = ProdVarItem
        fields = ["id","quantite_prod","unite","speculation","categorie_spe","debut_campagne","fin_campagne","pays","date_created","date_updated"]
