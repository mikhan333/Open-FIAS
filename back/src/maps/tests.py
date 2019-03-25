import json
import requests
import yaml

from .helpers import build_url
from .models import Object
from django.test import TestCase, Client
from django.urls import reverse
from django.conf import settings
from users.models import User


class TestSuggestApi(TestCase):
    def setUp(self):
        self.client = Client()
        self.suggest = reverse('suggester')
        self.geocoder = reverse('geocoder')
        self.rev_geocoder = reverse('rev_geocoder')

    def test_suggester(self):
        response = self.client.post(self.suggest)
        self.assertEqual(response.status_code, 405)

        response = self.client.get(self.suggest, {'address': '   россия% '})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            json.loads(response.content)['results'][0]['address_details']['country'],
            'Россия'
        )

        response = self.client.get(self.suggest, {'address': ' $%$str '})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content)['results']), 0)

    def test_rev_geocoder(self):
        response = self.client.post(self.rev_geocoder)
        self.assertEqual(response.status_code, 405)

        response = self.client.get(self.rev_geocoder, {'lat': ' %65'})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.rev_geocoder, {'lon': 'asdg'})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.rev_geocoder, {'address': ' $%$str '})
        self.assertEqual(response.status_code, 200)

    def test_geocoder(self):
        response = self.client.post(self.geocoder)
        self.assertEqual(response.status_code, 405)

        response = self.client.get(self.geocoder, {'address': 'химки'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            json.loads(response.content)['features'][0]['properties']['address']['locality'],
            'Химки'
        )

        response = self.client.get(self.geocoder, {'address': 'Область московская химки'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            json.loads(response.content)['features'][0]['properties']['address']['locality'],
            'Химки'
        )

        response = self.client.get(self.geocoder, {'address': 'область химки'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            json.loads(response.content)['features'][0]['properties']['address']['locality'],
            'Химки'
        )

        response = self.client.get(self.geocoder, {'address': ''})
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', json.loads(response.content))


class TestCreatePoint(TestCase):
    fixtures = ['initial_data_user.json',
                'initial_data_usersocial.json']

    def setUp(self):
        self.user = User.objects.get(pk=1)
        self.user.set_password('test_password')
        self.user.save()
        self.client = Client()

        self.create_point = reverse('create_point')

    def test_errors(self):
        response = self.client.get(self.create_point)
        self.assertEqual(response.status_code, 405)

        response = self.client.put(self.create_point)
        self.assertEqual(response.status_code, 405)

        response = self.client.post(self.create_point)
        self.assertEqual(response.status_code, 400)

        response = self.client.post(self.create_point,
                                    data=json.dumps({'something': 'need'}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 400)

        response = self.client.post(self.create_point,
                                    data=json.dumps({'lat': 'need', 'lon': 'int', 'address': 'lol'}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 400)

        response = self.client.post(self.create_point,
                                    data=json.dumps({'lat': 54.3, 'lon': 'int', 'address': 'lol'}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_anonymous(self):
        lat = 34.54
        lon = 43.21
        address = 'воронеж'
        data = {
            'lat': lat,
            'lon': lon,
            'address': address
        }
        response = self.client.post(
            self.create_point, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)

        '''Check OSM'''
        self.assertEqual(data['status_osm'], True)
        url = build_url(
            getattr(settings, 'OSM_URL'),
            f"{getattr(settings, 'OSM_URL_NOTE')}/{data['info']['id']}",
        )
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)

        '''Check DB'''
        self.assertEqual(data['status_db'], True)
        obj = Object.objects.all().get(id=1)
        self.assertAlmostEqual(obj.latitude, lat)
        self.assertAlmostEqual(obj.longitude, lon)
        self.assertEqual(obj.locality, 'Город Воронеж')

    def test_auth(self):
        log = self.client.login(username='user1', password='test_password')
        self.assertEqual(log, True)
        lat = 36.27
        lon = 85.11
        address = 'химки'
        data = {
            'lat': lat,
            'lon': lon,
            'address': address
        }
        response = self.client.post(
            self.create_point, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)

        '''Check OSM'''
        self.assertEqual(data['status_osm'], True)

        '''Check DB'''
        self.assertEqual(data['status_db'], True)
        obj = Object.objects.all().get(id=1)
        self.assertAlmostEqual(obj.latitude, lat)
        self.assertAlmostEqual(obj.longitude, lon)
        self.assertEqual(obj.locality, 'Город Химки')
        self.assertEqual(obj.author, self.user)


class TestGetListPoints(TestCase):
    fixtures = ['initial_data_user.json',
                'initial_data_usersocial.json',
                'initial_data_map.json']

    def setUp(self):
        self.user = User.objects.get(pk=1)
        self.user.set_password('test_password')
        self.user.save()
        self.client = Client()
        log = self.client.login(username='user1', password='test_password')
        self.assertEqual(log, True)

        self.get_list_last_points = reverse('get_list_last_points')
        self.get_list_points = reverse('get_list_points')

    def test_list_points(self):
        response = self.client.get(self.get_list_points)
        self.assertEqual(response.status_code, 200)
        points = yaml.load(json.loads(response.content)['points'], Loader=yaml.Loader)
        self.assertEqual(len(points), 20)

    def test_list_last_points(self):
        response = self.client.get(self.get_list_last_points)
        self.assertEqual(response.status_code, 200)
        points = yaml.load(json.loads(response.content)['points'], Loader=yaml.Loader)
        self.assertEqual(len(points), 10)
