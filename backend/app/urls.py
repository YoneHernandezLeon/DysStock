from django.urls import path
from .views import (
    generate_xlsx_by_reference,
    generate_xlsx_by_safety_stock,
    get_items_by_location,
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
    path("items/xlsx-ref", generate_xlsx_by_reference),
    path("items/location/", get_items_by_location),
    #path("items/xlsx-loc", generate_xlsx_by_location),
    path("items/safety/", get_items_under_safety),
    path("items/xlsx-saf", generate_xlsx_by_safety_stock),
    path("items/updateStock/", update_stock),
]
