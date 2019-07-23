from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import JSONField
from rest_framework import serializers


class ObjectQuerySet(models.QuerySet):
    """Model for sorting objects of Map"""
    def filt_statistic(self):
        return self.exclude(author=None)

    def filt_del(self, user):
        if user.is_authenticated:
            return self.filter(
                models.Q(author=user) | models.Q(is_archive=False)
            )
        return self.filter(models.Q(is_archive=False))


class ObjectManager(models.Manager):
    @staticmethod
    def create_object(lat, lon, address_obj, user, changeset=None, note=None):
        obj = Object(
            latitude=lat,
            longitude=lon,
            changeset_id=changeset,
            note_id=note,
            fias_id=address_obj['id'],
        )
        if user.is_authenticated:
            obj.author = user
        if 'rank' in address_obj:
            obj.fias_level = address_obj['rank']
        if 'postalcode' in address_obj:
            obj.postalcode = int(address_obj['postalcode'])
        if 'name' in address_obj:
            obj.name = address_obj['name']
        obj.address = address_obj['address_details']
        obj.save()
        return obj


class Object(models.Model):
    """Model for geo positions objects"""

    """Main information"""
    name = models.TextField(
        verbose_name=u'имя объекта',
        blank=True,
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='maps',
        verbose_name=u'автор',
        null=True,
        on_delete=models.DO_NOTHING,
    )
    is_archive = models.BooleanField(
        default=False,
        verbose_name=u'объект в архиве',
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name=u'время создания',
    )
    updated = models.DateTimeField(
        auto_now=True,
        verbose_name=u'время обновления',
    )
    fias_guid = models.UUIDField(null=True)

    fias_id = models.BigIntegerField(null=True)
    note_id = models.IntegerField(null=True)
    changeset_id = models.IntegerField(null=True)

    """Coordinates"""
    latitude = models.DecimalField(
        max_digits=10,
        decimal_places=8,
        verbose_name=u'широта',
    )
    longitude = models.DecimalField(
        max_digits=11,
        decimal_places=8,
        verbose_name=u'долгота',
    )

    """Information about object"""
    address = JSONField(
        verbose_name=u'адрес',
        null=True,
    )

    """Additional information"""
    fias_level = models.CharField(
        max_length=2,
        verbose_name=u'уровень адресного объекта',
        blank=True,
    )
    postalcode = models.CharField(
        max_length=10,
        verbose_name=u'почтовый индекс',
        blank=True,
    )
    objects = ObjectManager.from_queryset(ObjectQuerySet)()

    class Meta:
        verbose_name = u'Объект'
        verbose_name_plural = u'Объекты'
        ordering = [
            'name',
        ]

    def __unicode__(self):
        return self.name


class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Object
        fields = [
            'address',
            'latitude',
            'longitude',
            'name',
        ]


def points_serializer(points, have_id=False, user=None):
    mas_points = []
    for point in points:
        dict_point = ObjectSerializer(point).data
        if user is not None:
            dict_point['author'] = user
        elif point.author is not None:
            dict_point['author'] = point.author.username
        if have_id:
            dict_point['id'] = point.id
        mas_points.append(dict_point)
    return mas_points
