from django.db import models

# Create your models here.

# Class variable Stock
class PopVarItem(models.Model):
    
    nombre_pop = models.FloatField(blank=True, null=True)
    annee = models.IntegerField(blank=True, null=True)
    pays = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='population_items', on_delete=models.CASCADE)
    valid_pfr = models.BooleanField(blank=True,null=True)
    valid_pfp = models.BooleanField(blank=True,null=True)
    public =    models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f" {self.nombre_pop}, {self.annee}, {self.pays}"


