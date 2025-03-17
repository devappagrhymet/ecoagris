from rest_framework import serializers
from PECHE.models import *
from PARAMS.serializers import *
from INDICATEUR.serializers import *
from DIVADMIN.serializers import *
from PRODAGRIC.serializers import *


# Serializer des valeurs génerées des indicateurs          
class PecheIndItemSerializer(serializers.HyperlinkedModelSerializer):
    
    speculation = serializers.SerializerMethodField()

    def get_speculation(self, obj):
        return obj.speculation.id

    indicateur = serializers.SerializerMethodField()

    def get_indicateur(self, obj):
        return obj.indicateur.id
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    class Meta:
        model = PecheIndItem
        fields = ["id","valeur_gen","speculation","indicateur","debut_campagne","fin_campagne","divisionadministrative","niveau_1","pays_id","valid_pfr","valid_pfp","public","date_created","date_updated"]

# Detail Serializer des valeurs génerées des indicateurs          
class PecheIndItemListSerializer(serializers.HyperlinkedModelSerializer):
    
    speculation = SpeculationSerializer()

    indicateur =  IndicateurSerializer()
    
    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = PecheIndItem
        fields = ["id","valeur_gen","speculation","indicateur","debut_campagne","fin_campagne","divisionadministrative","niveau_1","pays_id","valid_pfr","valid_pfp","public","date_created","date_updated"]


# Serializer des valeurs  des variables  
class PecheVarItemSerializer(serializers.HyperlinkedModelSerializer):

    speculation = serializers.SerializerMethodField()

    def get_speculation(self, obj):
        return obj.speculation.id
    
    variable = serializers.SerializerMethodField()

    def get_variable(self, obj):
        return obj.variable.id
    
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    class Meta:
        model = PecheVarItem
        fields = ["id","valeur","speculation","variable","debut_campagne","fin_campagne","divisionadministrative","pays_id","date_created","date_updated"]

# Detail Serializer des valeurs  des variables  
class PecheVarItemListSerializer(serializers.HyperlinkedModelSerializer):

    speculation = SpeculationSerializer()
    
    variable = VariableSerializer()
    
    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = PecheVarItem
        fields = ["id","valeur","speculation","variable","debut_campagne","fin_campagne","divisionadministrative","pays_id","date_created","date_updated"]
