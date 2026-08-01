// Beautiful Directory Tree Visualizer
// Interactive Frontend Engine

const state = {
    treeData: null,
    theme: 'neon_dark',
    maxDepth: 50,
    view: 'tree'
};

// Extension Brand Mapping: Distinct icon and badge colors for each file extension
const fileBrandMap = {
    '.js': { icon: '⚡', label: 'JS', bg: '#F7DF1E', color: '#000000' },
    '.jsx': { icon: '⚛️', label: 'JSX', bg: '#20232A', color: '#61DAFB' },
    '.ts': { icon: '🔷', label: 'TS', bg: '#3178C6', color: '#FFFFFF' },
    '.tsx': { icon: '⚛️', label: 'TSX', bg: '#3178C6', color: '#FFFFFF' },
    '.py': { icon: '🐍', label: 'PY', bg: '#FFD43B', color: '#3776AB' },
    '.html': { icon: '🌐', label: 'HTML', bg: '#E34F26', color: '#FFFFFF' },
    '.css': { icon: '🎨', label: 'CSS', bg: '#1572B6', color: '#FFFFFF' },
    '.scss': { icon: '💖', label: 'SCSS', bg: '#CC6699', color: '#FFFFFF' },
    '.less': { icon: '🎨', label: 'LESS', bg: '#1D365D', color: '#FFFFFF' },
    '.json': { icon: '📋', label: 'JSON', bg: '#F7DF1E', color: '#292929' },
    '.xml': { icon: '📄', label: 'XML', bg: '#FF6600', color: '#FFFFFF' },
    '.yaml': { icon: '⚙️', label: 'YAML', bg: '#CB171E', color: '#FFFFFF' },
    '.yml': { icon: '⚙️', label: 'YML', bg: '#CB171E', color: '#FFFFFF' },
    '.md': { icon: '📝', label: 'MD', bg: '#083FA1', color: '#FFFFFF' },
    '.txt': { icon: '📄', label: 'TXT', bg: '#4A5568', color: '#FFFFFF' },
    '.log': { icon: '📋', label: 'LOG', bg: '#718096', color: '#FFFFFF' },
    '.png': { icon: '🖼️', label: 'PNG', bg: '#FF6B9D', color: '#FFFFFF' },
    '.jpg': { icon: '🖼️', label: 'JPG', bg: '#FF6B9D', color: '#FFFFFF' },
    '.jpeg': { icon: '🖼️', label: 'JPEG', bg: '#FF6B9D', color: '#FFFFFF' },
    '.gif': { icon: '🎞️', label: 'GIF', bg: '#9B51E0', color: '#FFFFFF' },
    '.svg': { icon: '🎨', label: 'SVG', bg: '#FFB13B', color: '#000000' },
    '.vue': { icon: '💚', label: 'VUE', bg: '#4FC08D', color: '#FFFFFF' },
    '.svelte': { icon: '🔥', label: 'SVELTE', bg: '#FF3E00', color: '#FFFFFF' },
    '.pdf': { icon: '📕', label: 'PDF', bg: '#E1251B', color: '#FFFFFF' },
    '.doc': { icon: '📘', label: 'DOC', bg: '#2B579A', color: '#FFFFFF' },
    '.docx': { icon: '📘', label: 'DOCX', bg: '#2B579A', color: '#FFFFFF' },
    '.zip': { icon: '📦', label: 'ZIP', bg: '#F2A900', color: '#000000' },
    '.tar': { icon: '📦', label: 'TAR', bg: '#F2A900', color: '#000000' },
    '.gz': { icon: '📦', label: 'GZ', bg: '#F2A900', color: '#000000' },
    '.rar': { icon: '📦', label: 'RAR', bg: '#F2A900', color: '#000000' },
    '.sql': { icon: '🗄️', label: 'SQL', bg: '#336791', color: '#FFFFFF' },
    '.db': { icon: '🗄️', label: 'DB', bg: '#003B57', color: '#FFFFFF' },
    '.env': { icon: '🔑', label: 'ENV', bg: '#41B883', color: '#000000' },
    '.gitignore': { icon: '🔒', label: 'GIT', bg: '#F05032', color: '#FFFFFF' },
    '.dockerfile': { icon: '🐳', label: 'DOCKER', bg: '#2496ED', color: '#FFFFFF' },
    '.c': { icon: '⚙️', label: 'C', bg: '#A8B9CC', color: '#000000' },
    '.cpp': { icon: '⚙️', label: 'C++', bg: '#00599C', color: '#FFFFFF' },
    '.h': { icon: '⚙️', label: 'H', bg: '#A8B9CC', color: '#000000' },
    '.java': { icon: '☕', label: 'JAVA', bg: '#5382A1', color: '#FFFFFF' },
    '.go': { icon: '🔵', label: 'GO', bg: '#00ADD8', color: '#FFFFFF' },
    '.rs': { icon: '🦀', label: 'RUST', bg: '#DEA584', color: '#000000' },
    '.rb': { icon: '💎', label: 'RUBY', bg: '#CC342D', color: '#FFFFFF' },
    '.php': { icon: '🐘', label: 'PHP', bg: '#777BB4', color: '#FFFFFF' },
    '.sh': { icon: '🖥️', label: 'SH', bg: '#4EAA25', color: '#FFFFFF' },
    '.bash': { icon: '🖥️', label: 'BASH', bg: '#4EAA25', color: '#FFFFFF' },
    '.default': { icon: '📄', label: 'FILE', bg: '#4A5568', color: '#FFFFFF' }
};

