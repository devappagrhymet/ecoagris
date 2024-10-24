from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
#____________________URLs___________________________________________________
router.register('indicateur', IndicateurViewset, basename='indicateur')
router.register('indicateurList', IndicateurListViewset, basename='indicateurList')
router.register('config_formule', IndicateurFormuleViewset, basename='config_formule')
router.register('variable', VariableViewset, basename='variable')
router.register('variableList', VariableListViewset, basename='variableList')
router.register('indicateurVariable', IndicateurVariableViewset, basename='indicateurVariable')
router.register('get_indicateur_sousysteme', GetIndicateurBySousystemeViewset, basename='get_indicateur_sousysteme')
router.register('get_variable_sousysteme',   GetVariableBySousystemeViewset,   basename='get_variable_sousysteme')
router.register('get_indicateur_variable', GetIndicVarByIndicateurViewset, basename='get_indicateur_variable')
#____________________End URL_______________________________________________
urlpatterns= router.urls