from django.urls import path
from .views import categoria_list,categoria_detalle, top500_totales_list, top500_crecimientos_list
 
urlpatterns = [
    path('categorias/', categoria_list,name='categoria_list' ),
    path('categorias/<int:pk>', categoria_detalle,name='categoria_detalle' ),
    path('totales/', top500_totales_list,name='top500_totales_list' ),
    path('crecimientos/', top500_crecimientos_list,name='top500_crecimientos_list' ),
]