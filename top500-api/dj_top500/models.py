from django.db import models

# Create your models here.
class Categoria(models.Model):
	descripcion=models.CharField(max_length=100)
	activo = models.BooleanField(default=True)

	def __str__(self):
		return '{}'.format(self.descripcion)

	class Meta:
		verbose_name_plural = "Categorias"


class Ranking(models.Model):
	ranking = models.IntegerField()


	site=models.CharField(max_length=400)
	manufacturer=models.CharField(max_length=200)
	country=models.CharField(max_length=100)
	year = models.IntegerField()
	rmax = models.FloatField()
	rank_month = models.IntegerField()
	rank_year = models.IntegerField()


	def __str__(self):
		return '{}'.format(self.descripcion)

	class Meta:
		verbose_name_plural = "Rankings"