from rest_framework import serializers
from .models import *

class OwnerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerDetails
        fields = '__all__'

class GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = '__all__'

class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = '__all__'