from django.db import models

class KesimVerileri(models.Model):
    x_kesim = models.IntegerField()
    x_adet = models.IntegerField()
    y_kesim = models.IntegerField()
    y_adet = models.IntegerField()
    z_kesim = models.IntegerField()
    z_adet = models.IntegerField()
    w_kesim = models.IntegerField()
    w_adet = models.IntegerField()
    barkod = models.IntegerField()

    def __str__(self):
        return f"Barkod: {self.barkod}"
