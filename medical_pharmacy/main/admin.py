from django.contrib import admin
from models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Substance)
admin.site.register(MedicineForm)
admin.site.register(MedicineApplication)
admin.site.register(MedicineUse)
admin.site.register(Medicine)
admin.site.register(Order)