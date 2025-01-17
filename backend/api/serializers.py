from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Author, Book

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']
        
        

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name']
        
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'name', 'description', 'author', 'author_name']
        
    author_name = serializers.SerializerMethodField()
        
    def get_author_name(self, obj):
        return obj.author.name
    
    
    