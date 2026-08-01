import os
import tempfile
from flask import Flask, render_template, request, jsonify, send_file
try:
    from .tree_parser import TreeParser, TreeNode
    from .image_exporter import ImageExporter
    from .themes import get_all_theme_names
except ImportError:
    from tree_parser import TreeParser, TreeNode
    from image_exporter import ImageExporter
    from themes import get_all_theme_names

PACKAGE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(PACKAGE_DIR, 'templates')

app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=TEMPLATE_DIR, static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/parse', methods=['POST'])
def parse_tree():
    data = request.json or {}
    input_type = data.get('type', 'text')
    content = data.get('content', '')

    if input_type == 'text':
        tree = TreeParser.parse_text_tree(content)
    elif input_type == 'directory':
        tree = TreeParser.parse_directory(content)
    else:
        tree = TreeParser.parse_text_tree(content)

    return jsonify(tree_to_dict(tree))

@app.route('/api/export', methods=['POST'])
def export_tree():
    data = request.json or {}
    tree_dict = data.get('tree', {})
    theme = data.get('theme', 'neon_dark')

    tree = dict_to_tree(tree_dict)
    exporter = ImageExporter(theme)

    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as f:
        output_path = f.name

    exporter.export(tree, output_path)
    return send_file(output_path, mimetype='image/png', as_attachment=True,
                     download_name='tree_visualization.png')

@app.route('/api/themes')
def get_themes():
    return jsonify(get_all_theme_names())

def tree_to_dict(node: TreeNode) -> dict:
    return {
        'name': node.name,
        'isFolder': node.is_folder,
        'depth': node.depth,
        'extension': node.extension,
        'children': [tree_to_dict(child) for child in node.children]
    }

def dict_to_tree(d: dict) -> TreeNode:
    is_folder = d.get('isFolder', d.get('is_folder', True))
    return TreeNode(
        name=d.get('name', 'Root'),
        is_folder=is_folder,
        depth=d.get('depth', 0),
        extension=d.get('extension'),
        children=[dict_to_tree(child) for child in d.get('children', [])]
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)
