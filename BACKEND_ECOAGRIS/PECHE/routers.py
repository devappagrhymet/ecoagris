from rest_framework.routers import DefaultRouter
from .views import *



router = DefaultRouter()
#____________________URLs___________________________________________________

router.register('pecheIndItem', PecheIndItemViewset, basename='pecheIndItem')
router.register('pecheIndItemList', PecheIndItemListViewset, basename='pecheIndItemList')
router.register('pecheVarItem', PecheVarItemViewset, basename='pecheVarItem')
router.register('pecheVarItemList', PecheVarItemListViewset, basename='pecheVarItemList')
router.register('get_peche', GetPecheViewset, basename='get_peche')
                              
router.register('get_peche_pays',GetPecheByPaysViewset, basename='get_peche_pays')
                              
router.register('get_peche_niveau1',  GetPecheByNiveau1Viewset, basename='get_peche_niveau1')
                              
router.register('get_peche_niveau2', GetPecheByNiveau2Viewset, basename='get_peche_niveau2')
#____________________End URL_______________________________________________
urlpatterns= router.urls