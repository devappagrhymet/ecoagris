from rest_framework import serializers
from DIVADMIN.models import *

class ZoneDivisionAdministrativeSerializer(serializers.HyperlinkedModelSerializer):
    
    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.nomDivision
    
    zone = serializers.SerializerMethodField()

    def get_zone(self, obj):
        return obj.zone.nomZone

    class Meta:
        model = ZoneDivisionAdministrative
        fields = ["id","date_adhesion","date_sortie","divisionadministrative","zone","date_created","date_updated"]


class ZoneSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Zone
        fields = ["id","codeZone","nomZone","date_created","date_updated"]


class DivisionAdministrativeSerializer(serializers.HyperlinkedModelSerializer):

   
    class Meta:

        model = DivisionAdministrative

        fields = ["id","codeDivision","nomDivision","niveauDivision","libelleNiveauDivision","image","divisionadministrative_id","id_pays","bassin","date_created","date_updated"]


class BassinSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bassin
        fields = ["id","codeBassin","nomBassin","date_created","date_updated"]

class DivadminSerializer(serializers.HyperlinkedModelSerializer):
    
    bassin = serializers.StringRelatedField()

    def get_bassin(self, obj):
        return obj.bassin.id
    
    divisionadministrative = serializers.StringRelatedField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    class Meta:

        model = DivisionAdministrative

        fields = ["id","codeDivision","nomDivision","niveauDivision","libelleNiveauDivision","image","divisionadministrative","bassin","date_created","date_updated"]
