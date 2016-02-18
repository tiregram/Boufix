from django.db import models

from django.contrib.auth.models import User

class Member(models.Model):
    name  = models.CharField(max_length = 100)
    user_Acount_inside_club_Nix = models.ForeignKey(User)
    value = models.IntegerField()
    last_consomation = models.DateField();
    
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length = 200)
    price = models.IntegerField()
    hide = models.BooleanField(default=False)
    image = models.ImageField(upload_to="static")
    quantity = models.IntegerField()
    
    def __str__(self):
        return str(self.name) +":"+ str(self.price)

class Logs(models.Model):
    id = models.AutoField(primary_key=True)
    message = models.CharField(max_length = 200)
    
    date = models.DateField(auto_now=True)
    user = models.ForeignKey(Member,on_delete=models.CASCADE)
    product =models.ForeignKey(Product,on_delete=models.CASCADE) 
    
    def __str__(self):
        return str(self.date) +":"+str(self.message) +":"+str(self.user)
