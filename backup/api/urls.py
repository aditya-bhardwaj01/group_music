from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('api/ownerdetails', OwnerDetailsView, basename='ownerdetails')
router.register('api/groups', GroupsView, basename='groups')
router.register('api/members', MembersView, basename='members')

# Register the custom action viewset with the router
# router.register('api/custom-action', CustomActionViewSet, basename='custom-action')

urlpatterns = router.urls