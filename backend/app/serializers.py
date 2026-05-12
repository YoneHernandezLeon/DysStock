from rest_framework import serializers
from .models import Worker, Item


class WithdrawalLineSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    description = serializers.CharField()
    reference_code = serializers.CharField()
    location = serializers.CharField()
    quantity = serializers.IntegerField()


class WithdrawalSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    worker = serializers.CharField()
    date = serializers.DateField(format="%d-%m-%Y")
    lines = WithdrawalLineSerializer(many=True)


class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ["id", "code", "name"]


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "reference_code", "description", "stock", "safety_stock"]


class AddWithdrawalLineSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    reference_code = serializers.CharField()
    description = serializers.CharField()
    quantity = serializers.IntegerField()


class AddWithdrawalSerializer(serializers.Serializer):
    worker = serializers.IntegerField()
    lines = AddWithdrawalLineSerializer(many=True)
