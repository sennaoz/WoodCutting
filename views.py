from rest_framework import generics
from .models import KesimVerileri
from .serializers import KesimVerileriSerializer
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io

class KesimVerileriListCreate(generics.ListCreateAPIView):
    queryset = KesimVerileri.objects.all()
    serializer_class = KesimVerileriSerializer

def download_pdf(request):
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    p.drawString(100, 750, "Kesim Verileri Raporu")

    kesim_verileri = KesimVerileri.objects.all()
    y = 700
    for kesim in kesim_verileri:
        p.drawString(100, y, f"Barkod: {kesim.barkod}, X Kesim: {kesim.x_kesim}, X Adet: {kesim.x_adet}")
        y -= 20

    p.showPage()
    p.save()
    buffer.seek(0)
    return HttpResponse(buffer, as_attachment=True, content_type='application/pdf', filename='kesim_raporu.pdf')
