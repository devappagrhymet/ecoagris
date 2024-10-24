# Generated by Django 3.2.5 on 2024-10-23 21:25

import GESTUSER.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('DIVADMIN', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fonctionnalite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomFct', models.CharField(max_length=255)),
                ('descFct', models.TextField(blank=True, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profil',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomProfil', models.CharField(max_length=255)),
                ('descProfil', models.TextField(blank=True, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomUser', models.CharField(blank=True, max_length=255, null=True)),
                ('prenomUser', models.TextField(blank=True, null=True)),
                ('username', models.CharField(max_length=255, null=True)),
                ('password', models.CharField(max_length=255, null=True)),
                ('telephoneUser', models.CharField(max_length=255, null=True)),
                ('emailUser', models.CharField(max_length=255, null=True)),
                ('structureUser', models.TextField(blank=True, null=True)),
                ('departementUser', models.TextField(blank=True, null=True)),
                ('fonctionUser', models.TextField(blank=True, null=True)),
                ('statutUser', models.CharField(blank=True, max_length=255, null=True)),
                ('connecte', models.BooleanField(default=False)),
                ('photo_profil', models.FileField(blank=True, null=True, upload_to=GESTUSER.models.upload_path)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('divisionadministrative', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='DIVADMIN.divisionadministrative')),
                ('profil', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='GESTUSER.profil')),
            ],
        ),
        migrations.CreateModel(
            name='Privilege',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create', models.BooleanField(default=False, null=True)),
                ('read', models.BooleanField(default=False, null=True)),
                ('update', models.BooleanField(default=False, null=True)),
                ('delete', models.BooleanField(default=False, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('fonctionnalite', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='privileges', to='GESTUSER.fonctionnalite')),
                ('profil', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='privileges', to='GESTUSER.profil')),
            ],
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.TextField(blank=True, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='logs', to='GESTUSER.user')),
            ],
        ),
    ]
