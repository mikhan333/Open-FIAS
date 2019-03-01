
from django.db import models
from django.conf import settings


class ObjectQuerySet(models.QuerySet):
    """Model for sorting objects of Map"""
    def filt_del(self, user):
        """Get list of objects"""
        if user.is_authenticated():
            return self.filter(
                models.Q(author=user) | models.Q(is_archive=False)
            )
        else:
            return self.filter(models.Q(is_archive=False))


class Object(models.Model):
    """Model for geo positions objects"""

    """Main information"""
    name = models.CharField(
        max_length=255,
        verbose_name=u'имя объекта',
    )

    author = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='maps',
        verbose_name=u'автор',
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

    """Coordinates"""
    latitude = models.FloatField(
        verbose_name=u'широта',
    )

    longitude = models.FloatField(
        verbose_name=u'долгота',
    )

    """Information about object"""
    country = models.CharField(
        max_length=255,
        verbose_name=u'страна',
    )

    region = models.CharField(
        max_length=255,
        verbose_name=u'регион',
    )

    subregion = models.CharField(
        max_length=255,
        verbose_name=u'под-регион',
    )

    locality = models.CharField(
        max_length=255,
        verbose_name=u'населенный пункт',
    )

    suburb = models.CharField(
        max_length=255,
        verbose_name=u'район города',
    )

    street = models.CharField(
        max_length=255,
        verbose_name=u'название улицы',
    )

    building = models.CharField(
        max_length=255,
        verbose_name=u'номер дома',
    )

    """Additional information"""
    rank = models.IntegerField(
        verbose_name=u'уровень адресного объекта',
    )

    postcode = models.IntegerField(
        verbose_name=u'почтовый индекс',
    )

    objects = ObjectQuerySet.as_manager()

    class Meta:
        verbose_name = u'Объект'
        verbose_name_plural = u'Объекты'
        ordering = [
            'country',
            'region',
            'subregion',
            'locality',
            'suburb',
            'street',
            'building'
        ]

    def __unicode__(self):
        return self.name
