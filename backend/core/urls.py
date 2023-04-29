
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('restaurant.urls', namespace='restaurant')),
    path('api/', include('restaurant_api.urls', namespace='restaurant_api')),
    path('api/user/', include('users.urls', namespace='users')),
    path('api/orders/', include('orders.urls', namespace='orders')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)