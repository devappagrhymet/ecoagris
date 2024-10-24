from django.db import models

# Classe des indicateurs des sous-systèmes
class Indicateur(models.Model):
    
    class Statut(models.TextChoices):
        OUI = 'OUI'
        NON = 'NON'
        EN_VEILLE = 'EN VEILLE'
    
    class Comp_indic_CRA(models.TextChoices):
        OUI = 'OUI'
        NON = 'NON'
        
    code = models.CharField(max_length=255)
    libelle = models.TextField()
    libelle_ang = models.TextField()
    responsable_collecte = models.TextField()
    description = models.TextField()
    description_ang = models.TextField()
    indicateur_CRA = models.CharField(choices=Comp_indic_CRA.choices,max_length=255)
    composite = models.CharField(choices=Comp_indic_CRA.choices,max_length=255)
    formule = models.TextField(blank=True, null=True)
    frequence = models.ForeignKey('PARAMS.Frequence', blank=True, null=True, related_name='indicateurs', on_delete=models.CASCADE)
    unite = models.ForeignKey('PARAMS.Unite', blank=True, null=True, related_name='indicateurs', on_delete=models.CASCADE)
    niveau = models.ForeignKey('PARAMS.Niveau', blank=True, null=True, related_name='indicateurs', on_delete=models.CASCADE)
    sousysteme = models.ForeignKey('PARAMS.Sousysteme', blank=True, null=True, related_name='indicateurs', on_delete=models.CASCADE)
    statut = models.CharField(choices=Statut.choices,max_length=255)
    calcule = models.BooleanField(blank=True,null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.code}, {self.libelle}"

# Classe des variables des sous-systèmes
class Variable(models.Model):

    code = models.CharField(max_length=255)
    libelle = models.TextField()
    libelle_ang = models.TextField()
    api_url = models.TextField()
    sousysteme = models.ForeignKey('PARAMS.Sousysteme', blank=True, null=True, related_name='variables', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.code}, {self.libelle}"

# Classe d'association entre indicateurs et variables des sous-systèmes
class IndicateurVariable(models.Model):

    indicateur = models.ForeignKey('Indicateur', blank=True, null=True, related_name='indicateur_variables', on_delete=models.CASCADE)
    variable = models.ForeignKey('Variable', blank=True, null=True, related_name='indicateur_variables', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.indicateur}, {self.variable}"