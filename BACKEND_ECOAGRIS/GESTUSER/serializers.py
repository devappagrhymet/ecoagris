from rest_framework import serializers
from GESTUSER.models import *
from DIVADMIN.serializers import DivadminSerializer




class FonctionnaliteSerializer(serializers.HyperlinkedModelSerializer):

    #privileges = PrivilegeSerializer(read_only=True, many=True)

    class Meta:
        model = Fonctionnalite
        fields = ["id","nomFct","descFct","date_created","date_updated"]


class ProfilSerializer(serializers.HyperlinkedModelSerializer):
    
    #privileges = PrivilegeSerializer(read_only=True, many=True)
    #users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Profil
        fields = ["id","nomProfil","descProfil","date_created","date_updated"]

class PrivilegeSerializer(serializers.HyperlinkedModelSerializer):

    profil = ProfilSerializer()

    fonctionnalite = FonctionnaliteSerializer()
    class Meta:
        model = Privilege
        fields = ["id","profil","fonctionnalite","create","read","update","delete","date_created","date_updated"]

class UserSerializer(serializers.HyperlinkedModelSerializer):

    profil = ProfilSerializer()

    divisionadministrative = DivadminSerializer()

    class Meta:
        model = User
        fields = ["id","nomUser","prenomUser","username","password","telephoneUser","emailUser","structureUser","departementUser","fonctionUser","statutUser","connecte","profil","divisionadministrative","photo_profil","date_created","date_updated"]

class LogSerializer(serializers.HyperlinkedModelSerializer):
    
    user = UserSerializer()
    class Meta:
        model = Log
        fields = ["id","user","action","date_created"]

#========Serializer permettant les mises a jour=============
class ConnectedUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["id","connecte"]

class UpdateUserSerializer(serializers.HyperlinkedModelSerializer):

    profil = serializers.SerializerMethodField()

    def get_profil(self, obj):
        return obj.profil.id

    divisionadministrative = serializers.SerializerMethodField()

    def get_divisionadministrative(self, obj):
        return obj.divisionadministrative.id
    class Meta:
        model = User
        fields = ["id","nomUser","prenomUser","username","password","telephoneUser","emailUser","structureUser","departementUser","fonctionUser","statutUser","connecte","profil","divisionadministrative","photo_profil"]