const folderColors = [
    'var(--folder-color-1)', 'var(--folder-color-2)',
    'var(--folder-color-3)', 'var(--folder-color-4)',
    'var(--folder-color-5)'
];

// DOM Elements
const treeInput = document.getElementById('treeInput');
const jsonInput = document.getElementById('jsonInput');
const treeContainer = document.getElementById('treeContainer');
const themeSelect = document.getElementById('themeSelect');
const depthRange = document.getElementById('depthRange');
const depthValue = document.getElementById('depthValue');
const visualizeBtn = document.getElementById('visualizeBtn');
const exportBtn = document.getElementById('exportBtn');
const copyBtn = document.getElementById('copyBtn');
const statsBar = document.getElementById('statsBar');
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');

function safeAddListener(element, event, handler) {
    if (element) element.addEventListener(event, handler);
}

// Toast notification helper
function showToast(message, icon = '✨') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Controls
safeAddListener(themeSelect, 'change', (e) => {
    state.theme = e.target.value;
    document.body.setAttribute('data-theme', state.theme);
    if (state.treeData) renderTree();
});

safeAddListener(depthRange, 'input', (e) => {
    state.maxDepth = parseInt(e.target.value, 10);
    if (depthValue) {
        depthValue.textContent = state.maxDepth >= 50 ? 'Full (50)' : state.maxDepth;
    }
    if (state.treeData) renderTree();
});

safeAddListener(visualizeBtn, 'click', () => {
    const activeTabEl = document.querySelector('.tab-btn.active');
    const activeTab = activeTabEl ? activeTabEl.dataset.tab : 'text';

    if (activeTab === 'text') {
        const input = treeInput ? treeInput.value.trim() : '';
        if (!input) {
            showToast('Please enter a directory tree first!', '⚠️');
            return;
        }
        state.treeData = parseTextTree(input);
    } else if (activeTab === 'json') {
        const input = jsonInput ? jsonInput.value.trim() : '';
        if (!input) {
            showToast('Please enter JSON tree structure!', '⚠️');
            return;
        }
        try {
            state.treeData = JSON.parse(input);
            setDepths(state.treeData, 0);
        } catch (e) {
            showToast('Invalid JSON structure: ' + e.message, '❌');
            return;
        }
    } else if (activeTab === 'upload') {
        if (!state.treeData) {
            showToast('Please drop or browse a folder first!', '📁');
            return;
        }
    }

    renderTree();
    updateStats();
    showToast('Tree rendered successfully!', '🚀');
});

safeAddListener(exportBtn, 'click', exportAsImage);
safeAddListener(copyBtn, 'click', copyAsText);

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.toggle('active', c.id === tabName + 'Tab');
    });
}

