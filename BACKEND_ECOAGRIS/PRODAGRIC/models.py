from django.db import models


# Class des categories des produits agricoles
class CategorieSpe(models.Model):

    codeCategorie = models.CharField(max_length=255)
    nomCategorie = models.TextField(blank=True)
    nomCategorie_ang = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.codeCategorie}, {self.nomCategorie}"

# Class des produits agricoles
class Speculation(models.Model):

    codeSpeculation = models.CharField(max_length=255)
    nomSpeculation = models.TextField(blank=True)
    nomSpeculation_ang = models.TextField(blank=True)
    categoriespe = models.ForeignKey('CategorieSpe', blank=True, null=True, related_name='speculations', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.codeSpeculation}, {self.nomSpeculation}"
    
    
# Class des valeurs génerées des indicateurs  
class ProdagricIndItem(models.Model):

    valeur_gen = models.FloatField()
    speculation = models.ForeignKey('Speculation', blank=True, null=True, related_name='prodagricind_items', on_delete=models.CASCADE)
    indicateur = models.ForeignKey('INDICATEUR.Indicateur', blank=True, null=True, related_name='prodagricind_items', on_delete=models.CASCADE)
    campagne = models.ForeignKey('PARAMS.Campagne', blank=True, null=True, related_name='prodagricind_items', on_delete=models.CASCADE)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='prodagricind_items', on_delete=models.CASCADE)
    pays_id =  models.IntegerField(blank=True, null=True)
    valid_pfr = models.BooleanField(blank=True,null=True)
    valid_pfp = models.BooleanField(blank=True,null=True)
    public =    models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur_gen}, {self.speculation}, {self.indicateur}, {self.campagne}, {self.divisionadministrative}"

# Class des valeurs  des variables   
class ProdagricVarItem(models.Model):

    valeur = models.FloatField()
    speculation = models.ForeignKey('Speculation', blank=True, null=True, related_name='prodagricvar_items', on_delete=models.CASCADE)
    variable = models.ForeignKey('INDICATEUR.Variable', blank=True, null=True, related_name='prodagricvar_items', on_delete=models.CASCADE)
    campagne = models.ForeignKey('PARAMS.Campagne', blank=True, null=True, related_name='prodagricvar_items', on_delete=models.CASCADE)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='prodagricvar_items', on_delete=models.CASCADE)
    pays_id =  models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur}, {self.speculation}, {self.variable}, {self.campagne}, {self.divisionadministrative}"
    
# Class des pregec - bilanalimentaire_productionagricole  
class Productionagricole(models.Model):

    superficie_production_agricole = models.FloatField()
    rendement_production_agricole = models.FloatField()
    quantite_production_agricole = models.FloatField()
    source_production_agricole = models.CharField(max_length=255)
    campagne_production_agricole = models.CharField(max_length=255)
    annee_production_agricole = models.CharField(max_length=255)
    pays_production_agricole = models.CharField(max_length=255)
    methode_production_agricole = models.CharField(max_length=255)
    statut_production_agricole = models.IntegerField()
    produit_id = models.PositiveBigIntegerField()
    bilan_id = models.PositiveBigIntegerField()
    divisionadministrative_id = models.PositiveBigIntegerField()
    created_by = models.IntegerField(blank=True, null=True)
    modified_by = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.superficie_production_agricole}, {self.rendement_production_agricole}, {self.quantite_production_agricole}, {self.produit_id}, {self.divisionadministrative_id}, {self.annee_production_agricole}"