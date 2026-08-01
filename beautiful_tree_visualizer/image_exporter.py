from PIL import Image, ImageDraw, ImageFont
from typing import List, Tuple
try:
    from .tree_parser import TreeNode
    from .themes import Theme, get_theme
except ImportError:
    from tree_parser import TreeNode
    from themes import Theme, get_theme

class ImageExporter:
    """Exports directory tree as a clean PNG image."""

    def __init__(self, theme_name: str = "neon_dark"):
        self.theme = get_theme(theme_name)
        self.line_height = 28
        self.font_size = 14
        self.padding = 30

    def flatten_tree(self, node: TreeNode, prefix: str = "", is_last: bool = True, depth: int = 0):
        lines = []
        if depth == 0:
            lines.append((node.name + "/", True, 0))
        else:
            connector = "└── " if is_last else "├── "
            lines.append((prefix + connector + node.name + ("/" if node.is_folder else ""), node.is_folder, depth))

        if node.is_folder and node.children:
            ext = "    " if is_last else "│   "
            next_prefix = prefix + (ext if depth > 0 else "")
            for i, child in enumerate(node.children):
                is_last_child = (i == len(node.children) - 1)
                lines.extend(self.flatten_tree(child, next_prefix, is_last_child, depth + 1))
        return lines

    def export(self, root: TreeNode, output_path: str = "tree_output.png") -> str:
        lines = self.flatten_tree(root)
        
        max_line_len = max((len(l[0]) for l in lines), default=20)
        img_width = max(650, max_line_len * 10 + self.padding * 2)
        img_height = max(300, len(lines) * self.line_height + self.padding * 2 + 50)

        img = Image.new('RGB', (img_width, img_height), self.theme.background)
        draw = ImageDraw.Draw(img)

        try:
            font = ImageFont.load_default()
        except Exception:
            font = ImageFont.load_default()

        # Header Title
        draw.text((self.padding, 15), f"📁 Directory Tree: {root.name}", fill=self.theme.accent_color, font=font)
        draw.line([self.padding, 40, img_width - self.padding, 40], fill=self.theme.line_color, width=1)

        # Draw lines
        y = 55
        for text, is_folder, depth in lines:
            color = self.theme.folder_colors[depth % len(self.theme.folder_colors)] if is_folder else self.theme.text_color
            draw.text((self.padding, y), text, fill=color, font=font)
            y += self.line_height

        img.save(output_path, quality=95)
        return output_path
