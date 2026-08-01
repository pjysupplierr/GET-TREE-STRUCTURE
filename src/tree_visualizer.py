"""
Tree Visualizer module alias for backward compatibility.
"""

def visualize_tree(tree_node, theme_name="neon_dark"):
    from beautiful_tree_visualizer.image_exporter import ImageExporter
    exporter = ImageExporter(theme_name)
    return exporter.export(tree_node)