from rest_framework import serializers
from .models import Clientes, Articulos


class FactulineaSerializer(serializers.Serializer):
    numlinea = serializers.IntegerField()
    producto = serializers.CharField()
    referencia = serializers.CharField()
    cantidad = serializers.IntegerField()


class FacturasSerializer(serializers.Serializer):
    codfactura = serializers.IntegerField()
    cliente = serializers.CharField()
    fecha = serializers.DateField(format="%d-%m-%Y")
    lineas = FactulineaSerializer(many=True)


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = ['codcliente', 'nombre']


class ArticulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulos
        fields = ['codarticulo', 'referencia', 'descripcion', 'stock', 'stock_minimo']
