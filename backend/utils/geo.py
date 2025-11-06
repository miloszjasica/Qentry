import requests
from math import radians, cos, sin, asin, sqrt

def get_locations(ip_address):
    try:
        response = requests.get(f"https://ipapi.co/{ip_address}/json/")

        if response.status_code == 200:
            data = response.json()
            latitude = data.get("latitude")
            longitude = data.get("longitude")

            if latitude and longitude:
                return float(latitude), float(longitude)

            loc = data.get("loc")
            if loc:
                lat, lon = map(float, loc.split(","))
                return lat, lon

    except Exception as e:
        print(f"Error fetching geolocation data: {e}")

    return None, None



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
