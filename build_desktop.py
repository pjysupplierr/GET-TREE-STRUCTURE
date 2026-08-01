"""
Standalone Desktop Executable Builder (.exe)
Package Witch_Tree_Craft into a standalone Windows Desktop Application.
"""
import sys
import os
import subprocess

def build():
    print("🚀 Packaging Witch_Tree_Craft into Desktop Executable (.exe)...")
    
    try:
        import PyInstaller
    except ImportError:
        print("Installing PyInstaller...")
        subprocess.run([sys.executable, "-m", "pip", "install", "pyinstaller", "pywebview"])

    templates_dir = os.path.join("beautiful_tree_visualizer", "templates")
    separator = ";" if os.name == "nt" else ":"

    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--noconfirm",
        "--onedir",
        "--windowed",
        f"--name=Witch_Tree_Craft",
        f"--add-data={templates_dir}{separator}{templates_dir}",
        "desktop_app.py"
    ]

    print("Executing command:", " ".join(cmd))
    try:
        subprocess.run(cmd, check=True)
        print("\n🎉 SUCCESS! Desktop App built successfully.")
        print("📁 Executable location: 'dist/Witch_Tree_Craft/Witch_Tree_Craft.exe'")
    except Exception as e:
        print(f"\n❌ Build failed: {e}")

if __name__ == "__main__":
    build()
