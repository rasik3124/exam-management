from django.urls import path
from .views import RoomCreateList, export_allocation_csv, auto_allocation, StudentRangeCreateList
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Allocation

# Urls logic 
@api_view(["POST", "GET"])
def run_allocation(request):
    if request.method == "POST":
        allocation = auto_allocation()
        return Response({"status":"success","allocated":len(allocation)})   
    else: #GET
        allocation = Allocation.objects.select_related("room").all()
        data = [{"room_name": a.room.name,"student_reg":a.student_reg,} for a in allocation]
        return Response(data)

urlpatterns = [
    path("rooms/", RoomCreateList.as_view(), name="room-list-create"),
    path("student-ranges/", StudentRangeCreateList.as_view(), name="studentrange-list-create"),
    path("allocate/", run_allocation, name="auto-allocation"),
    path("export/", export_allocation_csv, name="export-allocation"),
]