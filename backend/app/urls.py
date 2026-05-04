from django.urls import path
from .views import get_withdrawals, get_workers, get_items

urlpatterns = [
    path('withdrawals/', get_withdrawals),
    path('workers/', get_workers),
    path('items/', get_items)
]