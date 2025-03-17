from rest_framework.routers import DefaultRouter
from .views import *



router = DefaultRouter()
#____________________URLs___________________________________________________

router.register('elevageIndItem', ElevageIndItemViewset, basename='elevageIndItem')
router.register('elevageIndItemList', ElevageIndItemListViewset, basename='elevageIndItemList')
router.register('elevageVarItem', ElevageVarItemViewset, basename='elevageVarItem')
router.register('elevageVarItemList', ElevageVarItemListViewset, basename='elevageVarItemList')

router.register('get_elevage_pays', GetElevageByPaysViewset, basename='get_elevage_pays')
router.register('get_elevage_niveau2', GetElevageByNiveau1Viewset, basename='get_elevage_niveau2')
router.register('get_elevage_niveau1', GetElevageByNiveau2Viewset, basename='get_elevage_niveau1')


#____________________End URL_______________________________________________
urlpatterns= router.urls