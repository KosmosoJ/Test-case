from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, viewsets

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Author, Book

from .serializers import UserSerializer, AuthorSerializer, BookSerializer

@api_view(['POST'])
def signup(request):
    """ Api для регистрации пользователя
        /api/signup
    
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    """ Api для входа пользователя 
        /api/login
    """
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    """ Проверка аутентификации
        /api/check
    """
    return Response({'message':'u fine'})

@api_view(['PATCH'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_profile_email(request):
    """ Api для редактирования почты пользователя 
        /api/profile
    """
    user = get_object_or_404(User, pk=request.data['id'])
    user.email = request.data['email']
    user.save()
    token, created = Token.objects.get_or_create(user=user)
    
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})



class AuthorViewSet(viewsets.ModelViewSet):
    """
        Methods = Get, Post, Put, Patch, Delete
        Вьюха для писателей.
        
    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        """ Выдача прав на Get запросы для всех пользователей """
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]        
        return super(AuthorViewSet, self).get_permissions()
    
    
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def get_books_by_author(request, pk):
    """ Фильтрация книг по писателю
        /api/bookbyauthor/{pk}
    """
    try:
        books = Book.objects.filter(author=pk)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    except Author.DoesNotExist:
        return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)

    
class BookViewSet(viewsets.ModelViewSet):
    """Methods = Get, Post, Put, Patch, Delete
        Вьюха для книг
        """
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [TokenAuthentication]
    
    
    def get_permissions(self):
        """ Выдача прав  на Get запрос для каждого пользователя"""
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]        
        return super(BookViewSet, self).get_permissions()
    
    def create(self, request):
        """ Создание и сохранение нового автора с последующим созданием книги с новым автором """
        if not request.data['author'].isdigit():
            author = Author(name=request.data['author'])
            author.save()
            request.data['author'] = author.pk
            
        return super().create(request)
    
    def update(self, request,pk):
        """ Создание и сохранение нового автора с последующим редактированием книги с новым автором  """
        if not request.data['author'].isdigit():
            author = Author(name=request.data['author'])
            author.save()
            print(author)
            request.data['author'] = author.pk
            
        return super().update(request)