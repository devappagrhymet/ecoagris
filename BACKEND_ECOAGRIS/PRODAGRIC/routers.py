from rest_framework.routers import DefaultRouter
from .views import *



router = DefaultRouter()
#____________________URLs___________________________________________________
router.register('speculation', SpeculationViewset, basename='speculation')
router.register('categoriespe', CategorieSpeViewset, basename='categoriespe')
router.register('prodagricIndItem', ProdagricIndItemViewset, basename='prodagricIndItem')
router.register('prodagricIndItemList', ProdagricIndItemListViewset, basename='prodagricIndItemList')
router.register('prodagricVarItem', ProdagricVarItemViewset, basename='prodagricVarItem')
router.register('prodagricVarItemList', ProdagricVarItemListViewset, basename='prodagricVarItemList')


router.register('get_prodagric', GetProdagricViewset, basename='get_prodagric')

router.register('get_prodagric_data', GetProductionByPaysViewset, basename='get_prodagric_data')
router.register('get_prodagric_indicateur', GetProdagricIndicateurViewset, basename='get_prodagric_indicateur')
router.register('get_prodagric_niveau2', GetProductionByNiveau2Viewset, basename='get_prodagric_niveau2')
router.register('get_prodagric_niveau1', GetProductionByNiveau1Viewset, basename='get_prodagric_niveau1')
#____________________End URL_______________________________________________
urlpatterns= router.urls