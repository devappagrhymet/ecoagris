from django.db import models

# Create your models here.

# Class variable Production industrielle
class ProdVarItem(models.Model):
    
    quantite_prod = models.FloatField(blank=True, null=True)
    unite = models.TextField(blank=True, null=True)
    speculation = models.ForeignKey('PRODAGRIC.speculation', blank=True, null=True, related_name='prodindust_items', on_delete=models.CASCADE)
    categorie_spe = models.FloatField(blank=True, null=True)
    debut_campagne = models.IntegerField(blank=True, null=True)
    fin_campagne = models.IntegerField(blank=True, null=True)
    pays = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='prodindust_items', on_delete=models.CASCADE)
    valid_pfr = models.BooleanField(blank=True,null=True)
    valid_pfp = models.BooleanField(blank=True,null=True)
    public =    models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.quantite_prod}, {self.speculation}, {self.debut_campagne}, {self.fin_campagne},{self.pays}"

