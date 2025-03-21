# Generated by Django 3.2.5 on 2025-03-03 05:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('DIVADMIN', '0001_initial'),
        ('INDICATEUR', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategorieSpe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codeCategorie', models.CharField(max_length=255)),
                ('nomCategorie', models.TextField(blank=True)),
                ('nomCategorie_ang', models.TextField(blank=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Speculation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codeSpeculation', models.CharField(max_length=255)),
                ('nomSpeculation', models.TextField(blank=True)),
                ('nomSpeculation_ang', models.TextField(blank=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('categoriespe', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='speculations', to='PRODAGRIC.categoriespe')),
            ],
        ),
        migrations.CreateModel(
            name='ProdagricVarItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categorie', models.IntegerField(blank=True, null=True)),
                ('superficie_prod_agricole', models.FloatField()),
                ('unite_1', models.CharField(max_length=255)),
                ('rendement_prod_agricole', models.FloatField()),
                ('unite_2', models.CharField(max_length=255)),
                ('quantite_prod_agricole', models.FloatField()),
                ('unite_3', models.CharField(max_length=255)),
                ('debut_campagne', models.IntegerField(blank=True, null=True)),
                ('fin_campagne', models.IntegerField(blank=True, null=True)),
                ('pays_id', models.IntegerField(blank=True, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('divisionadministrative', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='prod_var_items', to='DIVADMIN.divisionadministrative')),
                ('speculation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='prod_var_items', to='PRODAGRIC.speculation')),
            ],
        ),
        migrations.CreateModel(
            name='ProdagricIndItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valeur_gen', models.FloatField(blank=True, null=True)),
                ('debut_campagne', models.IntegerField(blank=True, null=True)),
                ('fin_campagne', models.IntegerField(blank=True, null=True)),
                ('pays_id', models.IntegerField(blank=True, null=True)),
                ('valid_pfr', models.BooleanField(blank=True, null=True)),
                ('valid_pfp', models.BooleanField(blank=True, null=True)),
                ('public', models.BooleanField(blank=True, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('divisionadministrative', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='prodagricind_items', to='DIVADMIN.divisionadministrative')),
                ('indicateur', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='prodagricind_items', to='INDICATEUR.indicateur')),
                ('speculation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='prodagricind_items', to='PRODAGRIC.speculation')),
            ],
        ),
    ]
