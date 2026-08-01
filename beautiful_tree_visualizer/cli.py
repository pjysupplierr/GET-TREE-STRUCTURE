import sys
import os
import argparse
import webbrowser

def main():
    parser = argparse.ArgumentParser(description="Beautiful Directory Tree Visualizer")
    parser.add_argument("--port", type=int, default=5000, help="Port to run web app server on (default: 5000)")
    parser.add_argument("--no-browser", action="store_true", help="Do not automatically open browser")
    args = parser.parse_args()

    try:
        from .app import app
    except ImportError:
        from app import app

    url = f"http://127.0.0.1:{args.port}"
    print(f"🎨 Starting Beautiful Directory Tree Visualizer on {url}")
    
    if not args.no_browser:
        try:
            webbrowser.open(url)
        except Exception:
            pass

    app.run(debug=False, host="0.0.0.0", port=args.port)

if __name__ == "__main__":
    main()
