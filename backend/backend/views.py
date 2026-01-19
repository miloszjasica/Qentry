from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def home(request):
    """
    Home page endpoint
    ---
    Returns a welcome message
    """
    return Response({"message": "Welcome to the Qentry"})