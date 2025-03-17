from rest_framework import serializers
from PRODAGRIC.models import *
from PARAMS.serializers import *
from INDICATEUR.serializers import *
from DIVADMIN.serializers import *

# Serializer des categories des produits agricoles
class CategorieSpeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = CategorieSpe
        fields = ["id","codeCategorie","nomCategorie","date_created","date_updated"]
        
# Serializer des produits agricoles
class SpeculationSerializer(serializers.HyperlinkedModelSerializer):

    categoriespe = serializers.SerializerMethodField()

    def get_categoriespe(self, obj):
        return obj.categoriespe.nomCategorie


    class Meta:
        model = Speculation
        fields = ["id","codeSpeculation","nomSpeculation","categoriespe","date_created","date_updated"]
        
# Serializer des valeurs génerées des indicateurs          
class ProdagricIndItemSerializer(serializers.HyperlinkedModelSerializer):
    
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
        model = ProdagricIndItem
        fields = ["id","valeur_gen","speculation","indicateur","debut_campagne","fin_campagne","divisionadministrative","pays_id","valid_pfr","valid_pfp","public","date_created","date_updated"]

# Detail Serializer des valeurs génerées des indicateurs          
class ProdagricIndItemListSerializer(serializers.HyperlinkedModelSerializer):
    
    speculation = SpeculationSerializer()


    indicateur =  IndicateurSerializer()
    

    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = ProdagricIndItem
        fields = ["id","valeur_gen","speculation","indicateur","debut_campagne","fin_campagne","divisionadministrative","pays_id","valid_pfr","valid_pfp","date_created","date_updated"]


# Serializer données de la production agricole
class ProdagricVarItemSerializer(serializers.HyperlinkedModelSerializer):

    speculation = serializers.SerializerMethodField()

    def get_speculation(self, obj):
        return obj.speculation.id
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    class Meta:
        model = ProdagricVarItem
        fields = ["id","speculation","categorie","superficie_prod_agricole","unite_1","rendement_prod_agricole","unite_2","quantite_prod_agricole","unite_3","debut_campagne","fin_campagne","divisionadministrative","pays_id","date_created","date_updated"]

# Detail Serializer données de la production agricole 
class ProdagricVarItemListSerializer(serializers.HyperlinkedModelSerializer):

    speculation = SpeculationSerializer()
    
    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = ProdagricVarItem
        fields = ["id","speculation","categorie","superficie_prod_agricole","unite_1","rendement_prod_agricole","unite_2","quantite_prod_agricole","unite_3","debut_campagne","fin_campagne","divisionadministrative","pays_id","date_created","date_updated"]
