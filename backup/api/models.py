from django.db import models

# Create your models here.

class OwnerDetails(models.Model):
    name = models.CharField(max_length=250, null=False, blank=False)
    username = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(unique=True, max_length=254)

    def __str__(self):
        return self.name

class Groups(models.Model):
    groupName = models.CharField(max_length=150, null=False, blank=False)
    groupOwner = models.ForeignKey(OwnerDetails, on_delete=models.CASCADE)
    groupPassCode = models.CharField(max_length=10, null=False, blank=False)

    def __str__(self):
        return self.groupName

class Members(models.Model):
    memberName = models.CharField(max_length=250, null=False, blank=False)
    memberUserName = models.CharField(max_length=50, null=False, blank=False)
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)

    def __str__(self):
        return self.memberName