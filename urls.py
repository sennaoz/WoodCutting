from django.contrib import admin
from django.urls import path, include
from django.urls import path
from .views import KesimVerileriListCreate, download_pdf

urlpatterns = [
    path('kesim-verileri/', KesimVerileriListCreate.as_view(), name='kesim_verileri'),
    path('download-pdf/', download_pdf, name='download_pdf'),
]


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('kesim.urls')),
]
