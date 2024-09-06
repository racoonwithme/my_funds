# transactions/urls.py
from django.urls import path
from .views import get_transactions, create_transaction, get_categories

urlpatterns = [
    path('transactions/', get_transactions, name='get_transactions'),
    path('transactions/create/', create_transaction, name='create_transaction'),
    path('categories/', get_categories, name='get_categories'),  # Новый маршрут для получения категорий
]