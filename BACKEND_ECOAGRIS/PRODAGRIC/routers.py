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
router.register('bilan_productionagricole', ProductionagricoleViewset, basename='bilan_productionagricole')

router.register('get_prodagric', GetProdagricViewset, basename='get_prodagric')

router.register('alpha', AlphaViewset, basename='alpha')
#____________________End URL_______________________________________________
urlpatterns= router.urls