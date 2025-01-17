from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api import views

router = DefaultRouter()

router.register(r'authors', views.AuthorViewSet)
router.register(r'books', views.BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', views.login),
    path('signup', views.signup),
    path('check', views.test_token),
    path('bookbyauthor/<int:pk>', views.get_books_by_author),
    path('profile', views.edit_profile_email),
]
