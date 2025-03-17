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

    valeur_gen = models.FloatField(blank=True, null=True)
    speculation = models.ForeignKey('Speculation', blank=True, null=True, related_name='prodagricind_items', on_delete=models.CASCADE)
    indicateur = models.ForeignKey('INDICATEUR.Indicateur', blank=True, null=True, related_name='prodagricind_items', on_delete=models.CASCADE)
    debut_campagne = models.IntegerField(blank=True, null=True)
    fin_campagne = models.IntegerField(blank=True, null=True)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='prodagricind_items', on_delete=models.CASCADE)
    pays_id =  models.IntegerField(blank=True, null=True)
    valid_pfr = models.BooleanField(blank=True,null=True)
    valid_pfp = models.BooleanField(blank=True,null=True)
    public =    models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur_gen}, {self.speculation}, {self.indicateur}, {self.debut_campagne}, {self.fin_campagne}, {self.divisionadministrative}"

# Class données de la production agricole   
class ProdagricVarItem(models.Model):
    
    speculation = models.ForeignKey('Speculation', blank=True, null=True, related_name='prod_var_items', on_delete=models.CASCADE)
    categorie = models.IntegerField(blank=True, null=True)
    superficie_prod_agricole = models.FloatField()
    unite_1 = models.CharField(max_length=255)
    rendement_prod_agricole = models.FloatField()
    unite_2 = models.CharField(max_length=255)
    quantite_prod_agricole = models.FloatField()
    unite_3 = models.CharField(max_length=255)
    debut_campagne = models.IntegerField(blank=True, null=True)
    fin_campagne = models.IntegerField(blank=True, null=True)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='prod_var_items', on_delete=models.CASCADE)
    pays_id =  models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.debut_campagne}, {self.fin_campagne}, {self.speculation}, {self.superficie_prod_agricole}, {self.rendement_prod_agricole}, {self.quantite_prod_agricole}, {self.divisionadministrative}"
 