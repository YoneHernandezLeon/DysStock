from django.urls import path
from .views import (
    manage_withdrawals,
    get_workers,
    get_items,
    get_items_under_safety,
    update_stock,
)

#
urlpatterns = [
    path("withdrawals/", manage_withdrawals),
    path("withdrawals/<int:pk>/", manage_withdrawals),
    path("workers/", get_workers),
    path("items/", get_items),
    path("items/safety", get_items_under_safety),
    path("items/updateStock", update_stock),
]
