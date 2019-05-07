import re
import requests
import math
from ..helpers import build_url
from django.conf import settings
from ..models import Object


def check_addr(data, lat, lon, session=None):
    address = {
        'exist_db': True,
        'exist_osm': 'full'
    }

    # Check existence in DB fias and get address_sug
    data_suggest = suggester(data)
    try:
        address_sug = data_suggest['results'][0]
        building_sug = address_sug['address_details']['building'].lower()
        address['address_sug'] = address_sug
    except (IndexError, KeyError):
        return None

    fias_id = address_sug['id']
    if len(Object.objects.filter(fias_id=fias_id)) == 0:
        address['exist_db'] = False

    # If we showed dialog window we should not check another data
    if session is not None:
        if session.get('exist_osm') == 'no_full':
            address['exist_osm'] = 'no_full'
            return address

    # Check existence in OSM and get address_geo
    address_geo = {}
    data_geocoder = nomination_geocoder(data)
    try:
        address_geo = data_geocoder
        building_geo = address_geo['address']['house_number'].lower()
        address['address_geo'] = address_geo

        if building_geo != building_sug:
            raise KeyError
        # if not math.isclose(float(address_geo['lat']), lat, abs_tol=1e-1) or \
        #         not math.isclose(float(address_geo['lon']), lon, abs_tol=1e-1) or \
        if not {'road', 'town', 'county', 'state', 'postcode', 'country'}.issubset(address_geo['address']):
            address['exist_osm'] = 'no_full'
    except IndexError:
        address['exist_osm'] = 'none'
    except KeyError:
        address['exist_osm'] = 'none_chg'
        address['osm_info'] = {
            'osm_id': address_geo['osm_id'],
            'osm_type': address_geo['osm_type'],
        }

    return address


def suggester(data):
    if 'address' in data:
        address = str(data['address'])
        address_parts = re.findall(r"[\w']+", address.lower())
    else:
        return {'error': 400}

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_SUGGEST'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'format': 'json',
            'q': ' '.join(address_parts),
            'extra': '1',
        }
    )
    response = requests.get(url, timeout=2000)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


def geocoder(data):
    if 'address' in data:
        address = str(data['address'])
        address_parts = re.findall(r"[\w']+", address.lower())
    elif isinstance(data, list):
        address_parts = data
    else:
        return {'error': 400}

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
    if 'lat' in data and 'lon' in data:
        lat = data['lat']
        lon = data['lon']
    else:
        return {'error': 400}

    url = build_url(
        getattr(settings, 'FIAS_URL'),
        getattr(settings, 'FIAS_URL_REV_GEOCODER'),
        {
            'api_key': getattr(settings, 'FIAS_API_KEY'),
            'fields': 'related,address_details,weight,address',
            'q': f'{lat},{lon}',
            'extra': '1',
        }
    )
    response = requests.get(url, timeout=2000)
    if not response.ok:
        return {'error': response.status_code}
    return response.json()


def nomination_geocoder(data):
    if 'address' in data:
        address = str(data['address'])
        address_parts = re.findall(r"[\w']+", address.lower())
    elif isinstance(data, list):
        address_parts = data
    else:
        return {'error': 400}

    try:
        index = address_parts.index('улица')
        address_parts.remove('улица')
    except ValueError:
        pass

    url = build_url(
        getattr(settings, 'NOMINATION_URL'),
        'search',
        {
            'q': ' '.join(address_parts),
            'format': 'json',
            'addressdetails': 1,
            'accept-language': 'ru',
            'limit': 1,
        }
    )
    response = requests.get(url, timeout=2000)
    if not response.ok:
        return {'error': response.status_code}
    data_json = response.json()
    if len(data_json) == 0:
        address_parts.pop()
        return nomination_geocoder(address_parts)
    return data_json[0]
