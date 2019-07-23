import json
import yaml
import factory
import random

from maps.models import Object
from django.test import TestCase, Client
from django.urls import reverse
from users.models import User


class TestUserAuth(TestCase):
    fixtures = ['initial_data_user.json',
                'initial_data_usersocial.json']

    def setUp(self):
        self.user = User.objects.get(pk=2)
        self.user.set_password('test_password')
        self.user.save()
        self.client = Client()

        self.get_user_detail = reverse('user_detail')
        self.check_auth = reverse('check_auth')
        self.create_point = reverse('create_point')
        self.add_points_from_cookie = reverse('add_points_from_cookie')

    def test_user_detail(self):
        response = self.client.get(self.get_user_detail)
        self.assertEqual(response.status_code, 302)

        log = self.client.login(username='user2', password='test_password')
        self.assertEqual(log, True)

        response = self.client.get(self.get_user_detail)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['uid'], '222')
        self.assertEqual(data['avatar'], None)
        points = data['points']
        self.assertEqual(len(points), 0)

        points_factory = {}
        for i in range(5):
            points_factory[i] = RandomPointFactory(author=self.user)
        response = self.client.get(self.get_user_detail)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        points = data['points']
        self.assertEqual(len(points), 5)

    def test_check_auth_anonym(self):
        response = self.client.get(self.check_auth)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['authorization'], False)

    def test_check_auth_no_points(self):
        log = self.client.login(username='user2', password='test_password')
        self.assertEqual(log, True)

        response = self.client.get(self.check_auth)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['authorization'], True)
        self.assertEqual(data['points'], [])

    def test_check_auth_with_points(self):
        self.client.get(self.check_auth)
        data = {
            'lat': 21,
            'lon': 25,
            'address': 'москва'
        }
        self.client.post(
            self.create_point, data=json.dumps(data), content_type="application/json")

        log = self.client.login(username='user2', password='test_password')
        self.assertEqual(log, True)

        response = self.client.get(self.check_auth)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        points = data['points']
        self.assertEqual(data['authorization'], True)
        self.assertEqual(len(points), 1)
        point = points[0]
        self.assertEqual(point['address']['region'], 'Город Москва')
        self.assertNotIn('author', point)

        data = {'points': [point['id'], ]}
        response = self.client.post(
            self.add_points_from_cookie, data=json.dumps(data), content_type="application/json")
        self.assertEqual(bool(response.content), True)
        self.assertEqual(len(Object.objects.all().filter(author=self.user)), 1)

    def test_add_from_cookie_error(self):
        response = self.client.post(
            self.add_points_from_cookie, data={}, content_type="application/json")
        self.assertEqual(response.status_code, 302)

        log = self.client.login(username='user2', password='test_password')
        self.assertEqual(log, True)

        response = self.client.post(
            self.add_points_from_cookie, data=json.dumps({}), content_type="application/json")
        self.assertEqual(response.status_code, 400)

        data = {'points': []}
        response = self.client.post(
            self.add_points_from_cookie, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 400)


class RandomPointFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Object
    name = factory.Sequence(lambda n: 'test_{}_point'.format(n))
    latitude = factory.Sequence(lambda n: n * 10 * random.random())
    longitude = factory.Sequence(lambda n: n * 10 * random.random())