// Views
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.view = btn.dataset.view;
        if (state.treeData) renderTree();
    });
});

safeAddListener(uploadArea, 'click', () => {
    if (fileInput) fileInput.click();
});

safeAddListener(fileInput, 'change', handleFolderUpload);

// Drag & Drop
const dropTargets = [uploadArea, treeInput].filter(Boolean);

dropTargets.forEach(target => {
    ['dragenter', 'dragover'].forEach(eventName => {
        target.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            target.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        target.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            target.classList.remove('drag-over');
        }, false);
    });

    target.addEventListener('drop', handleDrop, false);
});

async function handleDrop(e) {
    const dt = e.dataTransfer;
    if (!dt) return;

    const items = dt.items;

    if (items && items.length > 0) {
        const item = items[0];
        const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;

        if (entry) {
            if (entry.isDirectory) {
                showToast(`Reading folder "${entry.name}"...`, '⏳');
                const rootTree = await parseEntry(entry);
                setDepths(rootTree, 0);
                state.treeData = rootTree;
                if (treeInput) treeInput.value = treeToString(rootTree);
                switchTab('upload');
                renderTree();
                updateStats();
                showToast(`Successfully loaded folder "${entry.name}"!`, '🎉');
                return;
            } else if (entry.isFile) {
                entry.file(file => readFileContent(file));
                return;
            }
        }
    }

    if (dt.files && dt.files.length > 0) {
        readFileContent(dt.files[0]);
    }
}

async function parseEntry(entry) {
    if (entry.isFile) {
        return new Promise((resolve) => {
            entry.file(file => {
                const ext = file.name.includes('.') ? '.' + file.name.split('.').pop() : null;
                resolve({
                    name: file.name,
                    isFolder: false,
                    children: [],
                    extension: ext
                });
            }, () => resolve(null));
        });
    } else if (entry.isDirectory) {
        const dirReader = entry.createReader();
        const entries = await new Promise((resolve) => {
            let allEntries = [];
            function read() {
                dirReader.readEntries(results => {
                    if (results.length === 0) {
                        resolve(allEntries);
                    } else {
                        allEntries = allEntries.concat(Array.from(results));
                        read();
                    }
                }, () => resolve(allEntries));
            }
            read();
        });

        const children = [];
        for (const childEntry of entries) {
            const childNode = await parseEntry(childEntry);
            if (childNode) children.push(childNode);
        }

        children.sort((a, b) => {
            if (a.isFolder === b.isFolder) {
                return a.name.localeCompare(b.name);
            }
            return a.isFolder ? -1 : 1;
        });

        return {
            name: entry.name,
            isFolder: true,
            children: children
        };
    }
}

function readFileContent(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        if (file.name.endsWith('.json')) {
            try {
                const data = JSON.parse(content);
                setDepths(data, 0);
                state.treeData = data;
                if (jsonInput) jsonInput.value = content;
                switchTab('json');
                renderTree();
                updateStats();
                showToast(`Loaded ${file.name}!`, '📄');
                return;
            } catch (err) {
                showToast('Invalid JSON file', '❌');
            }
        }
        if (treeInput) treeInput.value = content;
        switchTab('text');
        state.treeData = parseTextTree(content);
        renderTree();
        updateStats();
        showToast(`Loaded ${file.name}!`, '📄');
    };
    reader.readAsText(file);
}

function setDepths(node, depth = 0) {
    if (!node) return;
    node.depth = depth;
    if (node.children) {
        node.children.forEach(child => setDepths(child, depth + 1));
    }
}

// Tree parser for text input
function parseTextTree(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length === 0) return null;

    const rootName = lines[0].trim().replace(/[├└│─\s]/g, '').replace(/\/$/, '');
    const root = { name: rootName, isFolder: true, children: [], depth: 0 };

    const stack = [{ node: root, indent: -1 }];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const content = line.replace(/[│\s]/g, '').replace(/^[├└]\s*─\s*/, '');

        if (!content.trim()) continue;

        let indent = 0;
        for (let j = 0; j < line.length; j++) {
            if ('│ ├└─ '.includes(line[j])) indent++;
            else break;
        }
        indent = Math.floor(indent / 4);

        const isFolder = !content.includes('.') || content.endsWith('/');
        const name = content.replace(/\/$/, '');
        const ext = isFolder ? null : '.' + name.split('.').pop();

        const node = { name, isFolder, children: [], depth: indent + 1, extension: ext };

        while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
            stack.pop();
        }

        stack[stack.length - 1].node.children.push(node);
        stack.push({ node, indent });
    }

    return root;
}

