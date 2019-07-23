import html

from xml.etree.ElementTree import Element, tostring
from urllib import parse


def build_url(baseurl, path, args_dict=None):
    dirty_url = parse.urljoin(baseurl + "/", path)
    url_parts = list(parse.urlparse(dirty_url))
    if args_dict:
        url_parts[4] = parse.urlencode(args_dict)
    return parse.urlunparse(url_parts)


def build_xml(data):
    key = list(data.keys())[0]
    root = Element(key)
    arg = data[key]
    if '_tags_' in arg:
        tags = arg['_tags_']
        build_xml_tags(root, tags)
    build_xml_tree(arg, root)
    return html.unescape(tostring(root).decode('utf-8'))


def build_xml_tree(data, root):
    for key in data:
        if key is '_tags_':
            continue
        child = Element(key)
        keys = data[key]
        # Get 'tags' from value called _tags_
        if '_tags_' in keys:
            tags = keys['_tags_']
            # If there is an array with number tags
            # like { tag: {'_tags_' : [{'tag1': 1}, {'tag2': 2}]} } is used another function
            # to not use many times the same key name like
            # { tag: {'_tags_' : {'tag1': 1}}, tag: {'_tags_' : {'tag2': 2}}}
            if isinstance(tags, list):
                for elem in tags:
                    if build_xml_tags(child, elem):
                        root.append(child)
                    # Create new elements because we have array of tags
                    child = Element(key)
                # It is necessary to end the recursion, because
                # all 'child' are already attached to the 'root'
                # and the following function and conditions should not be made (in our task)
                break
            else:
                build_xml_tags(child, tags)
        root.append(child)
        # If there are other elements by key, it is necessary to convert them to 'xml' also
        if len(keys) > 1 or (len(keys) > 0 and '_tags_' not in keys):
            build_xml_tree(keys, child)
    return True


def build_xml_tags(child, data):
    for tag in data:
        if data[tag] is None:
            return False
        child.set(tag, str(data[tag]))
    return True
