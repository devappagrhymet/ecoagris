from rest_framework import serializers
from INDICATEUR.models import *
from DIVADMIN.serializers import DivisionAdministrativeSerializer
from PARAMS.serializers import *


#Serializer des indicateurs
class IndicateurSerializer(serializers.HyperlinkedModelSerializer):

    frequence = serializers.SerializerMethodField()

    def get_frequence(self, obj):
        return obj.frequence.id

    unite = serializers.SerializerMethodField()

    def get_unite(self, obj):
        return obj.unite.codeUnite

    niveau = serializers.SerializerMethodField()

    def get_niveau(self, obj):
        return obj.niveau.id

    sousysteme = serializers.SerializerMethodField()

    def get_sousysteme(self, obj):
        return obj.sousysteme.id
    class Meta:
        model = Indicateur
        fields = ["id","code","libelle","libelle_ang","responsable_collecte","description","description_ang","indicateur_CRA","composite","formule","frequence","unite","niveau","sousysteme","statut","calcule","date_created","date_updated"]

#Serializer configuration indicateur
class IndicateurFormuleSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Indicateur
        fields = ["id","formule"]


#___Detail Serializer des indicateurs____
class IndicateurListSerializer(serializers.HyperlinkedModelSerializer):

    frequence = FrequenceSerializer()

    unite = UniteSerializer()

    niveau = NiveauSerializer()

    sousysteme = SousystemeSerializer()
    
    class Meta:
        model = Indicateur
        fields = ["id","code","libelle","libelle_ang","responsable_collecte","description","description_ang","indicateur_CRA","composite","formule","frequence","unite","niveau","sousysteme","statut","calcule","date_created","date_updated"]


""" class IndicateurListSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Indicateur
        fields = ["id","code","libelle","libelle_anglais","date_created","date_updated"]

    def validate_code(self, value):
        if Indicateur.objects.filter(code=value).exists():
            raise serializers.ValidationError('Code indicateur already exists')
        return value

    def validate_libelle(self, value):
        if Indicateur.objects.filter(libelle=value).exists():
            raise serializers.ValidationError('Libelle indicateur already exists')
        return value """

""" lass IndicateurDetailSerializer(serializers.HyperlinkedModelSerializer):

    frequence = serializers.StringRelatedField()

    def get_frequence(self, obj):
        return obj.frequence.codeFreq

    unite = serializers.StringRelatedField()

    def get_unite(self, obj):
        return obj.unite.codeUnite

    niveau = serializers.StringRelatedField()

    def get_niveau(self, obj):
        return obj.niveau.codeNiveau

    sousysteme = serializers.StringRelatedField()

    def get_sousysteme(self, obj):
        return obj.sousysteme.codeSys
    class Meta:
        model = Indicateur
        fields = ["id","code","libelle","libelle_anglais","description","description_anglais","indicateur_CRA","composite","formule","frequence","unite","niveau","sousysteme","date_created","date_updated"]

    def validate_code(self, value):
        if Indicateur.objects.filter(code=value).exists():
            raise serializers.ValidationError('Code indicateur already exists')
        return value

    def validate_libelle(self, value):
        if Indicateur.objects.filter(libelle=value).exists():
            raise serializers.ValidationError('Libelle indicateur already exists')
        return value """

#Serializer des variables
class VariableSerializer(serializers.HyperlinkedModelSerializer):

    sousysteme = serializers.SerializerMethodField()

    def get_sousysteme(self, obj):
        return obj.sousysteme.id
    
    class Meta:
        model = Variable
        fields = ["id","code","libelle","libelle_ang","api_url","sousysteme","date_created","date_updated"]

    

#___Detail Serializer des variables___
class VariableListSerializer(serializers.HyperlinkedModelSerializer):

    sousysteme = SousystemeSerializer()

    class Meta:
        model = Variable
        fields = ["id","code","libelle","libelle_ang","api_url","sousysteme","date_created","date_updated"]
        
    def validate_code(self, value):
        if Variable.objects.filter(code=value).exists():
            raise serializers.ValidationError('Code variable already exists')
        return value

    def validate_libelle(self, value):
        if Variable.objects.filter(libelle=value).exists():
            raise serializers.ValidationError('Libelle variable already exists')
        return value

#Serializer des indicateurs variables     
class IndicateurVariableSerializer(serializers.HyperlinkedModelSerializer):

    indicateur = IndicateurSerializer()
    
    variable = VariableSerializer()

    class Meta:
        model = IndicateurVariable
        fields = ["id","indicateur","variable","date_created","date_updated"]

#___Detail Serializer des indicateurs variables_____     
class IndicateurVariableListSerializer(serializers.HyperlinkedModelSerializer):
    
    
    indicateur = IndicateurSerializer()
    
    variable = VariableSerializer()

    class Meta:
        model = IndicateurVariable
        fields = ["id","indicateur","variable","date_created","date_updated"]

