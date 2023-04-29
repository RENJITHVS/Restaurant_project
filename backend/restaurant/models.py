from django.db import models


class Category(models.Model):
    type = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.type

class MenuItem(models.Model):

    class MenuObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='available')
        
    options = (
        ('available', 'Available'),
        ('unavailable', 'Unavailable'),
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    cost = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='menu_items/', default='default.jpeg',blank=True, null=True)
    status = models.CharField(
        max_length=15, choices=options, default='available')
    
    objects = models.Manager()  # default manager
    menuobjects = MenuObjects()  # custom manager
    
    class Meta:
        unique_together = ('category', 'name')
    
    def __str__(self):
        return f"{self.name} ({self.category})"