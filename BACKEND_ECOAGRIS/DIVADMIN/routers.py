from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register('zones', ZoneViewset, basename='zones')
router.register('bassins', BassinViewset, basename='bassins')
router.register('divisionsAdministratives', DivisionAdministrativeViewset, basename='divisionsAdministratives')
router.register('zonesDivisionsAdministratives', ZoneDivisionAdministrativeViewset, basename='zonesDivisionsAdministratives')

router.register('getonedivision', GetOneDivisionViewset, basename='getonedivision')

router.register('pays-list', PaysListViewset, basename='pays-list')
router.register('divadmin-list', DivadminListViewset, basename='divadmin-list')


urlpatterns= router.urls
