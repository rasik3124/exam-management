from django.contrib import admin
from .models import Room, Allocation, Studentrange
# Register your models here.
admin.site.register(Room)
admin.site.register(Allocation)
admin.site.register(Studentrange)