// Tree renderer
function renderTree() {
    if (!treeContainer) return;

    if (!state.treeData) {
        treeContainer.innerHTML = `
            <div class="empty-state">
                <p>👈 Enter a directory structure or drop a folder and click Visualize!</p>
            </div>
        `;
        return;
    }

    treeContainer.innerHTML = '';

    if (state.view === 'tree') {
        renderClassicTree(state.treeData, treeContainer, 0);
    } else if (state.view === 'graph') {
        renderGraphView(state.treeData, treeContainer);
    } else if (state.view === 'mindmap') {
        renderMindMap(state.treeData, treeContainer);
    }
}

function renderClassicTree(node, container, depth) {
    if (depth > state.maxDepth) return;

    const nodeEl = document.createElement('div');
    nodeEl.className = 'tree-node';
    nodeEl.style.animationDelay = `${depth * 0.02}s`;

    const contentEl = document.createElement('div');
    contentEl.className = `tree-node-content ${node.isFolder ? 'folder' : 'file'}`;

    const iconEl = document.createElement('span');
    iconEl.className = 'tree-icon';

    if (node.isFolder) {
        iconEl.textContent = '📁';
        iconEl.style.color = folderColors[depth % folderColors.length];
    } else {
        const extKey = node.extension ? node.extension.toLowerCase() : '.default';
        const brand = fileBrandMap[extKey] || fileBrandMap['.default'];
        iconEl.textContent = brand.icon;
    }
    contentEl.appendChild(iconEl);

    const nameEl = document.createElement('span');
    nameEl.className = 'tree-name';
    nameEl.textContent = node.name;
    if (node.isFolder) {
        nameEl.style.color = folderColors[depth % folderColors.length];
    }
    contentEl.appendChild(nameEl);

    // Extension Badge with brand color
    if (!node.isFolder && node.extension) {
        const extKey = node.extension.toLowerCase();
        const brand = fileBrandMap[extKey] || fileBrandMap['.default'];
        const extEl = document.createElement('span');
        extEl.className = 'tree-extension';
        extEl.textContent = brand.label;
        extEl.style.backgroundColor = brand.bg;
        extEl.style.color = brand.color;
        contentEl.appendChild(extEl);
    }

    nodeEl.appendChild(contentEl);

    if (node.isFolder && node.children && node.children.length > 0 && depth < state.maxDepth) {
        const childrenEl = document.createElement('div');
        childrenEl.className = 'tree-children';

        node.children.forEach(child => {
            renderClassicTree(child, childrenEl, depth + 1);
        });

        nodeEl.appendChild(childrenEl);
    }

    container.appendChild(nodeEl);
}

function renderGraphView(node, container) {
    const canvas = document.createElement('canvas');
    const totalNodeCount = countNodes(node);
    canvas.width = Math.max(container.clientWidth || 700, 650);
    canvas.height = Math.max(450, totalNodeCount * 28);
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    drawGraphNode(ctx, node, 40, 40, canvas.width - 80, canvas.height - 80, 0);
}

function drawGraphNode(ctx, node, x, y, width, height, depth) {
    const color = node.isFolder
        ? (folderColors[depth % folderColors.length] || '#00d4ff')
        : '#888888';

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(x, y, Math.min(130, width), 30, 6);
    } else {
        ctx.rect(x, y, Math.min(130, width), 30);
    }
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = color;
    ctx.font = '600 13px Inter, sans-serif';
    ctx.fillText(node.name, x + 10, y + 20);

    if (node.children && node.children.length > 0 && depth < state.maxDepth) {
        const childHeight = height / node.children.length;
        node.children.forEach((child, i) => {
            const childY = y + i * childHeight + childHeight / 4;
            const childX = x + 160;

            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x + 130, y + 15);
            ctx.lineTo(childX, childY + 15);
            ctx.stroke();

            drawGraphNode(ctx, child, childX, childY, width - 160, childHeight, depth + 1);
        });
    }
}

