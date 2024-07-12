from rest_framework import serializers
from .models import KesimVerileri

class KesimVerileriSerializer(serializers.ModelSerializer):
    class Meta:
        model = KesimVerileri
        fields = '__all__'
