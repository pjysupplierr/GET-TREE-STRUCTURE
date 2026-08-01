import os
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class TreeNode:
    name: str
    is_folder: bool
    children: List['TreeNode']
    depth: int = 0
    extension: Optional[str] = None
    size: Optional[int] = None

    def __repr__(self):
        icon = "📁" if self.is_folder else "📄"
        return f"{icon} {self.name}"

class TreeParser:
    """Parses directory structures from real folders or text input."""

    @staticmethod
    def parse_directory(path: str, max_depth: int = 50) -> TreeNode:
        """Parse a real directory into a tree structure."""
        return TreeParser._build_tree(path, path, 0, max_depth)

    @staticmethod
    def _build_tree(root_path: str, current_path: str, depth: int, max_depth: int) -> TreeNode:
        name = os.path.basename(current_path) or current_path
        is_folder = os.path.isdir(current_path)

        node = TreeNode(
            name=name,
            is_folder=is_folder,
            children=[],
            depth=depth,
            extension=os.path.splitext(name)[1] if not is_folder else None
        )

        if is_folder and depth < max_depth:
            try:
                items = sorted(os.listdir(current_path))
                folders = [i for i in items if os.path.isdir(os.path.join(current_path, i))]
                files = [i for i in items if os.path.isfile(os.path.join(current_path, i))]

                for folder in folders:
                    child_path = os.path.join(current_path, folder)
                    node.children.append(
                        TreeParser._build_tree(root_path, child_path, depth + 1, max_depth)
                    )

                for file in files:
                    file_path = os.path.join(current_path, file)
                    node.children.append(TreeNode(
                        name=file,
                        is_folder=False,
                        children=[],
                        depth=depth + 1,
                        extension=os.path.splitext(file)[1],
                        size=os.path.getsize(file_path) if os.path.exists(file_path) else None
                    ))
            except PermissionError:
                node.children.append(TreeNode(
                    name="[Permission Denied]",
                    is_folder=False,
                    children=[],
                    depth=depth + 1
                ))

        return node

    @staticmethod
    def parse_text_tree(text: str) -> TreeNode:
        """Parse a text-based tree representation."""
        lines = text.strip().split('\n')
        if not lines:
            return TreeNode(name="empty", is_folder=True, children=[], depth=0)

        root_name = lines[0].strip().replace('├── ', '').replace('└── ', '').replace('│   ', '')
        root = TreeNode(name=root_name, is_folder=True, children=[], depth=0)

        stack = [(root, 0)]

        for line in lines[1:]:
            stripped = line.strip()
            if not stripped:
                continue

            depth = 0
            for char in line:
                if char in ('│', ' ', '├', '└', '─'):
                    depth += 1
                else:
                    break
            depth = depth // 4

            name = stripped.replace('├── ', '').replace('└── ', '').replace('│   ', '')
            is_folder = not '.' in name or name.endswith('/')

            node = TreeNode(
                name=name.rstrip('/'),
                is_folder=is_folder,
                children=[],
                depth=depth,
                extension=os.path.splitext(name)[1] if not is_folder else None
            )

            while len(stack) > 1 and stack[-1][1] >= depth:
                stack.pop()

            stack[-1][0].children.append(node)
            stack.append((node, depth))

        return root

    @staticmethod
    def to_text_tree(node: TreeNode, prefix: str = "", is_last: bool = True) -> str:
        """Convert tree node to classic text tree format."""
        result = ""
        connector = "└── " if is_last else "├── "

        if node.depth > 0:
            result += prefix + connector + node.name + ("/" if node.is_folder else "") + "\n"
        else:
            result += node.name + ("/" if node.is_folder else "") + "\n"

        if node.is_folder and node.children:
            extension = "    " if is_last else "│   "
            for i, child in enumerate(node.children):
                is_last_child = (i == len(node.children) - 1)
                result += TreeParser.to_text_tree(child, prefix + extension, is_last_child)

        return result
