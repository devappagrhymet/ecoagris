from rest_framework import serializers
from STOCK.models import *
from PARAMS.serializers import *
from INDICATEUR.serializers import *
from DIVADMIN.serializers import *
from PRODAGRIC.serializers import *


# Serializer des valeurs  des variables  
class StockVarItemSerializer(serializers.HyperlinkedModelSerializer):

    speculation = SpeculationSerializer()
    
    pays = DivisionAdministrativeSerializer()
    
    class Meta:
        model = StockVarItem
        fields = ["id","speculation","stock_initiaux_paysan","stock_finaux_paysan","stock_initiaux_inst","stock_finaux_inst","stock_initiaux_autre","stock_finaux_autre","unite","categorie_spe","debut_campagne","fin_campagne","pays","date_created","date_updated"]
