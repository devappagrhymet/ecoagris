from django.db import models

# Class des produits animaliers

# Class Indicateur elevage 
class ElevageIndItem(models.Model):

    valeur_gen = models.FloatField(blank=True, null=True)
    speculation = models.ForeignKey('PRODAGRIC.speculation', blank=True, null=True, related_name='elevage_ind_items', on_delete=models.CASCADE)
    indicateur = models.ForeignKey('INDICATEUR.Indicateur', blank=True, null=True, related_name='elevage_ind_items', on_delete=models.CASCADE)
    debut_campagne = models.IntegerField(blank=True, null=True)
    fin_campagne = models.IntegerField(blank=True, null=True)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='elevage_ind_items', on_delete=models.CASCADE)
    niveau_1 =  models.IntegerField(blank=True, null=True)
    pays_id =  models.IntegerField(blank=True, null=True)
    valid_pfr = models.BooleanField(blank=True,null=True)
    valid_pfp = models.BooleanField(blank=True,null=True)
    public =    models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur_gen}, {self.produit}, {self.indicateur}, {self.debut_campagne}, {self.fin_campagne},{self.divisionadministrative}"

# Class Variable elevage 
class ElevageVarItem(models.Model):

    valeur = models.FloatField(blank=True, null=True)
    speculation = models.ForeignKey('PRODAGRIC.speculation', blank=True, null=True, related_name='elevage_var_items', on_delete=models.CASCADE)
    variable = models.ForeignKey('INDICATEUR.Variable', blank=True, null=True, related_name='elevage_var_items', on_delete=models.CASCADE)
    debut_campagne = models.IntegerField(blank=True, null=True)
    fin_campagne = models.IntegerField(blank=True, null=True)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='elevage_var_items', on_delete=models.CASCADE)
    niveau_1 =  models.IntegerField(blank=True, null=True)
    pays_id =  models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur}, {self.speculation}, {self.variable}, {self.debut_campagne}, {self.fin_campagne}, {self.divisionadministrative}"
    