import pandas as pd
import numpy as np
import json


from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db import connection

 
from .models import Categoria
from .models import Ranking
 
# Create your views here.
_QUERY = '''
SELECT co.country,
       co.rank_year::text AS year,
       co.count::int AS total
FROM
  (SELECT countries.country,
          years.rank_year,
          count(top.*)
   FROM
     (SELECT DISTINCT rank_year
      FROM rankings) years
   CROSS JOIN
     (SELECT DISTINCT country
      FROM rankings) countries
   LEFT JOIN rankings top ON countries.country = top.country
   AND years.rank_year = top.rank_year -- WHERE rank_month = 11
 -- WHERE countries.country in ('Colombia')

'''
_QUERY_PART_3 = '''

   GROUP BY countries.country,
            years.rank_year
   ORDER BY countries.country,
            years.rank_year ASC)co
'''

_WHERE_TOP_10 = '''

   WHERE countries.country IN (
  
       select country
        from rankings 
        where rank_year = (select max(rank_year) from rankings) 
        group by country
        order by min(ranking) limit 10
   
   )

'''


def top500_totales_list(request):
    
    df = pd.read_sql_query(_QUERY+_QUERY_PART_3, connection)

    ds_cc = df
    ds_cc = ds_cc.set_index('year')
    # del ds_cc['crecimiento']

    ds_cc = ds_cc.sort_index()
    ds_cc = ds_cc.pivot(columns='country', values='total')

    j = json.loads(ds_cc.to_json(orient='split'))
    return JsonResponse(j) 

def top500_crecimientos_list(request):
    
    df = pd.read_sql_query(_QUERY+_WHERE_TOP_10+_QUERY_PART_3, connection)

    ds_cc = df
    ds_cc = ds_cc.set_index('year')
    # del ds_cc['crecimiento']

    ds_cc = ds_cc.sort_index()
    ds_cc = ds_cc.pivot(columns='country', values='total')

    ds_cc = ds_cc.pct_change(axis='rows').replace([np.nan], 0).replace([np.inf, -np.inf], 1)

    j = json.loads(ds_cc.to_json(orient='split'))
    return JsonResponse(j) 

def top500_crecimiento(request,pk):
    
    df = pd.read_sql_query(_QUERY+"WHERE countries.country = '"+pk+"' "+_QUERY_PART_3, connection)

    ds_cc = df
    ds_cc = ds_cc.set_index('year')
    # del ds_cc['crecimiento']

    ds_cc = ds_cc.sort_index()
    ds_cc = ds_cc.pivot(columns='country', values='total')

    ds_cc = ds_cc.pct_change(axis='rows').replace([np.nan], 0).replace([np.inf, -np.inf], 1)

    j = json.loads(ds_cc.to_json(orient='split'))
    return JsonResponse(j) 

def categoria_list(request):
    MAX_OBJECTS = 20
    cat = Categoria.objects.all()[:MAX_OBJECTS]
    data = {"results": list(cat.values("descripcion","activo"))}
    return JsonResponse(data)
 
def categoria_detalle(request,pk):
    cat = get_object_or_404(Categoria, pk=pk)
    data = {"results": {
        "descripcion": cat.descripcion,
        "activo": cat.activo
        }}
    return JsonResponse(data)