from django.urls import path
from .views import CreateOrderView,RetrieveOrderView

app_name = 'orders'

urlpatterns = [
    path('create_order/', CreateOrderView.as_view(), name="create_order"),
    path('<int:pk>/', RetrieveOrderView.as_view(), name='get_order'),
] 