// Mind Map View with "Coming Soon in a future update" card in body
function renderMindMap(node, container) {
    container.innerHTML = `
        <div class="coming-soon-card">
            <div class="coming-soon-icon">🧠</div>
            <h3>Mind Map View</h3>
            <p>Interactive Mind Mapping is currently in development and will be coming soon in a future update!</p>
            <div class="coming-soon-badge">✨ Update Coming Soon</div>
        </div>
    `;
}

function countNodes(node) {
    let count = 1;
    if (node && node.children) {
        node.children.forEach(child => count += countNodes(child));
    }
    return count;
}

function updateStats() {
    if (!state.treeData) return;

    let folders = 0, files = 0, maxD = 0;

    function traverse(node) {
        if (!node) return;
        if (node.isFolder) folders++;
        else files++;
        maxD = Math.max(maxD, node.depth || 0);
        if (node.children) node.children.forEach(traverse);
    }

    traverse(state.treeData);

    const folderCountEl = document.getElementById('folderCount');
    const fileCountEl = document.getElementById('fileCount');
    const maxDepthEl = document.getElementById('maxDepth');
    const totalItemsEl = document.getElementById('totalItems');

    if (folderCountEl) folderCountEl.textContent = folders;
    if (fileCountEl) fileCountEl.textContent = files;
    if (maxDepthEl) maxDepthEl.textContent = maxD;
    if (totalItemsEl) totalItemsEl.textContent = folders + files;
    if (statsBar) statsBar.style.display = 'flex';
}

// Canvas Fallback Generator for PNG Image Export
function generateCanvasPNG(treeData, themeName) {
    function flattenTree(node, prefix = '', isLast = true, depth = 0) {
        let lines = [];
        if (depth === 0) {
            lines.push({ text: node.name + '/', isFolder: true, depth: 0 });
        } else {
            const connector = isLast ? '└── ' : '├── ';
            lines.push({ text: prefix + connector + node.name + (node.isFolder ? '/' : ''), isFolder: node.isFolder, depth });
        }
        if (node.isFolder && node.children) {
            const ext = isLast ? '    ' : '│   ';
            const nextPrefix = prefix + (depth > 0 ? ext : '');
            node.children.forEach((child, i) => {
                const lastChild = i === node.children.length - 1;
                lines = lines.concat(flattenTree(child, nextPrefix, lastChild, depth + 1));
            });
        }
        return lines;
    }

    const lines = flattenTree(treeData);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const padding = 30;
    const lineHeight = 26;
    const fontSize = 14;

    ctx.font = `600 ${fontSize}px "Fira Code", monospace`;
    const maxTextWidth = lines.reduce((max, l) => Math.max(max, ctx.measureText(l.text).width), 200);

    canvas.width = Math.max(650, maxTextWidth + padding * 2 + 40);
    canvas.height = lines.length * lineHeight + padding * 2 + 50;

    const bgColors = {
        'neon_dark': '#0a0a1a',
        'ocean_breeze': '#0d1b2a',
        'sunset_glow': '#1a0a2e',
        'forest_green': '#0d1f0d',
        'cyberpunk': '#0d0221',
        'minimal_light': '#f8f9fa',
        'dracula': '#282a36',
        'nord': '#2E3440'
    };

    ctx.fillStyle = bgColors[themeName] || '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00d4ff';
    ctx.font = `700 16px Inter, sans-serif`;
    ctx.fillText(`📂 Directory Tree: ${treeData.name}`, padding, 30);

    ctx.strokeStyle = '#333366';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, 42);
    ctx.lineTo(canvas.width - padding, 42);
    ctx.stroke();

    ctx.font = `500 ${fontSize}px "Fira Code", monospace`;
    let y = 70;
    const themeFolderColors = ['#00d4ff', '#7b2ff7', '#ff6b35', '#00ff88', '#ff006e'];

    lines.forEach(line => {
        ctx.fillStyle = line.isFolder ? (themeFolderColors[line.depth % themeFolderColors.length]) : '#e0e0e0';
        ctx.fillText(line.text, padding, y);
        y += lineHeight;
    });

    return canvas.toDataURL('image/png');
}

