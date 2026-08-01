from dataclasses import dataclass
from typing import Dict, List

@dataclass
class Theme:
    name: str
    background: str
    folder_colors: List[str]
    file_colors: Dict[str, str]
    line_color: str
    text_color: str
    accent_color: str
    style: str

THEMES = {
    "neon_dark": Theme(
        name="Neon Dark",
        background="#0a0a1a",
        folder_colors=["#00d4ff", "#7b2ff7", "#ff6b35", "#00ff88", "#ff006e"],
        file_colors={
            ".py": "#FFD43B", ".js": "#F7DF1E", ".html": "#E34F26", ".css": "#1572B6",
            ".json": "#292929", ".md": "#083FA1", ".txt": "#A0A0A0", ".png": "#FF6B9D",
            ".jpg": "#FF6B9D", ".svg": "#FFB13B", ".ts": "#3178C6", ".vue": "#4FC08D",
            ".default": "#888888"
        },
        line_color="#333366",
        text_color="#ffffff",
        accent_color="#00d4ff",
        style="neon"
    ),
    "ocean_breeze": Theme(
        name="Ocean Breeze",
        background="#0d1b2a",
        folder_colors=["#1b9aaa", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4"],
        file_colors={
            ".py": "#457B9D", ".js": "#1D3557", ".html": "#E63946", ".css": "#457B9D",
            ".default": "#A8DADC"
        },
        line_color="#1b9aaa",
        text_color="#f1faee",
        accent_color="#48cae4",
        style="gradient"
    ),
    "sunset_glow": Theme(
        name="Sunset Glow",
        background="#1a0a2e",
        folder_colors=["#ff6b6b", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"],
        file_colors={
            ".py": "#feca57", ".js": "#ff6b6b", ".html": "#ff9ff3", ".css": "#54a0ff",
            ".default": "#c8d6e5"
        },
        line_color="#5f27cd",
        text_color="#ffffff",
        accent_color="#ff6b6b",
        style="neon"
    ),
    "forest_green": Theme(
        name="Forest Green",
        background="#0d1f0d",
        folder_colors=["#2d6a4f", "#40916c", "#52b788", "#74c69d", "#95d5b2"],
        file_colors={
            ".py": "#95d5b2", ".js": "#74c69d", ".html": "#52b788", ".css": "#40916c",
            ".default": "#b7e4c7"
        },
        line_color="#2d6a4f",
        text_color="#d8f3dc",
        accent_color="#52b788",
        style="flat"
    ),
    "cyberpunk": Theme(
        name="Cyberpunk",
        background="#0d0221",
        folder_colors=["#ff00ff", "#00ffff", "#ff0080", "#80ff00", "#ffff00"],
        file_colors={
            ".py": "#ff00ff", ".js": "#00ffff", ".html": "#ff0080", ".css": "#80ff00",
            ".default": "#ffffff"
        },
        line_color="#ff00ff",
        text_color="#ffffff",
        accent_color="#00ffff",
        style="neon"
    ),
    "minimal_light": Theme(
        name="Minimal Light",
        background="#ffffff",
        folder_colors=["#4A90D9", "#7B68EE", "#FF6B6B", "#51CF66", "#FFA94D"],
        file_colors={
            ".py": "#FFE066", ".js": "#FFF3BF", ".html": "#FFC9C9", ".css": "#A5D8FF",
            ".default": "#E9ECEF"
        },
        line_color="#CED4DA",
        text_color="#212529",
        accent_color="#4A90D9",
        style="flat"
    ),
    "dracula": Theme(
        name="Dracula",
        background="#282a36",
        folder_colors=["#BD93F9", "#FF79C6", "#50FA7B", "#8BE9FD", "#FFB86C"],
        file_colors={
            ".py": "#F1FA8C", ".js": "#50FA7B", ".html": "#FF79C6", ".css": "#8BE9FD",
            ".default": "#6272A4"
        },
        line_color="#6272A4",
        text_color="#F8F8F2",
        accent_color="#BD93F9",
        style="flat"
    ),
    "nord": Theme(
        name="Nord",
        background="#2E3440",
        folder_colors=["#88C0D0", "#81A1C1", "#5E81AC", "#B48EAD", "#A3BE8C"],
        file_colors={
            ".py": "#EBCB8B", ".js": "#A3BE8C", ".html": "#BF616A", ".css": "#88C0D0",
            ".default": "#D8DEE9"
        },
        line_color="#4C566A",
        text_color="#ECEFF4",
        accent_color="#88C0D0",
        style="flat"
    ),
}

def get_theme(name: str) -> Theme:
    return THEMES.get(name, THEMES["neon_dark"])

def get_all_theme_names() -> List[str]:
    return list(THEMES.keys())
