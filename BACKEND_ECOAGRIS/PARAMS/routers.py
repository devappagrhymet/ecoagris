from rest_framework.routers import DefaultRouter
from .views import *
from PARAMS import views

router = DefaultRouter()
#____________________URLs___________________________________________________
router.register('frequences', FrequenceViewset, basename='frequences')
router.register('unites', UniteViewset, basename='unites')
router.register('campagnes', CampagneViewset, basename='campagnes')
router.register('niveaux', NiveauViewset, basename='niveaux')
router.register('sous_systemes',   SousystemeViewset,   basename='sous_systemes')
#____________________End URL_______________________________________________
urlpatterns= router.urls