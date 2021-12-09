import django_filters
from main.models import Order


class OrderFilter(django_filters.FilterSet):
    """Фильтрация заказов по цене, дате опубликования, срокам выполнения и темам"""
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    start_date = django_filters.DateFilter(field_name="publication_date", lookup_expr="gte")
    end_date = django_filters.DateFilter(field_name="publication_date", lookup_expr="lte")
    min_deadline = django_filters.NumberFilter(field_name="deadline", lookup_expr="gte")
    max_deadline = django_filters.NumberFilter(field_name="deadline", lookup_expr="lte")
    topic = django_filters.BaseInFilter(field_name="topic")

    class Meta:
        model = Order
        fields = ['topic', 'price', 'deadline', 'publication_date']