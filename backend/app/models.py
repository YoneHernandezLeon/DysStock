from django.db import models


class Worker(models.Model):
    code = models.IntegerField(verbose_name="Código", unique=True)
    name = models.CharField(verbose_name="Nombre", max_length=50)

    def __str__(self):
        return str(self.code) + " - " + self.name

    class Meta:
        verbose_name = "Empleado"
        verbose_name_plural = "Empleados"


class Location(models.Model):
    code = models.CharField(verbose_name="Código", unique=True, max_length=15)

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = "Ubicación"
        verbose_name_plural = "Ubicaciones"


class Item(models.Model):
    reference_code = models.CharField(
        verbose_name="Referencia", unique=True, max_length=20
    )
    description = models.CharField(verbose_name="Descripción", max_length=150)
    location = models.ForeignKey(
        Location, verbose_name="Ubicación", on_delete=models.CASCADE, null=True
    )
    stock = models.IntegerField(verbose_name="Stock", default=0)
    safety_stock = models.IntegerField(verbose_name="Stock bajo mínimos", default=0)
    safety_warning = models.BooleanField(
        verbose_name="Aviso de stock bajo mínimos", default="True"
    )
    observations = models.CharField(
        verbose_name="Observaciones", max_length=300, blank=True, null=True
    )

    def __str__(self):
        return self.reference_code + " - " + self.description

    class Meta:
        verbose_name = "Artículo"
        verbose_name_plural = "Artículos"


class Withdrawal(models.Model):
    date = models.DateField(verbose_name="Fecha de salida", auto_now_add=True)
    worker = models.ForeignKey(
        Worker, verbose_name="Empleado", on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Salida"
        verbose_name_plural = "Salidas"


class WithdrawalLine(models.Model):
    withdrawal = models.ForeignKey(
        Withdrawal, verbose_name="Salida", on_delete=models.CASCADE
    )
    item = models.ForeignKey(Item, verbose_name="Artículo", on_delete=models.CASCADE)
    quantity = models.IntegerField(verbose_name="Cantidad")

    class Meta:
        verbose_name = "Linea de salida"
        verbose_name_plural = "Lineas de salida"
