# ✨ Witch_Tree_Craft

> **crafted by PJY**

Transform folder structures into stunning visual trees!

## ✨ Features

- 🎨 **8 Themes** — Neon Dark, Ocean Breeze, Sunset Glow, Cyberpunk, Forest Green, Minimal Light, Dracula, Nord
- 📐 **Multiple Views** — Classic Tree, Horizontal Graph, Mind Map
- 📥 **Export as Image** — Save your tree visualization directly as high-resolution PNG
- 📋 **Copy as Text** — Copy formatted ASCII tree for documentation/README files
- 📁 **Folder Drag & Drop** — Drag & drop any folder or file directly into the browser
- 🌐 **Web & Desktop Interface** — Real-time interactive UI

## 🚀 Quick Start

### Web App
```bash
pip install -r requirements.txt
python app.py
```
Open **`http://localhost:5000`** in your browser.

### Standalone Desktop App
```bash
python desktop_app.py
```

## 📁 Clean Repository Structure

```
Witch_Tree_Craft/
├── beautiful_tree_visualizer/
│   ├── app.py              # Flask server engine
│   ├── cli.py              # Console runner script
│   ├── tree_parser.py      # Directory & text tree parser
│   ├── themes.py           # Color theme definitions
│   ├── image_exporter.py   # High-res PNG exporter
│   └── templates/
│       ├── index.html      # Clean Web UI
│       ├── style.css       # Modern design system
│       └── script.js       # Interactive frontend & drag-drop logic
├── desktop_app.py          # Native desktop app launcher
├── app.py                  # Web application entry point
├── requirements.txt
├── .gitignore              # Standard GitHub ignore rules
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Backend**: Python, Flask
- **Image Generation**: Pillow (PIL)
- **Desktop**: PyWebView

## 📄 License

crafted by PJY — MIT License - Feel free to use and modify!