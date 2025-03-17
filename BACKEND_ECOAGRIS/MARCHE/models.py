from django.db import models

# Class Marché agricole - donnees indicateur  
class MarchAgricIndItem(models.Model):

    valeur_gen = models.FloatField(blank=True, null=True)
    mois =  models.IntegerField(blank=True, null=True)
    annee = models.IntegerField(blank=True, null=True)
    speculation = models.ForeignKey('PRODAGRIC.speculation', blank=True, null=True, related_name='marche_agric_ind_items', on_delete=models.CASCADE)
    indicateur = models.ForeignKey('INDICATEUR.Indicateur', blank=True, null=True, related_name='marche_agric_ind_items', on_delete=models.CASCADE)
    code_devise = models.CharField(max_length=255)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='marche_agric_ind_items', on_delete=models.CASCADE)
    niveau1_id =  models.IntegerField(blank=True, null=True)
    pays_id =  models.IntegerField(blank=True, null=True)
    valid_pfr = models.BooleanField(blank=True,null=True)
    valid_pfp = models.BooleanField(blank=True,null=True)
    public =    models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur_gen}, {self.speculation}, {self.indicateur}, {self.annee}, {self.divisionadministrative}"

# Class Marché agricole - donnees variable  
class MarchAgricVarItem(models.Model):

    valeur = models.FloatField(blank=True, null=True)
    mois =  models.IntegerField(blank=True, null=True)
    annee = models.IntegerField(blank=True, null=True)
    speculation = models.ForeignKey('PRODAGRIC.speculation', blank=True, null=True, related_name='marche_agric_var_items', on_delete=models.CASCADE)
    variable = models.IntegerField(blank=True, null=True)
    nom_marche = models.CharField(max_length=255)
    type_prix = models.CharField(max_length=255)
    code_unite = models.CharField(max_length=255)
    code_devise = models.CharField(max_length=255)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='marche_agric_var_items', on_delete=models.CASCADE)
    niveau1_id =  models.IntegerField(blank=True, null=True)
    pays_id =  models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur}, {self.speculation}, {self.variable}, {self.annee}, {self.divisionadministrative}"
#=================BETAIL=======================
# Class Marché betail - donnees indicateur  
class MarchBetailIndItem(models.Model):

    valeur_gen = models.FloatField(blank=True, null=True)
    mois =  models.IntegerField(blank=True, null=True)
    annee = models.IntegerField(blank=True, null=True)
    speculation = models.ForeignKey('PRODAGRIC.speculation', blank=True, null=True, related_name='marche_betail_ind_items', on_delete=models.CASCADE)
    indicateur = models.ForeignKey('INDICATEUR.Indicateur', blank=True, null=True, related_name='marche_betail_ind_items', on_delete=models.CASCADE)
    espece = models.CharField(max_length=255)
    code_devise = models.CharField(max_length=255)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='marche_betail_ind_items', on_delete=models.CASCADE)
    niveau1_id =  models.IntegerField(blank=True, null=True)
    pays_id =  models.IntegerField(blank=True, null=True)
    valid_pfr = models.BooleanField(blank=True,null=True)
    valid_pfp = models.BooleanField(blank=True,null=True)
    public =    models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur_gen}, {self.speculation}, {self.indicateur}, {self.annee}, {self.divisionadministrative}"

# Class Marché betail - donnees variable  
class MarchBetailVarItem(models.Model):

    valeur = models.FloatField(blank=True, null=True)
    mois =  models.IntegerField(blank=True, null=True)
    annee = models.IntegerField(blank=True, null=True)
    speculation = models.ForeignKey('PRODAGRIC.speculation', blank=True, null=True, related_name='marche_betail_var_items', on_delete=models.CASCADE) 
    variable = models.IntegerField(blank=True, null=True)
    nom_marche = models.CharField(max_length=255)
    type_prix = models.CharField(max_length=255)
    code_unite = models.CharField(max_length=255)
    code_devise = models.CharField(max_length=255)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='marche_betail_var_items', on_delete=models.CASCADE)
    niveau1_id =  models.IntegerField(blank=True, null=True)
    pays_id =  models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur}, {self.speculation}, {self.variable}, {self.annee}, {self.divisionadministrative}"

#=================COMEXT=======================
class ProduitComext(models.Model):

    codeProduit = models.CharField(max_length=255)
    nomProduit = models.TextField(blank=True)
    nomProduit_ang = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.codeProduit}, {self.nomProduit}"
    


# Class Indicateur COMEXT 
class ComextIndItem(models.Model):

    valeur_gen = models.FloatField(blank=True, null=True)
    unite_devise = models.TextField(blank=True, null=True)
    indicateur = models.ForeignKey('INDICATEUR.Indicateur', blank=True, null=True, related_name='comext_ind_items', on_delete=models.CASCADE)
    annee = models.IntegerField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='comext_ind_items', on_delete=models.CASCADE)
    valid_pfr = models.BooleanField(blank=True,null=True)
    valid_pfp = models.BooleanField(blank=True,null=True)
    public =    models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur_gen}, {self.unite_devise}, {self.indicateur}, {self.annee}, {self.type}, {self.divisionadministrative}"

# Class Variable COMEXT 
class ComextVarItem(models.Model):

    valeur = models.FloatField(blank=True, null=True)
    devise = models.TextField(blank=True, null=True)
    quantite = models.FloatField(blank=True, null=True)
    produit = models.ForeignKey('ProduitComext', blank=True, null=True, related_name='comext_var_items', on_delete=models.CASCADE)
    variable = models.ForeignKey('INDICATEUR.Variable', blank=True, null=True, related_name='comext_var_items', on_delete=models.CASCADE)
    debut_campagne = models.IntegerField(blank=True, null=True)
    fin_campagne = models.IntegerField(blank=True, null=True)
    divisionadministrative = models.ForeignKey('DIVADMIN.DivisionAdministrative', null=True, related_name='comext_var_items', on_delete=models.CASCADE)
    type = models.TextField(blank=True, null=True)
    provenance = models.TextField(blank=True, null=True)
    destination = models.TextField(blank=True, null=True)
    pays_id =  models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.valeur}, {self.produit}, {self.variable}, {self.debut_campagne}, {self.fin_campagne}, {self.divisionadministrative}"
    
    