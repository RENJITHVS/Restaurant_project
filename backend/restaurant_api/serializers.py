from rest_framework import serializers
from restaurant.models import MenuItem, Category

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'category', 'name', 'description', 'image','cost', 'status',)
        model = MenuItem

