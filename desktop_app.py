import os
import sys
import shutil
import threading
import time
import webbrowser

# Add package directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def cleanup_non_essential():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    files_to_remove = ["build_desktop.py", "setup.py", "pyproject.toml"]
    for f in files_to_remove:
        path = os.path.join(base_dir, f)
        if os.path.isfile(path):
            try:
                os.remove(path)
            except Exception:
                pass
                
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

def launch_window(url):
    time.sleep(1.0)
    try:
        import webview
        webview.create_window("✨ Witch_Tree_Craft | crafted by PJY", url, width=1280, height=850, resizable=True)
        webview.start()
    except ImportError:
        webbrowser.open(url)

def main():
    port = 5000
    url = f"http://127.0.0.1:{port}"
    
    threading.Thread(target=launch_window, args=(url,), daemon=True).start()
    app.run(host="127.0.0.1", port=port, debug=False)

if __name__ == "__main__":
    main()
