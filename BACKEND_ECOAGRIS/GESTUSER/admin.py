from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Profil)
admin.site.register(Fonctionnalite)
admin.site.register(User)
admin.site.register(Privilege)
admin.site.register(Log)