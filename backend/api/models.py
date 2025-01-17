from django.db import models

# Create your models here.
class Author(models.Model):
    class Meta:
        verbose_name = ("Author")
        verbose_name_plural = ("Authors")
        
    name = models.CharField(max_length=100, blank=False, null=False, verbose_name='Имя автора')

    def __str__(self):
        return self.name


class Book(models.Model):
    class Meta:
        verbose_name = ("Book")
        verbose_name_plural = ("Books")
        ordering = ('-pk',)
        
        
    name = models.CharField(max_length=100, blank=False, null=False, verbose_name='Название книги')
    description = models.TextField(null=True, blank=True, verbose_name='Описание книги')
    author = models.ForeignKey(Author, on_delete=models.DO_NOTHING, verbose_name='Писатель книги')
    
