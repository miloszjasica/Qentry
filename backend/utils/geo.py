import requests
from math import radians, cos, sin, asin, sqrt

def get_locations(ip_address):
    try:
        response = requests.get(f"https://ipwho.is/{ip_address}")
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                latitude = data.get("latitude")
                longitude = data.get("longitude")
                return latitude, longitude
    except Exception as e:
        print(f"Error fetching location for IP {ip_address}: {e}")
    return 52.2297, 21.0122  # Warszawa, if location can't be fetched


def distance(lat1, lon1, lat2, lon2):
    """
    Oblicza odległość między dwoma punktami (w km) 
    przy użyciu wzoru Haversine.
    """
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a)) 
    r = 6371  #radius of earth in kilometers
    return c * r


def get_client_ip(request):
    """Pobiera adres IP użytkownika"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip