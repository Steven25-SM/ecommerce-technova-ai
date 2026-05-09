from django.urls import path
from .views import recomendar

urlpatterns = [
    path('recomendar/', recomendar),
]