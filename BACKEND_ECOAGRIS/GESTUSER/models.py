from django.db import models

# Create your models here.
def upload_path(instance, filename):
    return '/'.join(['photos-profil', filename])


class Profil(models.Model):

    nomProfil = models.CharField(max_length=255)
    descProfil = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nomProfil

class Fonctionnalite(models.Model):

    nomFct = models.CharField(max_length=255)
    descFct = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nomFct

class User(models.Model):

    nomUser = models.CharField(max_length=255,blank=True,null=True)
    prenomUser = models.TextField(blank=True,null=True)
    username = models.CharField(max_length=255, null=True)
    password = models.CharField(max_length=255, null=True)
    telephoneUser = models.CharField(max_length=255, null=True)
    emailUser = models.CharField(max_length=255, null=True)
    structureUser = models.TextField(blank=True, null=True)
    departementUser = models.TextField(blank=True, null=True)
    fonctionUser = models.TextField(blank=True, null=True)
    statutUser = models.CharField(blank=True,null=True,max_length=255)
    connecte = models.BooleanField(default=False)
    profil = models.ForeignKey('Profil',null=True, related_name='users', on_delete=models.CASCADE)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='users', on_delete=models.CASCADE)
    photo_profil = models.FileField(upload_to=upload_path, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nomUser}, {self.prenomUser}"

class Privilege(models.Model):

    profil = models.ForeignKey('Profil', null=True, related_name='privileges', on_delete=models.CASCADE)
    fonctionnalite = models.ForeignKey('Fonctionnalite', null=True, related_name='privileges', on_delete=models.CASCADE)
    create = models.BooleanField(null=True, default=False)
    read = models.BooleanField(null=True, default=False)
    update = models.BooleanField(null=True, default=False)
    delete = models.BooleanField(null=True, default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.profil}, {self.fonctionnalite}, {self.create}, {self.read}, {self.update}, {self.delete}"

class Log(models.Model):

    user = models.ForeignKey('User', null=True, related_name='logs', on_delete=models.CASCADE)
    action = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user