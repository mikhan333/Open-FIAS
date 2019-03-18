import html

from xml.etree.ElementTree import Element, tostring
from urllib import parse


def build_url(baseurl, path, args_dict=None):
    dirty_url = parse.urljoin(baseurl + "/", path)
    url_parts = list(parse.urlparse(dirty_url))
    if args_dict:
        url_parts[4] = parse.urlencode(args_dict)
    return parse.urlunparse(url_parts)


def build_xml(data, root=None):
    for key in data:
        if key is '_tags_':
            continue
        child = Element(key)
        keys = data[key]
        if '_tags_' in keys:
            tags = keys['_tags_']
            if isinstance(tags, list):
                for elem in tags:
                    if build_xml_tags(child, elem):
                        root.append(child)
                    child = Element(key)
                return True
            else:
                build_xml_tags(child, tags)
        if root is not None:
            root.append(child)
        if len(keys) > 1 or (len(keys) > 0 and '_tags_' not in keys):
            build_xml(keys, child)
        if root is None:
            return html.unescape(tostring(child).decode('utf-8'))
    return 0


def build_xml_tags(child, data):
    for tag in data:
        if data[tag] is None:
            return False
        child.set(tag, str(data[tag]))
    return True


def check_exist(mas, key):
    if key in mas:
        return mas[key]
    return None
