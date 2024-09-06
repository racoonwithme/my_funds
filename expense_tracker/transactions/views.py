# transactions/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Transaction, Category
import json

@csrf_exempt
def get_transactions(request):
    transactions = Transaction.objects.all()
    data = [
        {
            'category': transaction.category.name,
            'amount': str(transaction.amount),
            'comment': transaction.comment,
            'date': transaction.date.strftime('%Y-%m-%d')
        }
        for transaction in transactions
    ]
    return JsonResponse(data, safe=False)

@csrf_exempt
def create_transaction(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        category_name = data['category']
        subcategory_name = data.get('subcategory', None)

        # Создание или получение категории
        category, created = Category.objects.get_or_create(name=category_name, parent=None)

        # Создание или получение подкатегории
        if subcategory_name:
            subcategory, created = Category.objects.get_or_create(name=subcategory_name, parent=category)
            transaction = Transaction(
                category=subcategory,
                amount=data['amount'],
                comment=data.get('comment', ''),
                date=data['date']
            )
        else:
            transaction = Transaction(
                category=category,
                amount=data['amount'],
                comment=data.get('comment', ''),
                date=data['date']
            )
        
        transaction.save()
        return JsonResponse({'message': 'Transaction created successfully'}, status=201)
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def get_categories(request):
    categories = Category.objects.filter(parent=None)
    data = [
        {
            'id': category.id,
            'name': category.name,
            'subcategories': [{'id': sub.id, 'name': sub.name} for sub in category.subcategories.all()]
        }
        for category in categories
    ]
    return JsonResponse(data, safe=False)