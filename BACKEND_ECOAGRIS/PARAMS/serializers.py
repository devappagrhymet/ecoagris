
from rest_framework import serializers
from PARAMS.models import *

class FrequenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Frequence
        fields = ["id","codeFreq","nomFreq","nomFreq_ang","date_created","date_updated"]

    """ def validate_codeFreq(self, value):
        if Frequence.objects.filter(codeFreq=value).exists():
            raise serializers.ValidationError('Code fréquence already exists')
        return value

    def validate_nomFreq(self, value):
        if Frequence.objects.filter(nomFreq=value).exists():
            raise serializers.ValidationError('Nom fréquence already exists')
        return value """

class UniteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unite
        fields = ["id","codeUnite","nomUnite","nomUnite_ang","date_created","date_updated"]

    """  def validate_codeUnite(self, value):
        if Unite.objects.filter(codeUnite=value).exists():
            raise serializers.ValidationError('Code unité already exists')
        return value

    def validate_nomUnite(self, value):
        if Unite.objects.filter(nomUnite=value).exists():
            raise serializers.ValidationError('Nom unité already exists')
        return value """

class CampagneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campagne
        fields = ["id","annee_debut","annee_fin","date_created","date_updated"]

    def validate_campagne(self, value):
        if Campagne.objects.filter(campagne=value).exists():
            raise serializers.ValidationError('Campagne unité already exists')
        return value

class NiveauSerializer(serializers.ModelSerializer):

    class Meta:
        model = Niveau
        fields = ["id","codeNiveau","nomNiveau","nomNiveau_ang","date_created","date_updated"]

    def validate_codeNiveau(self, value):
        if Niveau.objects.filter(codeNiveau=value).exists():
            raise serializers.ValidationError('Code niveau already exists')
        return value

    def validate_nomNiveau(self, value):
        if Niveau.objects.filter(nomNiveau=value).exists():
            raise serializers.ValidationError('Nom niveau already exists')
        return value

class SousystemeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sousysteme
        fields = ["id","codeSys","nomSys","nomSys_ang","date_created","date_updated"]

    """ def validate_codeSys(self, value):
        if Sousysteme.objects.filter(codeSys=value).exists():
            raise serializers.ValidationError('Code sous système already exists')
        return value

    def validate_nomSys(self, value):
        if Sousysteme.objects.filter(nomSys=value).exists():
            raise serializers.ValidationError('Nom sous système already exists')
        return value """