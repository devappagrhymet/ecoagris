from rest_framework.routers import DefaultRouter
from .views import *



router = DefaultRouter()
#____________________URLs___________________________________________________

router.register('data_population', PopVarItemViewset,    basename='data_population')
router.register('get_population',  GetPopulationViewset, basename='get_population')

#____________________End URL_______________________________________________
urlpatterns= router.urls