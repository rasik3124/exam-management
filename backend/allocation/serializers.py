from rest_framework import serializers
from .models import Room, Studentrange, Allocation

# This is used to convert database into JSON and it uses DRF

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class StudentrangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studentrange
        fields = "__all__"

class AllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allocation
        fields = "__all__"