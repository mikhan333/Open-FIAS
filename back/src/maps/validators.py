import re
import requests

from urllib import parse
from django.conf import settings


def check_addr(data):  # TODO check addresses via local DB FIAS
    data_json = suggester(data)
    addresses = data_json['results']
    return addresses[0]


def suggester(data):
    address = 'россия москва'
    if 'address' in data:
        address = data['address']
    mas = re.findall(r"[\w']+", address.lower())

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_SUGGEST'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'format': 'json',
            'q': ' '.join(mas),
        }
    )
    response = requests.get(url)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


def geocoder(data):
    address = 'россия москва'
    if 'address' in data:
        address = data['address']
    mas = re.findall(r"[\w']+", address)

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_GEOCODER'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'q': ' '.join(mas),
        }
    )
    response = requests.get(url)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


def rev_geocoder(data):
    lat = '55'
    lon = '37'
    if 'lat' and 'lon' in data:
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
    response = requests.get(url)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


def build_url(baseurl, path, args_dict=None):
    dirty_url = parse.urljoin(baseurl + "/", path)
    url_parts = list(parse.urlparse(dirty_url))
    if args_dict:
        url_parts[4] = parse.urlencode(args_dict)
    return parse.urlunparse(url_parts)
