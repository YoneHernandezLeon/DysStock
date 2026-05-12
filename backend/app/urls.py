from django.urls import path
from .views import manage_withdrawals, get_workers, get_items

#
urlpatterns = [
    path("withdrawals/", manage_withdrawals),
    path("workers/", get_workers),
    path("items/", get_items),
]
