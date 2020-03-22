from django.urls import path
from .views import categoria_list,categoria_detalle, top500_totales_list, top500_crecimientos_list, top500_crecimiento, top500_continentes, top500_countries, top500_os, top500_os, top500_manufacturer, top500_architecture, top500_processor, top500_mhz, top500_rmax

urlpatterns = [
    path('categorias/', categoria_list,name='categoria_list' ),
    path('categorias/<int:pk>', categoria_detalle,name='categoria_detalle' ),
    path('totales/', top500_totales_list,name='top500_totales_list' ),
    path('crecimientos/', top500_crecimientos_list,name='top500_crecimientos_list' ),
    path('crecimiento/<str:pk>', top500_crecimiento,name='top500_crecimiento' ),
    path('continentes/', top500_continentes,name='top500_continentes' ),
    path('countries/', top500_countries,name='top500_countries' ),
    path('os/', top500_os,name='top500_os' ), 
	path('manufacturer/', top500_manufacturer,name='top500_manufacturer' ), 
	path('architecture/', top500_architecture,name='top500_architecture' ), 
	path('processor/', top500_processor,name='top500_processor' ), 
	path('mhz/', top500_mhz,name='top500_mhz' ), 
	path('rmax/', top500_rmax,name='top500_rmax' ),
]