from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def recomendar(request):
    producto = request.data.get('producto', '')
    
    return Response({
        "recomendacion": f"Te recomendamos productos similares a {producto}"
    })