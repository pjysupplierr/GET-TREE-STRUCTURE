import os
import sys
import shutil

# Ensure package directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def cleanup_non_essential():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Files to remove
    files_to_remove = ["build_desktop.py", "setup.py", "pyproject.toml"]
    for f in files_to_remove:
        path = os.path.join(base_dir, f)
        if os.path.isfile(path):
            try:
                os.remove(path)
            except Exception:
                pass
                
    # Folders to remove
    folders_to_remove = ["mobile_app", "src", "templates", "build", "dist"]
    for folder in folders_to_remove:
        path = os.path.join(base_dir, folder)
        if os.path.isdir(path):
            try:
                shutil.rmtree(path)
            except Exception:
                pass

cleanup_non_essential()

from beautiful_tree_visualizer.app import app

if __name__ == '__main__':
    print("✨ Starting Witch_Tree_Craft on http://localhost:5000")
    app.run(debug=True, port=5000)