from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
#____________________URLs Marche agricole___________________________________________________
router.register('marchAgricIndItem',         MarchAgricIndItemViewset,      basename='marchAgricIndItem')
router.register('marchAgricIndItemList',     MarchAgricIndItemListViewset,  basename='marchAgricIndItemList')
router.register('marchAgricVarItem',         MarchAgricVarItemViewset,      basename='marchAgricVarItem')
router.register('marchAgricItemList',        MarchAgricVarItemListViewset,  basename='marchAgricItemList')
#router.register('get_marche_agric',          GetMarchagricViewset,          basename='get_marche_agric')

router.register('get_marche_agricole_pays',  GetMarcheAgricoleByPaysViewset,     basename='get_marche_agricole_pays')
router.register('get_indicateur_agricole',  GetIndicateurAgricoleByPaysViewset,  basename='get_indicateur_agricole')
#____________________URLs Marche betail___________________________________________________
router.register('marcheBetailIndItem',      MarchBetailIndItemViewset,     basename='marcheBetailIndItem')
router.register('marcheBetailIndItemList',  MarchBetailIndItemListViewset, basename='marcheBetailIndItemList')
router.register('marcheBetailVarItem',      MarchBetailVarItemViewset,     basename='marcheBetailVarItem')
router.register('marcheBetailVarItemList',  MarchBetailVarItemListViewset, basename='marcheBetailVarItemList')

router.register('get_marche_betail_pays',      GetMarcheBetailByPaysViewset,      basename='get_marche_betail_pays')
router.register('get_indicateur_betail_pays',  GetIndicateurBetailByPaysViewset,  basename='get_indicateur_betail_pays')
#____________________URLs___________________________________________________
router.register('produit-comext',    ProduitComextViewset,     basename='produit-comext')
router.register('comextIndItem',     ComextIndItemViewset,     basename='comextIndItem')
router.register('comextIndItemList', ComextIndItemListViewset, basename='comextIndItemList')
router.register('comextVarItem',     ComextVarItemViewset,     basename='comextVarItem')
router.register('comextVarItemList', ComextVarItemListViewset, basename='comextVarItemList')

router.register('get_com_ext', GetComExtViewset, basename='get_com_ext')

router.register('getComextByPays', GetImportExportByPaysViewset, basename='getComextByPays')

router.register('get_indicateur_comext', GetIndicateurComextViewset, basename='get_indicateur_comext')


#____________________End URL_______________________________________________
urlpatterns= router.urls