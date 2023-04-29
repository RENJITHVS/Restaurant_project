from django.urls import path
from .views import MenuItemDetail, MenuItemList

app_name = 'restaurant_api'

urlpatterns = [
    path('<int:pk>/', MenuItemDetail.as_view(), name='detailcreate'),
    path('', MenuItemList.as_view(), name='listcreate'),
    
]
