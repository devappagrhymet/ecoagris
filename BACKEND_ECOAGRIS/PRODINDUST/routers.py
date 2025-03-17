from rest_framework.routers import DefaultRouter
from .views import *



router = DefaultRouter()
#____________________URLs___________________________________________________

router.register('data_prod_indust', ProdVarItemViewset, basename='data_prod_indust')
router.register('get_production_indus', GetProdIndusViewset, basename='get_production_indus')
#____________________End URL_______________________________________________
urlpatterns= router.urls