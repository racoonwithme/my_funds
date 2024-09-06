from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')

    class Meta:
        app_label = 'expense_tracker'

    def __str__(self):
        return self.name

class Transaction(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True, null=True)
    date = models.DateField()

    class Meta:
        app_label = 'expense_tracker'

    def __str__(self):
        return f"{self.category.name}: {self.amount} on {self.date}"