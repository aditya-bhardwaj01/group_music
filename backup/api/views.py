from django.shortcuts import render
from .models import Groups
from .serializers import *
from rest_framework import viewsets

# Create your views here.

class OwnerDetailsView(viewsets.ModelViewSet):
    queryset = OwnerDetails.objects.all()
    serializer_class = OwnerDetailsSerializer

class GroupsView(viewsets.ModelViewSet):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer

class MembersView(viewsets.ModelViewSet):
    queryset = Members.objects.all()
    serializer_class = MembersSerializer

# Add a new viewset for custom actions
# class CustomActionViewSet(viewsets.ViewSet):
#     @action(detail=False, methods=['get'])
#     def my_custom_action(self, request):
#         return Response({'message': 'Custom action performed successfully'})
