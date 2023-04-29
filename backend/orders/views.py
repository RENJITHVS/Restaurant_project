from rest_framework.generics import CreateAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer, OrderSerializerDisplay
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.
class CreateOrderView(CreateAPIView):
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # logger.info(f"received data: {request.data}")
        user_id = request.user.id
        user_instance = User.objects.get(id=user_id)
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # logger.warning(f"invalid data {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RetrieveOrderView(RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializerDisplay
