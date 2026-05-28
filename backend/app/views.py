from django.shortcuts import render
from django.db.models import F
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Withdrawal, WithdrawalLine, Item, Worker
from .serializers import (
    AddStockToItemSerializer,
    AddWithdrawalSerializer,
    WithdrawalSerializer,
    WorkerSerializer,
    ItemSerializer,
)


@api_view(["GET", "POST", "DELETE"])
def manage_withdrawals(request, pk=-1):
    if request.method == "GET":
        withdrawals = Withdrawal.objects.values("id", "date", "worker_id").order_by(
            "-id"
        )
        lines = WithdrawalLine.objects.values(
            "id", "item_id", "item__description", "quantity", "withdrawal_id"
        ).order_by("withdrawal_id")
        items = Item.objects.values(
            "id", "description", "reference_code", "location__code"
        )
        workers = Worker.objects.all()

        workers_dict = {w.id: {"id": w.id, "name": w.name} for w in workers}

        items_dict = {
            i["id"]: {
                "item": i["description"],
                "reference_code": i["reference_code"],
                "location": i["location__code"],
            }
            for i in items
        }

        lines_of_withdrawal = {}

        for line in lines:
            try:
                item = items_dict.get(int(line["item_id"]))
            except ValueError:
                continue

            if item is None:
                continue

            line_data = {
                "id": line["id"],
                "description": line["item__description"],
                "reference_code": item["reference_code"],
                "location": item["location"],
                "quantity": line["quantity"],
            }

            lines_of_withdrawal.setdefault(line["withdrawal_id"], []).append(line_data)

        data = []

        for withdrawal in withdrawals:
            worker = workers_dict.get(int(withdrawal["worker_id"]))

            data.append(
                {
                    "id": withdrawal["id"],
                    "worker": worker["name"],
                    "date": withdrawal["date"],
                    "lines": lines_of_withdrawal.get(withdrawal["id"], []),
                }
            )

        serializer = WithdrawalSerializer(data, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        serializer = AddWithdrawalSerializer(data=request.data)

        safety_items = []

        if serializer.is_valid():
            withdrawal = Withdrawal.objects.create(
                worker_id=serializer.validated_data["worker"]
            )

            for data in serializer.data["lines"]:
                line = WithdrawalLine.objects.create(
                    withdrawal_id=withdrawal.id,
                    item_id=data["id"],
                    quantity=data["quantity"],
                )

                item = Item.objects.get(id=data["id"])
                item.stock = item.stock - data["quantity"]

                if item.safety_warning and item.stock <= item.safety_stock:
                    safety_items.append(item)

                line.save()
                item.save(update_fields=["stock"])

            withdrawal.save()

            safety_serializer = ItemSerializer(safety_items, many=True)

            return Response(safety_serializer.data)

        return Response("OK", status=404)

    elif request.method == "DELETE":
        try:
            line = WithdrawalLine.objects.get(id=pk)

            item = Item.objects.get(id=line.item_id)
            item.stock += line.quantity

            item.save()

            withdrawal_id = line.withdrawal_id

            line.delete()

            if len(WithdrawalLine.objects.filter(withdrawal_id=withdrawal_id)) == 0:
                withdrawal = Withdrawal.objects.get(id=withdrawal_id)
                withdrawal.delete()

            return Response(
                {"message": "Eliminado correctamente"},
                status=status.HTTP_200_OK,
            )

        except WithdrawalLine.DoesNotExist:
            return Response(
                {"error": "No se encontró la linea"}, status=status.HTTP_404_NOT_FOUND
            )


@api_view(["GET"])
def get_workers(request):

    workers = Worker.objects.values("id", "code", "name").order_by("code")

    serializer = WorkerSerializer(workers, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def get_items(request):
    items = Item.objects.values(
        "id",
        "reference_code",
        "location__code",
        "description",
        "stock",
        "safety_stock",
        "observations",
    )

    serializer = ItemSerializer(items, many=True)

    return Response(serializer.data)


@api_view(["POST"])
def update_stock(request):
    serializer = AddStockToItemSerializer(data=request.data)

    if serializer.is_valid():

        item = Item.objects.get(reference_code=serializer.data["reference_code"])

        item.stock = serializer.data["stock"] + item.stock

        item.save()

        return Response("OK")

    return Response("NOT OK", status=404)


@api_view(["GET"])
def get_items_under_safety(request):
    items = Item.objects.filter(
        stock__lte=F("safety_stock"), safety_warning=True
    ).values(
        "id",
        "reference_code",
        "location__code",
        "description",
        "stock",
        "safety_stock",
        "observations",
    )

    serializer = ItemSerializer(items, many=True)

    return Response(serializer.data)
