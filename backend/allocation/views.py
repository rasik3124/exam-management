from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Room, Studentrange, Allocation
from .serializers import RoomSerializer, StudentrangeSerializer, AllocationSerializer
from django.http import HttpResponse
import csv

# Create your views here.

class RoomCreateList(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        serilaizer = RoomSerializer(rooms, many=True)
        return Response(serilaizer.data)
    
    def post(self, request):
        serialzer = RoomSerializer(data=request.data)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data)
        return Response(serialzer.errors)
    
class StudentRangeCreateList(APIView):
    def get(self, request):
        ranges = Studentrange.objects.all()
        serializer = StudentrangeSerializer(ranges, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = StudentrangeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
def auto_allocation():
    rooms = Room.objects.all().order_by("id")
    stud_range = Studentrange.objects.all()

    # This is for student list but still i feel like i need to use a format here in the reg storeage
    student = []
    for studreg in stud_range:
        student += [i for i in range(studreg.start_reg, studreg.end_reg+1) if i not in studreg.exclude_reg]

    allocation = []
    student_index = 0

    for room in rooms:
        for i in range(room.capacity):
            if student_index >= len(student):
                break
            allocation.append(Allocation(room=room, student_reg=student[student_index]))
            student_index += 1

    try:
        Allocation.objects.bulk_create(allocation)
    except Exception as e:
        print("Bulk create error:", e)
        raise e
    return allocation

def export_allocation_csv(request):
    response = HttpResponse(content_type="text/csv")
    response['content_disposition'] = 'attachment; filename="allocation.csv"'

    writer = csv.writer(response)
    #Write header Row
    writer.writerow(["Room name", "Student Reg"])

    #fetch Allocation
    allocation = Allocation.objects.select_related("room").all()
    for alloc in allocation:
        writer.writerow([alloc.room.name, alloc.student_reg])

    return response