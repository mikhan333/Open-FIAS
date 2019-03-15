import json
import requests

from .views import build_url
from .models import Object
from django.test import TestCase, Client
from django.urls import reverse
from django.conf import settings


class TestSuggestApi(TestCase):
    def setUp(self):
        self.client = Client()
        self.suggest = reverse('suggester')

    def test_suggester(self):
        response = self.client.post(self.suggest)
        self.assertEqual(response.status_code, 405)

        response = self.client.get(self.suggest, {'address': '   россия% '})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        element = data['results'][0]['address_details']
        self.assertEqual(element['country'], 'Россия')

        response = self.client.get(self.suggest, {'address': ' $%$str '})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(len(data['results']), 0)


class TestCreateNote(TestCase):
    def setUp(self):
        self.client = Client()
        self.create_note = reverse('create_note')

    def test_errors(self):
        response = self.client.get(self.create_note)
        self.assertEqual(response.status_code, 405)

        response = self.client.put(self.create_note)
        self.assertEqual(response.status_code, 405)

        response = self.client.post(self.create_note)
        self.assertEqual(response.status_code, 400)

        response = self.client.post(self.create_note,
                                    data=json.dumps({'something': 'need'}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 400)

        response = self.client.post(self.create_note,
                                    data=json.dumps({'lat': 'need', 'lon': 'int', 'address': 'lol'}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 400)

        response = self.client.post(self.create_note,
                                    data=json.dumps({'lat': 54.3, 'lon': 'int', 'address': 'lol'}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_osm_db(self):
        lat = 34.54
        lon = 43.21
        address = 'воронеж'
        data = {
            'lat': lat,
            'lon': lon,
            'address': address
        }
        response = self.client.post(
            self.create_note, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)

        '''Check OSM'''
        self.assertEqual(data['status_osm'], 200)
        url = build_url(
            getattr(settings, 'OSM_URL'),
            f"{getattr(settings, 'OSM_URL_NOTE')}/{data['id']}",
        )
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)

        '''Check DB'''
        self.assertEqual(data['status_db'], 200)
        obj = Object.objects.all().get(id=1)
        self.assertAlmostEqual(obj.latitude, lat)
        self.assertAlmostEqual(obj.longitude, lon)
        self.assertEqual(obj.locality, 'Город Воронеж')
