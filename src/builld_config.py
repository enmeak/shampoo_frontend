import os
import sys
from yattag import Doc
import json



def path_to_dict(path):
    d = {'value': os.path.basename(path).replace('.pdf', '')}
    d['collapsed'] = 'true'
    if os.path.isdir(path):
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path)]
    else:
        d['children'] = []

    return d

def list_files(startpath):
    rootdir = sys.argv[0]
    rootdir = str(rootdir).replace('builld_config.py', 'documents/')
    for root, dirs, files in os.walk(startpath):
        for f in files:
            rel_dir = os.path.relpath(f, rootdir)
            rel_dir = '/src/documents/' + rel_dir
            doc.stag('embed', style="padding: 0;", id=f.replace('.pdf', '').replace(' ', '_'),
                src=rel_dir.replace('\\', '/'), type="application/pdf", width="100%", height="600px")
            print(doc.getvalue())






if __name__ == '__main__':
    doc, tag, text = Doc().tagtext()
    material = './material.html'
    file_hierarchy = './file_hierarchy.js'
    f = path_to_dict('./documents/')
    for i in range(len(f['children'])):
        f['children'][i]['collapsed'] = "false"

    with open(file_hierarchy, 'w') as filetowrite:
         filetowrite.write('let data = '+str(f['children']))

    list_files('./documents/')
    # with open(material, 'w') as filetowrite:
    #      filetowrite.write(m)
    #
    # rel_dir = os.path.relpath(path, rootdir)
    # rel_dir = '/src/documents/' + rel_dir
    # doc.stag('embed', style="padding: 0;", id=os.path.basename(path).replace('.pdf', '').replace(' ', '_'),
    #          src=rel_dir.replace('\\', '/'), type="application/pdf", width="100%", height="600px")