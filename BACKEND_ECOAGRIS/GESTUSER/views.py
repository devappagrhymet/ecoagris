from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers  import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework          import status
from DIVADMIN.models import DivisionAdministrative


from GESTUSER.models      import *
from GESTUSER.serializers import *

# Create your views here.
class LogViewset(ModelViewSet):

    queryset = Log.objects.all()
    serializer_class = LogSerializer

    def create(self, request, *args, **kwargs):
        user = request.data["user"]
        action = request.data["action"]


        Log.objects.create(user = User.objects.get(id = int(request.data["user"])),
                           action = action
                          )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)
#---
class PrivilegeViewset(ModelViewSet):

    queryset = Privilege.objects.all()
    serializer_class = PrivilegeSerializer

    def create(self, request, *args, **kwargs):
        profil = request.data["profil"]
        fonctionnalite = request.data["fonctionnalite"]
        create = request.data["create"]
        read = request.data["read"]
        update = request.data["update"]
        delete = request.data["delete"]

        Privilege.objects.create(profil = Profil.objects.get(id = int(request.data["profil"])),
                                 fonctionnalite = Fonctionnalite.objects.get(id = int(request.data["fonctionnalite"])),
                                 create = create,
                                 read = read,
                                 update = update,
                                 delete = delete
                          )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)
#---
class UserViewset(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        nomUser = request.data["nomUser"]
        prenomUser = request.data["prenomUser"]
        username = request.data["username"]
        password = request.data["password"]
        telephoneUser = request.data["telephoneUser"]
        emailUser = request.data["emailUser"]
        structureUser = request.data["structureUser"]
        departementUser = request.data["departementUser"]
        fonctionUser = request.data["fonctionUser"]
        statutUser = request.data["statutUser"]
        connecte = request.data["connecte"]
        profil = request.data["profil"]
        divisionadministrative = request.data["divisionadministrative"]
        photo_profil = request.data["photo_profil"]
        first_connect = request.data["first_connect"]
        

        User.objects.create(nomUser = nomUser,
                            prenomUser = prenomUser,
                            username = username,
                            password = password,
                            telephoneUser = telephoneUser,
                            emailUser = emailUser,
                            structureUser = structureUser,
                            departementUser = departementUser,
                            fonctionUser = fonctionUser,
                            statutUser = statutUser,
                            connecte = bool(request.data["connecte"]),
                            profil = Profil.objects.get(id = int(request.data["profil"])),
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            photo_profil = photo_profil,
                            first_connect = first_connect
                           
                          )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)
#---
class FonctionnaliteViewset(ModelViewSet):

    queryset = Fonctionnalite.objects.all()
    serializer_class = FonctionnaliteSerializer

    def create(self, request, *args, **kwargs):
        nomFct = request.data["nomFct"]
        descFct = request.data["descFct"]


        Fonctionnalite.objects.create(nomFct = nomFct,
                                      descFct = descFct
                                    )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)

#---
class ProfilViewset(ModelViewSet):

    queryset = Profil.objects.all()
    serializer_class = ProfilSerializer

    def create(self, request, *args, **kwargs):
        nomProfil = request.data["nomProfil"]
        descProfil = request.data["descProfil"]


        Profil.objects.create(nomProfil = nomProfil,
                              descProfil = descProfil
                             )
        return Response("Enregistrement effectué avec succés", status = status.HTTP_200_OK)
#---
#***************************
class GetUserViewset(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs
        params_list = params['pk'].split('-')
        user = User.objects.filter(username = params_list[0],password = params_list[1])

        serializer = UserSerializer(user, many = True)

        return Response(serializer.data)

#
class GetPrivilegeViewset(ModelViewSet):

    queryset = Privilege.objects.all()
    serializer_class = PrivilegeSerializer

    def retrieve(self, request, *args, **kwargs):
        
        params = kwargs
        params_list = params['pk'].split('-')
        user = Privilege.objects.filter(profil = params_list[0],fonctionnalite = params_list[1])

        serializer = PrivilegeSerializer(user, many = True)

        return Response(serializer.data)
#
class GetOneProfilViewset(ModelViewSet):


    queryset = Profil.objects.all()
    serializer_class = ProfilSerializer

    def retrieve(self, request, *args, **kwargs):

        params = kwargs
        #params_list = params['pk']
        profil = Profil.objects.filter(nomProfil = params['pk'])

        serializer = ProfilSerializer(profil, many = True)

        return Response(serializer.data)
#========Serializer permettant les mises a jour=============
class ConnectedUserViewset(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = ConnectedUserSerializer

    def create(self, request, *args, **kwargs):
        connecte = request.data["connecte"]

        User.objects.create(connecte = connecte)
        return Response("Mise a jour effectué avec succés", status = status.HTTP_200_OK)

class UpdateUserViewset(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer

    def update(self, request, *args, **kwargs):
        nomUser = request.data["nomUser"]
        prenomUser = request.data["prenomUser"]
        username = request.data["username"]
        password = request.data["password"]
        telephoneUser = request.data["telephoneUser"]
        emailUser = request.data["emailUser"]
        structureUser = request.data["structureUser"]
        departementUser = request.data["departementUser"]
        fonctionUser = request.data["fonctionUser"]
        statutUser = request.data["statutUser"]
        connecte = request.data["connecte"]
        profil = request.data["profil"]
        divisionadministrative = request.data["divisionadministrative"]
        photo_profil = request.data["photo_profil"]
       

        User.objects.update(nomUser = nomUser,
                            prenomUser = prenomUser,
                            username = username,
                            password = password,
                            telephoneUser = telephoneUser,
                            emailUser = emailUser,
                            structureUser = structureUser,
                            departementUser = departementUser,
                            fonctionUser = fonctionUser,
                            statutUser = statutUser,
                            connecte = connecte,
                            profil = Profil.objects.get(id = int(request.data["profil"])),
                            divisionadministrative = DivisionAdministrative.objects.get(id = int(request.data["divisionadministrative"])),
                            photo_profil = photo_profil
                          )
        return Response("Mise a jour effectué avec succés", status = status.HTTP_200_OK)
