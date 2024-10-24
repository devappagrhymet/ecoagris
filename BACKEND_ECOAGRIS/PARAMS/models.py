from django.db import models
from rest_framework.authtoken.models import Token


# Create your models here.
class Frequence(models.Model):

    codeFreq = models.CharField(max_length=255)
    nomFreq = models.TextField(blank=True)
    nomFreq_ang = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.codeFreq}, {self.nomFreq}"

class Unite(models.Model):

    codeUnite = models.CharField(max_length=255)
    nomUnite = models.TextField(blank=True)
    nomUnite_ang = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.codeUnite}, {self.nomUnite}"

class Campagne(models.Model):

    annee_debut = models.IntegerField()
    annee_fin = models.IntegerField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.campagne}"

class Niveau(models.Model):

    codeNiveau = models.CharField(max_length=255)
    nomNiveau = models.TextField(blank=True)
    nomNiveau_ang = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.codeNiveau}, {self.nomNiveau}"

class Sousysteme(models.Model):

    codeSys = models.CharField(max_length=255)
    nomSys = models.TextField(blank=True)
    nomSys_ang = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.codeSys}, {self.nomSys}"