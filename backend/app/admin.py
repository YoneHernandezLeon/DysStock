from django.contrib import admin
from .models import *


class ItemAdmin(admin.ModelAdmin):
    search_fields = ("reference_code",)


class WorkerAdmin(admin.ModelAdmin):
    pass


class LocationAdmin(admin.ModelAdmin):
    pass


class WithdrawalAdmin(admin.ModelAdmin):
    pass


class WIthdrawalLineAdmin(admin.ModelAdmin):
    pass


admin.site.register(Item, ItemAdmin)
admin.site.register(Worker, WorkerAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Withdrawal, WithdrawalAdmin)
admin.site.register(WithdrawalLine, WIthdrawalLineAdmin)
