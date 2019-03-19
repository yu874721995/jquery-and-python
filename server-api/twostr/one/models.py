from django.db import models
from datetime import datetime
import django.utils.timezone as timezone

class UserInfo(models.Model):
    id = models.AutoField(primary_key=True,blank=False)
    user = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
# Create your models here.
class user_host(models.Model):
    id = models.AutoField(primary_key=True,blank=False)
    host = models.CharField(max_length=200,blank=False)
    create_date = models.DateTimeField(default=timezone.now)
    response_body = models.TextField(max_length=200,default='ZZZ')
    request_body = models.TextField(max_length=200,default='',blank=True)
    userid = models.IntegerField()
    type = models.CharField(max_length=20,default='post')

class user_body(models.Model):
    id = models.AutoField(primary_key=True,blank=False)
    key = models.CharField(max_length=200,blank=True)
    value = models.CharField(max_length=200,blank=True)
    host = models.ForeignKey('user_host',on_delete=models.CASCADE)

class user_header(models.Model):
    id = models.AutoField(primary_key=True, blank=False)
    key = models.CharField(max_length=200, blank=True)
    value = models.CharField(max_length=200, blank=True)
    host = models.ForeignKey('user_host', on_delete=models.CASCADE)
