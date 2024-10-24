from django.db import models

# Create your models here.
class Zone(models.Model):

    codeZone = models.CharField(max_length=255)
    nomZone = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nomZone

class Bassin(models.Model):

    codeBassin = models.CharField(max_length=255)
    nomBassin = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nomBassin

def upload_path(instance, filename):
    return '/'.join(['images', filename])
class DivisionAdministrative(models.Model):

    codeDivision = models.CharField(max_length=255)
    nomDivision = models.TextField(blank=True)
    niveauDivision = models.IntegerField(blank=True,null=True)
    libelleNiveauDivision = models.TextField(blank=True,null=True)
    image = models.FileField(upload_to = upload_path, blank=True, null=True)
    divisionadministrative_id = models.PositiveIntegerField(blank=True,null=True)
    id_pays = models.PositiveIntegerField(blank=True,null=True)
    bassin = models.PositiveIntegerField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nomDivision

class ZoneDivisionAdministrative(models.Model):

    date_adhesion = models.DateField()
    date_sortie = models.DateField()
    divisionadministrative = models.ForeignKey('DivisionAdministrative', null=True, related_name='zonedivisionadministratives', on_delete=models.CASCADE)
    zone = models.ForeignKey('Zone', null=True, related_name='zonedivisionadministratives', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.date_adhesion
