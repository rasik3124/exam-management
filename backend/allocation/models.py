from django.db import models

# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=50)
    capacity = models.IntegerField()

def __str__(self):
    return self.name

class Studentrange(models.Model):
    start_reg = models.IntegerField()
    end_reg = models.IntegerField()
    exclude_reg = models.JSONField(default=list)

    
class Allocation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    student_reg = models.IntegerField()