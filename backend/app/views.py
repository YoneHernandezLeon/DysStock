from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Facturas, Factulinea, Articulos, Clientes
from .serializers import FacturasSerializer, ClienteSerializer, ArticulosSerializer

@api_view(['GET'])
def get_withdrawals(request):
    withdrawals = Facturas.objects.values('codfactura', 'fecha', 'codcliente').order_by('-codfactura')
    lines = Factulinea.objects.values('numlinea', 'codigo', 'cantidad', 'codfactura').order_by('codfactura', 'numlinea')
    items = Articulos.objects.all()
    workers = Clientes.objects.all()
    
    workers_dict = {
        w.codcliente: {
            "codcliente": w.codcliente,
            "nombre": w.nombre
        }
        for w in workers
    }
    
    items_dict = {
        i.codarticulo: {
            "producto": i.descripcion,
            "referencia": i.referencia
        }
        for i in items
    }
    
    lines_of_withdrawal = {}
    
    for line in lines:
        try:
            item = items_dict.get(int(line["codigo"]))
        except ValueError:
            continue
        
        if item is None: continue
        
        line_data = {
            "numlinea": line["numlinea"],
            "producto": item["producto"],
            "referencia": item["referencia"],
            "cantidad": line["cantidad"]
        }
        
        lines_of_withdrawal.setdefault(line["codfactura"], []).append(line_data)
        
    data = []
    
    for withdrawal in withdrawals:
        worker = workers_dict.get(int(withdrawal["codcliente"]))
        
        data.append({
            "codfactura": withdrawal["codfactura"],
            "cliente": worker["nombre"],
            "fecha": withdrawal["fecha"],
            "lineas": lines_of_withdrawal.get(withdrawal["codfactura"], [])
        })
        
    serializer = FacturasSerializer(data, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_workers(request):
    
    workers = Clientes.objects.values('codcliente', 'nombre').order_by('codcliente')
    
    serializer = ClienteSerializer(workers, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def get_items(request):
    items = Articulos.objects.values('codarticulo', 'referencia', 'descripcion', 'stock', 'stock_minimo')
    
    serializer = ArticulosSerializer(items, many=True)
    
    return Response(serializer.data)
    