// Guaranteed Image Exporter (tries backend endpoint first, falls back to HTML5 Canvas)
async function exportAsImage() {
    if (!state.treeData) {
        showToast('Please visualize a tree before exporting!', '⚠️');
        return;
    }

    if (exportBtn) {
        exportBtn.textContent = '⏳ Exporting...';
        exportBtn.disabled = true;
    }

    try {
        const response = await fetch('/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tree: state.treeData,
                theme: state.theme
            })
        });

        if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `${state.treeData.name || 'tree'}_visualization.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
            showToast('Image exported successfully!', '🎨');
            return;
        }
    } catch (err) {
        console.warn('Backend export endpoint unavailable, falling back to client canvas', err);
    }

    // High-reliability Client Canvas Fallback
    try {
        const dataUrl = generateCanvasPNG(state.treeData, state.theme);
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${state.treeData.name || 'tree'}_visualization.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToast('Image exported successfully!', '🎨');
    } catch (err) {
        console.error('Canvas Export Error:', err);
        showToast('Failed to export image.', '❌');
    } finally {
        if (exportBtn) {
            exportBtn.textContent = 'Export as Image';
            exportBtn.disabled = false;
        }
    }
}

function copyAsText() {
    if (!state.treeData) {
        showToast('No tree to copy!', '⚠️');
        return;
    }

    const text = state.treeData.name + '\n' + treeToString(state.treeData);
    navigator.clipboard.writeText(text).then(() => {
        showToast('Tree copied to clipboard!', '📋');
    }).catch(() => {
        showToast('Failed to copy to clipboard', '❌');
    });
}

function treeToString(node) {
    function toText(n, prefix = '', isLast = true) {
        let result = '';
        const connector = isLast ? '└── ' : '├── ';
        result += prefix + connector + n.name + (n.isFolder ? '/' : '') + '\n';

        if (n.isFolder && n.children) {
            const ext = isLast ? '    ' : '│   ';
            n.children.forEach((child, i) => {
                result += toText(child, prefix + ext, i === n.children.length - 1);
            });
        }
        return result;
    }

    return toText(node);
}

function handleFolderUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let rootName = 'Selected Folder';
    if (files[0].webkitRelativePath) {
        const parts = files[0].webkitRelativePath.split('/');
        if (parts.length > 1) rootName = parts[0];
    }

    const root = { name: rootName, isFolder: true, children: [], depth: 0 };
    const map = new Map();
    map.set('', root);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let path = file.webkitRelativePath || file.name;

        if (rootName && path.startsWith(rootName + '/')) {
            path = path.substring(rootName.length + 1);
        }
        if (!path) continue;

        const parts = path.split('/');
        let currentPath = '';
        let parent = root;

        for (let j = 0; j < parts.length; j++) {
            const part = parts[j];
            currentPath = (currentPath ? currentPath + '/' : '') + part;

            let node = map.get(currentPath);
            if (!node) {
                const isLast = (j === parts.length - 1);
                let isFolder = !isLast;
                let extension = null;
                if (isLast && part.includes('.')) {
                    isFolder = false;
                    extension = '.' + part.split('.').pop();
                }
                node = {
                    name: part,
                    isFolder: isFolder,
                    children: [],
                    depth: j + 1,
                    extension: extension
                };
                map.set(currentPath, node);
                parent.children.push(node);
            }
            parent = node;
        }
    }

    setDepths(root, 0);
    state.treeData = root;
    renderTree();
    updateStats();
    if (treeInput) treeInput.value = treeToString(root);
    showToast(`Loaded ${files.length} items from folder!`, '📁');
}

// Initial setup - Start completely empty
document.body.setAttribute('data-theme', state.theme);

if (treeInput) {
    treeInput.value = '';
}
state.treeData = null;
renderTree();
