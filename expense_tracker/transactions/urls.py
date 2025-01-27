# transactions/urls.py
from django.urls import path
from .views import get_transactions, create_transaction, get_categories, create_category, delete_category

urlpatterns = [
    path('transactions/', get_transactions, name='get_transactions'),
    path('transactions/create/', create_transaction, name='create_transaction'),
    path('categories/', get_categories, name='get_categories'),
    path('categories/create/', create_category, name='create_category'),
    path('categories/delete/<int:category_id>/', delete_category, name='delete_category')
]