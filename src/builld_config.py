""" build_ config.py script, builds fily_hierarchy.js and material.html """
import os
import sys
from yattag import Doc


def file_hierarchy(path):
    """ get a starting path and returns the file hierarchy under that path as a dictionary.
        only folders and pdf files are included"""
    document = {'collapsed': 'true'}

    if os.path.isdir(path):
        document['value'] = os.path.basename(path)
        document['type'] = 'folder'
        document['children'] = [file_hierarchy(os.path.join(path, x)) for x in os.listdir(path)]
    elif os.path.basename(path).endswith('.pdf'):
        document['value'] = os.path.basename(path).replace('.pdf', '').replace(' ', '_').lower()
        document['type'] = 'file'
        document['children'] = []

    if document == {'collapsed': 'true'}:
        document['value'] = 'ignore'
    return document

def list_files(startpath):
    """ get a starting path, returns all the pdf files under that path in html format """

    doc, _, _ = Doc().tagtext()
    rootdir = sys.argv[0]
    rootdir = str(rootdir).replace('builld_config.py', 'documents/')
    for root, _, files in os.walk(startpath):
        for file in files:
            if file.endswith('.pdf'):
                rel_dir = os.path.relpath(root, rootdir)
                rel_dir = '/src/documents/' + rel_dir
                doc.stag('embed', style="padding: 0;",
                         id=file.replace('.pdf', '').replace(' ', '_').lower(),
                         src=rel_dir.replace('\\', '/')+'/'+file,
                         type="application/pdf", width="100%", height="600px")
    return doc.getvalue()


if __name__ == '__main__':


    material = './material.html'
    file_hierarchy_path = './file_hierarchy.js'
    hierarchy_result = file_hierarchy('./documents/')
    for i in range(len(hierarchy_result['children'])):
        hierarchy_result['children'][i]['collapsed'] = "false"

    with open(file_hierarchy_path, 'w') as filetowrite:
        filetowrite.write('let hierarchy = '+str(hierarchy_result['children']))


    content = list_files('./documents/')
    with open(material, 'w') as filetowrite:
        filetowrite.write(content)
