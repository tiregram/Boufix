from django.shortcuts import render
from django.http import HttpResponse 
from django.core import serializers
from .models import Member,Logs,Product
import datetime as dt
import json

# Create your views here.
def panel(request):
    all_menbers = Member.objects.all()
    
    context = {"menbers":all_menbers}
    return render(request,'snackix/index.html',context)

from django.contrib.auth.decorators import login_required
from django.db.models import Count
from datetime import date
from datetime import timedelta

@login_required
def show_consomation(request):
    all_product = Product.objects.all()

    date_end  = date.today()
    date_start  = date.today() - timedelta(days=30);

    all_logs = Logs.objects.filter(date__range=[date_start,date_end]).values("product__name").annotate(dcount=Count('product_id')).order_by("-dcount")
    all_members = Logs.objects.filter(date__range=[date_start,date_end]).values("user__name").annotate(dcount=Count('user_id')).order_by("-dcount")

    print(all_members)
    context = {"logs":all_logs,"members":all_members}

    return render(request,"snackix/conso.html",context)


def ajax_sub_credit(self,user_name,value):
    data = {}
    data["user_name"] = user_name
    data["type"] = "-"
    data["value"] = value
    a = Member.objects.get(name=user_name)
    data["old_value"] = a.value
    a.value  -= int(value)
    data["new_value"] =a.value
    
    a.save()
    
    Logs.objects.create(date=dt.datetime.today(),
                        message="add from ajax call "+data["value"],
                        user = a,
                        product = Product.objects.get(name="perso"))

    
    return HttpResponse(json.dumps(data), content_type = "application/json")

def ajax_aply_product(self,user_name,product):
    member  = Member.objects.get(name=user_name)
    product = Product.objects.get(name=product);
        
    data = {}
    data["user_name"] = user_name
    data["type"] = "-" if product.price<0 else "+"

    data["value"] = str(product.price)

    data["old_value"] = member.value
    member.value = member.value + product.price;
    product.quantity -=1
    data["new_value"] = member.value

    member.save()
    product.save()

    Logs.objects.create(date=dt.datetime.today(),
                        message ="apply from ajax call",
                        user = member,
                        product = product)
    
    outData = json.dumps(data)

    return HttpResponse(outData, content_type='application/json')


def ajax_add_credit(self,user_name,value):
    data = {}
    data["user_name"] = user_name
    data["type"] = "+"
    data["value"] = value
    a = Member.objects.get(name=user_name)
    data["old_value"] = a.value
    a.value  += int(value)
    data["new_value"] =a.value
    
    a.save()
    
    Logs.objects.create(date=dt.datetime.today(),message="add from ajax call "+data["value"], user = a,product = Product.objects.get(name="perso"))
    return HttpResponse(json.dumps(data), content_type='application/json')    
    


def ajax_get_log_menber(self,user_name):
    # on retouve le membre
    usr = Member.objects.get(name=user_name);

    lgs = Logs.objects.all().filter(user=usr)

    copy = []
    for a in lgs:
        
        one = dict()
        one["date"]=str(a.date)
        one["product"]=str(a.product)
        one["message"]=a.message
        copy.append(one);

    copy.reverse()
    data = json.dumps(copy)
    return HttpResponse(data, content_type='application/json')    
    
def ajax_get_all_menber(self):
    members = Member.objects.all()
    data = serializers.serialize("json", members)
    return HttpResponse(data, content_type='application/json')


def ajax_get_all_product(self):
    product = Product.objects.all().exclude(hide=True).order_by('price','name')
    data = serializers.serialize("json", product)
    return HttpResponse(data, content_type='application/json')


def ajax_get_one_menber(self,user_name):    
    member = Member.objects.get(name=user_name)
    data = serializers.serialize("json",{ member})    
    return HttpResponse(data, content_type='application/json')    

