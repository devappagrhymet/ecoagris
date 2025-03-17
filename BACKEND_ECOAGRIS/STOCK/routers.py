from rest_framework.routers import DefaultRouter
from .views import *



router = DefaultRouter()
#____________________URLs___________________________________________________

router.register('data_stock', StockVarItemViewset, basename='data_stock')
router.register('get_stock', GetStockViewset, basename='get_stock')
#____________________End URL_______________________________________________
urlpatterns= router.urls