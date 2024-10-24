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
    
    campagne = serializers.SerializerMethodField()

    def get_campagne(self, obj):
        return obj.campagne.id
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    class Meta:
        model = ProdagricIndItem
        fields = ["id","valeur_gen","speculation","indicateur","campagne","divisionadministrative","pays_id","valid_pfr","valid_pfp","public","date_created","date_updated"]

# Detail Serializer des valeurs génerées des indicateurs          
class ProdagricIndItemListSerializer(serializers.HyperlinkedModelSerializer):
    
    speculation = SpeculationSerializer()

    

    indicateur =  IndicateurSerializer()
    
    campagne =   CampagneSerializer()
    
    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = ProdagricIndItem
        fields = ["id","valeur_gen","speculation","indicateur","campagne","divisionadministrative","pays_id","valid_pfr","valid_pfp","date_created","date_updated"]


# Serializer des valeurs  des variables  
class ProdagricVarItemSerializer(serializers.HyperlinkedModelSerializer):

    speculation = serializers.SerializerMethodField()

    def get_speculation(self, obj):
        return obj.speculation.id
    
    variable = serializers.SerializerMethodField()

    def get_variable(self, obj):
        return obj.variable.id
    
    campagne = serializers.SerializerMethodField()

    def get_campagne(self, obj):
        return obj.campagne.id
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    class Meta:
        model = ProdagricVarItem
        fields = ["id","valeur","speculation","variable","campagne","divisionadministrative","pays_id","date_created","date_updated"]

# Detail Serializer des valeurs  des variables  
class ProdagricVarItemListSerializer(serializers.HyperlinkedModelSerializer):

    speculation = SpeculationSerializer()
    
    variable = VariableSerializer()
    
    campagne =   CampagneSerializer()
    
    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = ProdagricVarItem
        fields = ["id","valeur","speculation","variable","campagne","divisionadministrative","pays_id","date_created","date_updated"]

# Serializer des categories des produits agricoles
class ProductionagricoleSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Productionagricole
        fields = ["id","superficie_production_agricole","rendement_production_agricole","quantite_production_agricole","source_production_agricole","campagne_production_agricole","annee_production_agricole","pays_production_agricole","methode_production_agricole","statut_production_agricole","produit_id","bilan_id","divisionadministrative_id","created_by","modified_by","created_at","modified_at"]