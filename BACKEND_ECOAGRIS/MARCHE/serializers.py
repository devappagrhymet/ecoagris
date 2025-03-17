from rest_framework import serializers
from MARCHE.models import *
from PARAMS.serializers import *
from INDICATEUR.serializers import *
from DIVADMIN.serializers import *
from PRODAGRIC.serializers import *

   
# Serializer des valeurs génerées des indicateurs          
class MarchAgricIndItemSerializer(serializers.HyperlinkedModelSerializer):
    
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
        model = MarchAgricIndItem
        fields = ["id","valeur_gen","mois","annee","speculation","indicateur","code_devise","divisionadministrative","niveau1_id","pays_id","valid_pfr","valid_pfp","public","date_created","date_updated"]

# Detail Serializer des valeurs génerées des indicateurs          
class MarchAgricIndItemListSerializer(serializers.HyperlinkedModelSerializer):
    
    speculation = SpeculationSerializer()


    indicateur =  IndicateurSerializer()

    
    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = MarchAgricIndItem
        fields = ["id","valeur_gen","mois","annee","speculation","indicateur","code_devise","divisionadministrative","niveau1_id","pays_id","valid_pfr","valid_pfp","public","date_created","date_updated"]


# Serializer des valeurs  des variables  
class MarchAgricVarItemSerializer(serializers.HyperlinkedModelSerializer):

    speculation = serializers.SerializerMethodField()

    def get_speculation(self, obj):
        return obj.speculation.id
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    class Meta:
        model = MarchAgricVarItem
        fields = ["id","valeur","mois","annee","speculation","variable","nom_marche","type_prix","code_unite","code_devise","divisionadministrative","niveau1_id","pays_id","date_created","date_updated"]

# Detail Serializer des valeurs  des variables  
class MarchAgricVarItemListSerializer(serializers.HyperlinkedModelSerializer):

    speculation = SpeculationSerializer()
    

    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = MarchAgricVarItem
        fields = ["id","valeur","mois","annee","speculation","variable","nom_marche","type_prix","code_unite","code_devise","divisionadministrative","niveau1_id","pays_id","date_created","date_updated"]
#=================Betail=======================
   
# Serializer des valeurs génerées des indicateurs          
class MarchBetailIndItemSerializer(serializers.HyperlinkedModelSerializer):
    
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
        model = MarchBetailIndItem
        fields = ["id","valeur_gen","mois","annee","speculation","indicateur","espece","code_devise","divisionadministrative","niveau1_id","pays_id","valid_pfr","valid_pfp","public","date_created","date_updated"]

# Detail Serializer des valeurs génerées des indicateurs          
class MarchBetailIndItemListSerializer(serializers.HyperlinkedModelSerializer):
    
    speculation = SpeculationSerializer()


    indicateur =  IndicateurSerializer()

    
    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = MarchBetailIndItem
        fields = ["id","valeur_gen","mois","annee","speculation","indicateur","espece","code_devise","divisionadministrative","niveau1_id","pays_id","valid_pfr","valid_pfp","public","date_created","date_updated"]


# Serializer des valeurs  des variables  
class MarchBetailVarItemSerializer(serializers.HyperlinkedModelSerializer):

    speculation = serializers.SerializerMethodField()

    def get_speculation(self, obj):
        return obj.speculation.id
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    class Meta:
        model = MarchBetailVarItem
        fields = ["id","valeur","mois","annee","speculation","variable","nom_marche","type_prix","code_unite","code_devise","divisionadministrative","niveau1_id","pays_id","date_created","date_updated"]

# Detail Serializer des valeurs  des variables  
class MarchBetailVarItemListSerializer(serializers.HyperlinkedModelSerializer):

    speculation = SpeculationSerializer()
    
    
    divisionadministrative = DivisionAdministrativeSerializer()
    
    class Meta:
        model = MarchBetailVarItem
        fields = ["id","valeur","mois","annee","speculation","variable","nom_marche","type_prix","code_unite","code_devise","divisionadministrative","niveau1_id","pays_id","date_created","date_updated"]



#=================COMEXT=======================
# Serializer des types COMEXT
# Serializer des categories des produits agricoles
class ProduitComextSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ProduitComext
        fields = ["id","codeProduit","nomProduit","nomProduit_ang","date_created","date_updated"]

        
# Serializer des valeurs génerées des indicateurs COMEXT         
class ComextIndItemSerializer(serializers.HyperlinkedModelSerializer):
    
    
    indicateur = serializers.SerializerMethodField()

    def get_indicateur(self, obj):
        return obj.indicateur.id
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    
    class Meta:
        model = ComextIndItem
        fields = ["id","valeur_gen","unite_devise","indicateur", "annee","type","divisionadministrative","valid_pfr","valid_pfp","public","date_created","date_updated"]


# Detail Serializer des valeurs génerées des indicateurs COMEXT         
class ComextIndItemListSerializer(serializers.HyperlinkedModelSerializer):
    
    indicateur = IndicateurListSerializer()

    
    divisionadministrative = DivisionAdministrativeSerializer()

  
    class Meta:
        model = ComextIndItem
        fields = ["id","valeur_gen","unite_devise","indicateur", "annee","type","divisionadministrative","valid_pfr","valid_pfp","public","date_created","date_updated"]



# Serializer des valeurs  des variables  
class ComextVarItemSerializer(serializers.HyperlinkedModelSerializer):

    produit = serializers.SerializerMethodField()

    def get_produit(self, obj):
        return obj.produit.id
    
    variable = serializers.SerializerMethodField()

    def get_variable(self, obj):
        return obj.variable.id
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    
    class Meta:
        model = ComextVarItem
        fields = ["id","valeur","devise","quantite","produit","variable","debut_campagne", "fin_campagne","divisionadministrative","type","provenance","destination","pays_id","date_created","date_updated"]


# DetailSerializer des valeurs  des variables  
class ComextVarItemListSerializer(serializers.HyperlinkedModelSerializer):

    produit = ProduitComextSerializer()
    
    variable = VariableSerializer()
    

    divisionadministrative = DivadminSerializer()
    
    class Meta:
        model = ComextVarItem
        fields = ["id","valeur","devise","quantite","produit","variable","debut_campagne", "fin_campagne","divisionadministrative","type","provenance","destination","pays_id","date_created","date_updated"]

