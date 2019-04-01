import re
import requests

from ..helpers import build_url
from django.conf import settings


def check_addr(data):
    data_json = suggester(data)
    try:
        addresses = data_json['results']
        return addresses[0]
    except (IndexError, KeyError):
        return None


def suggester(data):
    address = 'россия москва'
    if 'address' in data:
        address = data['address']
    address_parts = re.findall(r"[\w']+", address.lower())

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_SUGGEST'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'format': 'json',
            'q': ' '.join(address_parts),
        }
    )
    response = requests.get(url, timeout=2000)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


def geocoder(data):
    address = 'россия москва'
    if 'address' in data:
        address = data['address']
    if isinstance(data, list):
        address_parts = data
    else:
        address_parts = re.findall(r"[\w']+", address)

    # If we have word 'Область' there are some problems in geocoder, so delete it
    # if 'Область' in address_parts:
    #     index = address_parts.index('Область')
    #     if len(address_parts) > index + 2:
    #         address_parts.pop(index)
    #         address_parts.pop(index)

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_GEOCODER'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'q': ' '.join(address_parts),
        }
    )
    response = requests.get(url, timeout=2000)
    if not response.ok:
        return {'error': response.status_code}
    data_json = response.json()

    # Return points with smaller rank firstly
    # def sort(obj):
    #     value = obj.get('properties')
    #     if value is None or 'geometry' not in obj or obj.get('weight') != 1:
    #         return 15
    #     value = value.get('rank')
    #     if value is None:
    #         return 15
    #     return obj.get('properties').get('rank')

    # data_json['features'] = sorted(data_json['features'], key=sort)

    # If we do not have coordinates for point, we call recursive with smaller address
    try:
        elem = data_json['features'][0]
    except (IndexError, KeyError):
        return {'error': 'nothing found'}
    if 'geometry' not in elem:
        address_parts.pop()
        return geocoder(address_parts)
    return data_json


def rev_geocoder(data):
    lat = '55'
    lon = '37'
    if 'lat' in data and 'lon' in data:
        lat = data['lat']
        lon = data['lon']

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_REV_GEOCODER'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'q': f'{lat},{lon}',
        }
    )
    response = requests.get(url, timeout=2000)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()
