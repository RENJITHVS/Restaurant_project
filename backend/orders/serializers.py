from .models import Order, OrderItem
from restaurant.models import MenuItem
from rest_framework import serializers
from restaurant_api.serializers import MenuSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())
    class Meta:
        model = OrderItem
        fields = ('menu_item', 'quantity')

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'created_at', 'updated_at', 'total', 'is_paid', 'is_complete', 'order_items')

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        order = Order.objects.create(**validated_data)
        for order_item_data in order_items_data:
            OrderItem.objects.create(order=order, **order_item_data)
        return order
    

class OrderItemSerializerDisplay(serializers.ModelSerializer):
    menu_item = MenuSerializer()
    class Meta:
        model = OrderItem
        fields = ('menu_item', 'quantity')


class OrderSerializerDisplay(serializers.ModelSerializer):
    order_items = OrderItemSerializerDisplay(many=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'created_at', 'updated_at', 'total', 'is_paid', 'is_complete', 'order_items')

    