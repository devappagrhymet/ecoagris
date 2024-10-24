from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register('logs', LogViewset, basename='logs')
router.register('privileges', PrivilegeViewset, basename='privileges')
router.register('users', UserViewset, basename='users')
router.register('fonctionnalites', FonctionnaliteViewset, basename='fonctionnalites')
router.register('profils', ProfilViewset, basename='profils')
#---------------------------------------------------------------
router.register('getuser', GetUserViewset, basename='getuser')
router.register('getprivilege', GetPrivilegeViewset, basename='getprivilege')
router.register('getoneprofil', GetOneProfilViewset, basename='getoneprofil')
router.register('connecteduser', ConnectedUserViewset, basename='connecteduser')
router.register('updateuser',  UpdateUserViewset, basename='updateuser')
#--------------------------------------------------------------
urlpatterns= router.urls