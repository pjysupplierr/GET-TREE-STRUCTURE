#  Witch_Tree_Craft

> **Crafted by PJY**  
> Transform folder structures into stunning, interactive visual trees!

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-Backend-lightgrey?logo=flask)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 📖 Overview

**Witch_Tree_Craft** is a powerful and beautiful directory visualization tool. Whether you are documenting a codebase, organizing project files, or just love aesthetic representations of your folder structures, this tool converts any directory into an interactive, themeable visual tree instantly.

---

##  Features

-  **8 Beautiful Themes**: Neon Dark, Ocean Breeze, Sunset Glow, Cyberpunk, Forest Green, Minimal Light, Dracula, and Nord.
-  **Multiple Views**: Switch seamlessly between Classic Tree, Horizontal Graph, and Mind Map layouts.
-  **Export as Image**: Save your tree visualization directly as a high-resolution PNG.
-  **Copy as Text**: Instantly copy formatted ASCII/Unicode tree structures for your `README.md` or documentation.
-  **Drag & Drop**: Drag and drop any folder or file directly into the browser for instant visualization.
-  **Cross-Platform**: Available as a real-time interactive Web App and a Standalone Desktop App.

---

##  Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Backend**: Python, Flask
- **Image Generation**: Pillow (PIL)
- **Desktop Wrapper**: PyWebView

---

##  Quick Start

### 1️ Prerequisites
Ensure you have the following installed on your system:
- [Python 3.8 or higher](https://www.python.org/downloads/)
- `pip` (Python package installer)

### 2️ Installation

**Step 1:** Clone the repository
```bash
git clone https://github.com/uyg7x/Witch_Tree_Craft.git
cd Witch_Tree_Craft

# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

option 1  --> python desktop_app.py
option 2  --> python app.py
