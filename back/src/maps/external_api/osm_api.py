from ..helpers import build_url, build_xml
from django.conf import settings
from requests_oauthlib import OAuth1
import xml.etree.ElementTree as xml
import requests


def create_note(lat, lon, address_obj):
    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_NOTE'),
        {
            'lat': lat,
            'lon': lon,
            'text': address_obj['address'],
        }
    )
    response = requests.post(url)
    if not response.ok:
        return {'status_osm': False}
    data_json = {'status_osm': True}
    try:
        root = xml.fromstring(response.content)
        data_json['info'] = {}
        for child in root[0]:
            if child.tag != 'comments':
                data_json['info'][str(child.tag)] = child.text
    except (IndexError, xml.ParseError):
        return {'status_osm': False}
    return data_json


def create_object(lat, lon, address_obj, user):
    try:
        extra_data = user.social_auth.get(provider='openstreetmap').extra_data
        access_token = extra_data['access_token']
        address = address_obj['address_details']
    except (AttributeError, KeyError):
        return {'status_osm': False}
    auth = OAuth1(
        getattr(settings, 'SOCIAL_AUTH_OPENSTREETMAP_KEY'),
        getattr(settings, 'SOCIAL_AUTH_OPENSTREETMAP_SECRET'),
        access_token['oauth_token'],
        access_token['oauth_token_secret']
    )

    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_OBJECT_CREATE'),
    )
    data = build_xml({
        'osm': {
            'changeset': {
                '_tags_': {'version': '0.6', 'generator': 'iD'},
                'tag': {'_tags_': [
                    {'k': 'comment', 'v': 'Create by Open-FIAS'},
                    {'k': 'created_by', 'v': 'Open-FIAS v.1.0'},
                    {'k': 'host', 'v': 'https://open-fias.ru'},
                    {'k': 'locale', 'v': 'ru'},
                    {'k': 'changesets_count', 'v': '1'}
                ]}
            }
        }
    })
    response = requests.put(url, data=data, headers={"Content-Type": "text/xml"}, auth=auth)
    if not response.ok:
        return {'status_osm': False}
    commit_id = int(response.content)

    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_OBJECT_UPLOAD').format(commit_id),
    )
    data = build_xml({
        'osmChange': {
            '_tags_': {'version': 0.6, 'generator': 'iD'},
            'create': {
                'node': {
                    '_tags_': {'id': -1, 'lon': lon, 'lat': lat, 'version': 0, 'changeset': commit_id},
                    'tag': {'_tags_': [
                        {'k': 'name', 'v': address_obj.get('name')},
                        {'k': 'addr:country', 'v': address.get('country')},
                        {'k': 'addr:region', 'v': address.get('region')},
                        {'k': 'addr:subregion', 'v': address.get('subregion')},
                        {'k': 'addr:city', 'v': address.get('locality')},
                        {'k': 'addr:suburb', 'v': address.get('suburb')},
                        {'k': 'addr:street', 'v': address.get('street')},
                        {'k': 'addr:housenumber', 'v': address.get('building')},
                        {'k': 'addr:postcode', 'v': address_obj.get('postalcode')}
                    ]}
                }
            },
            'modify': {},
            'delete': {
                '_tags_': {'if-unused': True}
            }
        }
    })
    response_info = requests.post(url, data=data.encode('utf-8'), headers={"Content-Type": "text/xml"}, auth=auth)
    if not response_info.ok:
        return {'status_osm': False}

    url = build_url(
        getattr(settings, 'OSM_URL'),
        getattr(settings, 'OSM_URL_OBJECT_CLOSE').format(commit_id),
    )
    response = requests.put(url, headers={"Content-Type": "text/xml"}, auth=auth)
    if not response.ok:
        return {'status_osm': False}
    data_json = {'status_osm': True}
    try:
        root = xml.fromstring(response_info.content)
        data_json['node'] = {}
        for child in root[0].attrib.items():
            data_json['node'][str(child[0])] = int(child[1])
    except (IndexError, xml.ParseError):
        return {'status_osm': False}
    data_json['changeset_id'] = commit_id
    return data_json
