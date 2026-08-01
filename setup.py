from setuptools import setup, find_packages

setup(
    name="Witch_Tree_Craft",
    version="1.0.0",
    description="Witch_Tree_Craft - Transform tree structures into stunning visual trees (crafted by PJY)",
    long_description=open("README.md", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    author="crafted by PJY",
    packages=find_packages(include=["beautiful_tree_visualizer", "beautiful_tree_visualizer.*"]),
    include_package_data=True,
    package_data={
        "beautiful_tree_visualizer": ["templates/*", "templates/**/*"],
    },
    install_requires=[
        "flask>=3.0.0",
        "Pillow>=10.1.0",
    ],
    entry_points={
        "console_scripts": [
            "witch-tree-craft=beautiful_tree_visualizer.cli:main",
            "Witch_Tree_Craft=beautiful_tree_visualizer.cli:main",
        ],
    },
    python_requires=">=3.8",
)
