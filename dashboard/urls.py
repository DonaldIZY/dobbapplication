"""dashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from users.forms import EmailValidationOnForgotPassword
from django.contrib.auth import views as auth_views
from users import users_views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('finlab.urls', namespace='finlab')),

    path('administration/', include('administration.urls', namespace='administration')),

    path('analytics/', include('analytics.urls', namespace='analytics')),


    path('reset_password/', auth_views.PasswordResetView.as_view(form_class=EmailValidationOnForgotPassword),
         name='reset_password'),
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('password/', users_views.change_password, name='change_password'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "Finlab Dashboard"
admin.site.site_title = "Dashboard"
admin.site.index_title = "Dashboard"
