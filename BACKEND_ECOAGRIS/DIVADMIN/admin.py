from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Zone)
admin.site.register(Bassin)
admin.site.register(DivisionAdministrative)
admin.site.register(ZoneDivisionAdministrative)