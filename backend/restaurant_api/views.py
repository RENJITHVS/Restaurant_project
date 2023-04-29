from rest_framework import generics
from restaurant.models import MenuItem
from .serializers import MenuSerializer


class MenuItemList(generics.ListAPIView):
    queryset = MenuItem.objects.all()
    authentication_classes = [] 
    serializer_class = MenuSerializer


class MenuItemDetail(generics.RetrieveDestroyAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuSerializer
