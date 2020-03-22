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

_QUERY_CONTINENT = '''
select y.rank_year as year,c.code, c.name as continent, coalesce(total,0) as total
from continents c 
cross join ( select distinct rankings.rank_year from rankings ) y

left outer join (
  select rank_year,continent ,count(*) as total
  from rankings
  group by rank_year, continent
)con on con.continent = c.name and y.rank_year = con.rank_year
order by y.rank_year, c.name
'''

_QUERY_COUNTRY = '''
select rank_year as year,country ,count(*) as total
from rankings
group by rank_year, country
ORDER BY rank_year,country
'''


_QUERY_OS = '''
select rank_year as year, os, total 
from (
select  row_number() over(partition by rank_year order by rank_year, os) num ,rank_year, os ,count(*) as total
from rankings
group by rank_year, os
)con
where num <= 15
ORDER BY rank_year asc,total desc
'''

_QUERY_MANUFACTURER = '''
select rank_year as year, manufacturer, total 
from (
select  row_number() over(partition by rank_year order by rank_year, manufacturer) num ,rank_year, manufacturer ,count(*) as total
from rankings
group by rank_year, manufacturer
)con
where num <= 15
ORDER BY rank_year asc,total desc
'''

_QUERY_ARCHITECTURE = '''
select rank_year as year, architecture, total 
from (
select  row_number() over(partition by rank_year order by rank_year, architecture) num ,rank_year, architecture ,count(*) as total
from rankings
group by rank_year, architecture
)con
where num <= 15
ORDER BY rank_year asc,total desc
'''

_QUERY_PROCESSOR = '''
select rank_year as year, processor, total 
from (
select  row_number() over(partition by rank_year order by rank_year, processor) num ,rank_year, processor ,count(*) as total
from rankings
group by rank_year, processor
)con
where num <= 15
ORDER BY rank_year asc,total desc
'''

_QUERY_MHZ = '''
select rank_year as year, mhz, total 
from (
select  row_number() over(partition by rank_year order by rank_year, mhz) num ,rank_year, mhz ,count(*) as total
from rankings
group by rank_year, mhz
)con
where num <= 15
ORDER BY rank_year asc,total desc
'''

_QUERY_RMAX = '''
select rank_year as year, rmax, total 
from (
select  row_number() over(partition by rank_year order by rank_year, rmax) num ,rank_year, rmax ,count(*) as total
from rankings
group by rank_year, rmax
)con
where num <= 15
ORDER BY rank_year asc,total desc
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

def top500_continentes(request):
    
    df = pd.read_sql_query(_QUERY_CONTINENT, connection)

    ds_cc = df
    ds_cc = ds_cc.set_index('year')
    # del ds_cc['crecimiento']

    ds_cc = ds_cc.sort_index()
    #ds_cc = ds_cc.pivot(columns='continent', values='total')

    grouped = ds_cc.groupby(level=0).apply(lambda x: json.loads(x.to_json(orient='split'))) 
    data = []

    for el in grouped.values:
        data.append({
            'year' : el["index"][0],
            'data' : el["data"]
        })

    j = {'data' : data}

    #j = json.loads(grouped.to_json(orient='split'))
    return JsonResponse(j)   


def top500_countries(request):
    
    df = pd.read_sql_query(_QUERY_COUNTRY, connection)

    ds_cc = df
    ds_cc = ds_cc.set_index('year')

    ds_cc = ds_cc.sort_index()

    grouped = ds_cc.groupby(level=0).apply(lambda x: json.loads(x.to_json(orient='split'))) 
    data = []

    for el in grouped.values:
        data.append({
            'year' : el["index"][0],
            'data' : el["data"]
        })

    j = {'data' : data}

    return JsonResponse(j)  


def top500_os(request):
    
    df = pd.read_sql_query(_QUERY_OS, connection)

    data = []

    ds_cc = df
    piv = ds_cc.set_index('year')
    piv = piv.sort_index()
    piv = piv.pivot(columns='os', values='total')

    for i in range(0,len(piv.index)):
        #print(piv.index[i])
        p0 = ds_cc.loc[ds_cc['year'] == piv.index[i]]    
        p0 = p0.set_index('year')
        #p0 = p0.sort_values(by=['total'], ascending=False)
        p0 = p0.pivot(columns='os', values='total')
        
        t = []
        for e in range(0,len(p0.columns)):
            t.append([p0.columns[e], p0.values[0][e].item()])
        
        data.append({
            'year' : piv.index[i].item(),
            'data' : t
        })

    j = {'data' : data}

    return JsonResponse(j)


def top500_os(request):
    
    df = pd.read_sql_query(_QUERY_OS, connection)

    data = []

    ds_cc = df
    piv = ds_cc.set_index('year')
    piv = piv.sort_index()
    piv = piv.pivot(columns='os', values='total')

    for i in range(0,len(piv.index)):
        #print(piv.index[i])
        p0 = ds_cc.loc[ds_cc['year'] == piv.index[i]]    
        p0 = p0.set_index('year')
        #p0 = p0.sort_values(by=['total'], ascending=False)
        p0 = p0.pivot(columns='os', values='total')
        
        t = []
        for e in range(0,len(p0.columns)):
            t.append([p0.columns[e], p0.values[0][e].item()])
        
        data.append({
            'year' : piv.index[i].item(),
            'data' : t
        })

    j = {'data' : data}

    return JsonResponse(j)  
    
def top500_manufacturer(request):
    
    df = pd.read_sql_query(_QUERY_MANUFACTURER, connection)

    data = []

    ds_cc = df
    piv = ds_cc.set_index('year')
    piv = piv.sort_index()
    piv = piv.pivot(columns='manufacturer', values='total')

    for i in range(0,len(piv.index)):
        #print(piv.index[i])
        p0 = ds_cc.loc[ds_cc['year'] == piv.index[i]]    
        p0 = p0.set_index('year')
        #p0 = p0.sort_values(by=['total'], ascending=False)
        p0 = p0.pivot(columns='manufacturer', values='total')
        
        t = []
        for e in range(0,len(p0.columns)):
            t.append([p0.columns[e], p0.values[0][e].item()])
        
        data.append({
            'year' : piv.index[i].item(),
            'data' : t
        })

    j = {'data' : data}

    return JsonResponse(j)  
    
def top500_architecture(request):
    
    df = pd.read_sql_query(_QUERY_ARCHITECTURE, connection)

    data = []

    ds_cc = df
    piv = ds_cc.set_index('year')
    piv = piv.sort_index()
    piv = piv.pivot(columns='architecture', values='total')

    for i in range(0,len(piv.index)):
        #print(piv.index[i])
        p0 = ds_cc.loc[ds_cc['year'] == piv.index[i]]    
        p0 = p0.set_index('year')
        #p0 = p0.sort_values(by=['total'], ascending=False)
        p0 = p0.pivot(columns='architecture', values='total')
        
        t = []
        for e in range(0,len(p0.columns)):
            t.append([p0.columns[e], p0.values[0][e].item()])
        
        data.append({
            'year' : piv.index[i].item(),
            'data' : t
        })

    j = {'data' : data}

    return JsonResponse(j)  
    
def top500_processor(request):
    
    df = pd.read_sql_query(_QUERY_PROCESSOR, connection)

    data = []

    ds_cc = df
    piv = ds_cc.set_index('year')
    piv = piv.sort_index()
    piv = piv.pivot(columns='processor', values='total')

    for i in range(0,len(piv.index)):
        #print(piv.index[i])
        p0 = ds_cc.loc[ds_cc['year'] == piv.index[i]]    
        p0 = p0.set_index('year')
        #p0 = p0.sort_values(by=['total'], ascending=False)
        p0 = p0.pivot(columns='processor', values='total')
        
        t = []
        for e in range(0,len(p0.columns)):
            t.append([p0.columns[e], p0.values[0][e].item()])
        
        data.append({
            'year' : piv.index[i].item(),
            'data' : t
        })

    j = {'data' : data}

    return JsonResponse(j)  
    
def top500_mhz(request):
    
    df = pd.read_sql_query(_QUERY_MHZ, connection)

    data = []

    ds_cc = df
    piv = ds_cc.set_index('year')
    piv = piv.sort_index()
    piv = piv.pivot(columns='mhz', values='total')

    for i in range(0,len(piv.index)):
        #print(piv.index[i])
        p0 = ds_cc.loc[ds_cc['year'] == piv.index[i]]    
        p0 = p0.set_index('year')
        #p0 = p0.sort_values(by=['total'], ascending=False)
        p0 = p0.pivot(columns='mhz', values='total')
        
        t = []
        for e in range(0,len(p0.columns)):
            t.append([p0.columns[e], p0.values[0][e].item()])
        
        data.append({
            'year' : piv.index[i].item(),
            'data' : t
        })

    j = {'data' : data}

    return JsonResponse(j)  
    
def top500_rmax(request):
    
    df = pd.read_sql_query(_QUERY_RMAX, connection)

    data = []

    ds_cc = df
    piv = ds_cc.set_index('year')
    piv = piv.sort_index()
    piv = piv.pivot(columns='rmax', values='total')

    for i in range(0,len(piv.index)):
        #print(piv.index[i])
        p0 = ds_cc.loc[ds_cc['year'] == piv.index[i]]    
        p0 = p0.set_index('year')
        #p0 = p0.sort_values(by=['total'], ascending=False)
        p0 = p0.pivot(columns='rmax', values='total')
        
        t = []
        for e in range(0,len(p0.columns)):
            t.append([p0.columns[e], p0.values[0][e].item()])
        
        data.append({
            'year' : piv.index[i].item(),
            'data' : t
        })

    j = {'data' : data}

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