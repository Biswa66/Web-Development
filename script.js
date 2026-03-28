
// =================== STATE ===================
const STORAGE_KEY = 'devvault_projects';
const BOOKMARKS_KEY = 'devvault_bookmarks';
const THEME_KEY = 'devvault_theme';
const PASSWORD_KEY = 'devvault_password';
const PASSWORD_SET_KEY = 'devvault_password_set';
let projects = [];
let bookmarks = new Set();
let currentView = 'dashboard';
let currentCategory = 'All';
let searchQuery = '';
let currentPage = 1;
const PAGE_SIZE = 12;
let deleteTargetId = null;

// =================== SEED DATA ===================
const SEED = [
    { t: "Portfolio Website", d: "A responsive personal portfolio with smooth scroll animations and dark mode", c: "HTML", df: "Beginner", tg: ["responsive", "portfolio", "animations"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }, { label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "CSS Grid Dashboard", d: "Admin dashboard layout using CSS Grid with responsive sidebar", c: "CSS", df: "Intermediate", tg: ["grid", "dashboard", "layout"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
    { t: "Weather App", d: "Real-time weather data app using OpenWeather API with geolocation", c: "JavaScript", df: "Intermediate", tg: ["api", "fetch", "geolocation"], ln: [{ label: "GitHub", url: "https://github.com", type: "github" }, { label: "Docs", url: "https://openweathermap.org", type: "docs" }] },
    { t: "React Todo with Redux", d: "Full CRUD todo app with Redux Toolkit state management", c: "React", df: "Intermediate", tg: ["redux", "state", "crud"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }, { label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "E-commerce Store", d: "Full-stack online store with cart, checkout and Stripe integration", c: "Full Stack", df: "Advanced", tg: ["stripe", "auth", "database"], ln: [{ label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "REST API Server", d: "Express.js REST API with JWT auth and MongoDB", c: "Node.js", df: "Advanced", tg: ["express", "jwt", "mongodb"], ln: [{ label: "Docs", url: "https://example.com", type: "docs" }] },
    { t: "Vue Kanban Board", d: "Drag-and-drop task management board built with Vue 3", c: "Vue", df: "Intermediate", tg: ["drag-drop", "composition-api"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
    { t: "Python Flask Blog", d: "Full blog engine with markdown support and user auth", c: "Python", df: "Intermediate", tg: ["flask", "markdown", "auth"], ln: [{ label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "TypeScript Utility Library", d: "Typed utility functions with 100% test coverage", c: "TypeScript", df: "Advanced", tg: ["testing", "npm", "types"], ln: [{ label: "GitHub", url: "https://github.com", type: "github" }, { label: "Docs", url: "https://example.com", type: "docs" }] },
    { t: "Next.js Blog Platform", d: "SSR/SSG blog with MDX, SEO optimization and ISR", c: "Next.js", df: "Advanced", tg: ["ssr", "ssg", "mdx", "seo"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }, { label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "CSS Animations Gallery", d: "Collection of 20+ pure CSS animations and transitions", c: "CSS", df: "Beginner", tg: ["animations", "keyframes", "transitions"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
    { t: "Chat Application", d: "Real-time chat with WebSocket, typing indicators and rooms", c: "Full Stack", df: "Advanced", tg: ["websocket", "realtime", "rooms"], ln: [{ label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "Form Validator", d: "Comprehensive client-side form validation with custom rules", c: "JavaScript", df: "Beginner", tg: ["forms", "validation", "ux"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }, { label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "GraphQL API", d: "GraphQL server with Apollo, resolvers and schema design", c: "API", df: "Advanced", tg: ["graphql", "apollo", "schema"], ln: [{ label: "Docs", url: "https://example.com", type: "docs" }] },
    { t: "Responsive Landing Page", d: "Modern landing page with parallax, testimonials and CTA", c: "HTML", df: "Beginner", tg: ["landing", "parallax", "responsive"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
    { t: "React Native Fitness App", d: "Cross-platform fitness tracker with charts and goals", c: "React", df: "Advanced", tg: ["mobile", "charts", "health"], ln: [{ label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "CSS Flexbox Playground", d: "Interactive tool to learn and experiment with Flexbox", c: "CSS", df: "Beginner", tg: ["flexbox", "interactive", "learning"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
    { t: "Node.js File Uploader", d: "Drag-and-drop file upload service with progress and preview", c: "Node.js", df: "Intermediate", tg: ["upload", "multer", "streams"], ln: [{ label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "Snake Game", d: "Classic snake game with score tracking and difficulty levels", c: "JavaScript", df: "Beginner", tg: ["canvas", "game", "animation"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }, { label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "Vue E-commerce", d: "Vue 3 storefront with Pinia state, cart and product filtering", c: "Vue", df: "Advanced", tg: ["pinia", "composition-api", "e-commerce"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
    { t: "Django REST Framework", d: "Python REST API with serializers, viewsets and permissions", c: "Python", df: "Intermediate", tg: ["django", "rest", "permissions"], ln: [{ label: "Docs", url: "https://example.com", type: "docs" }, { label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "TypeScript React App", d: "Type-safe React app with custom hooks and context", c: "TypeScript", df: "Intermediate", tg: ["react", "hooks", "context"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
    { t: "Markdown Editor", d: "Split-pane markdown editor with live preview and export", c: "JavaScript", df: "Intermediate", tg: ["markdown", "editor", "preview"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }, { label: "GitHub", url: "https://github.com", type: "github" }] },
    { t: "Next.js Dashboard", d: "Analytics dashboard with charts, tables and real-time data", c: "Next.js", df: "Advanced", tg: ["charts", "analytics", "ssr"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
    { t: "CSS Art Collection", d: "Pure CSS illustrations and art pieces", c: "CSS", df: "Intermediate", tg: ["art", "creative", "shapes"], ln: [{ label: "Live Demo", url: "https://example.com", type: "demo" }] },
];

function seedToProject(s, i) {
    return { id: 'seed_' + i, title: s.t, description: s.d, category: s.c, difficulty: s.df, tags: s.tg, links: s.ln, date: new Date(Date.now() - i * 86400000 * 2).toISOString(), bookmarked: false };
}

// =================== STORAGE & DATA SDK ===================
async function loadFromFirebase() {
    const querySnapshot = await getDocs(collection(window.db, "projects"));

    const cloudProjects = [];

    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        cloudProjects.push({
            id: docSnap.id,
            ...data,
            tags: data.tags || [],
            links: data.links || [],
            fromCloud: true
        });
    });

    projects = cloudProjects;
    saveData();
    render();
}
function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        projects = raw ? JSON.parse(raw) : SEED.map(seedToProject);
        if (!raw) saveData();
        const bm = localStorage.getItem(BOOKMARKS_KEY);
        bookmarks = bm ? new Set(JSON.parse(bm)) : new Set();
    } catch (e) {
        projects = SEED.map(seedToProject);
        bookmarks = new Set();
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    // Don't call syncToCloud here - it will be called separately
}

function saveBookmarks() {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...bookmarks]));
}

// Sync new/unsynced projects to cloud
async function syncUnsynced() {
    if (!window.dataSdk || isSyncing) return;
    isSyncing = true;

    try {
        for (const p of projects) {
            // Skip if already synced
            if (p.id && !p.id.startsWith('p_')) continue;
            if (syncedIds.has(p.id)) continue;

            const record = {
                title: p.title,
                description: p.description,
                category: p.category,
                difficulty: p.difficulty,
                tags: JSON.stringify(p.tags || []),
                links: JSON.stringify(p.links || []),
                date: p.date
            };

            const result = await window.dataSdk.create(record);
            if (result.isOk) {
                const oldId = p.id;
                p.id = result.data.__backendId;
                p.fromCloud = true;
                syncedIds.set(oldId, p.id);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
                toast(`☁ "${p.title}" synced to cloud`);
            } else {
                console.error('Sync failed for project:', p.title, result.error);
                toast(`Failed to sync "${p.title}"`, 'error');
            }
        }
    } catch (e) {
        console.error('Sync error:', e);
    } finally {
        isSyncing = false;
    }
}

// =================== THEME ===================
function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon();
}
function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeIcon();
}
function updateThemeIcon() {
    const icon = document.getElementById('themeIcon');
    if (icon) icon.setAttribute('data-lucide', document.documentElement.getAttribute('data-theme') === 'dark' ? 'sun' : 'moon');
    lucide.createIcons();
}

// =================== SIDEBAR ===================
function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebarOverlay');
    sb.classList.toggle('open');
    ov.classList.toggle('hidden');
}

// =================== CATEGORIES ===================
function getCategories() {
    const cats = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(cats).sort()];
}
function renderSidebarCategories() {
    const el = document.getElementById('sidebarCategories');
    const cats = getCategories().filter(c => c !== 'All');
    const iconMap = {
        HTML: 'globe', CSS: 'palette', JavaScript: 'terminal', React: 'atom', Vue: 'component', Python: 'code',
        'Node.js': 'server', 'Full Stack': 'layers', TypeScript: 'type', API: 'cloud', 'Next.js': 'zap', Other: 'box'
    };
    el.innerHTML = cats.map(c => `<div class="sidebar-link" data-cat="${c}"><i data-lucide="${iconMap[c] || 'folder'}" style="width:16px;height:16px;"></i>${c}<span class="ml-auto text-xs" style="opacity:0.4;">${projects.filter(p => p.category === c).length}</span></div>`).join('');
    lucide.createIcons();
}

// =================== TOAST ===================
function toast(msg, type = 'success') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" style="width:16px;height:16px;"></i>${msg}`;
    c.appendChild(t);
    lucide.createIcons();
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 3000);
}

// =================== MODALS ===================
function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

// =================== LINKS FIELDS ===================
let linkFields = [];
function addLinkField(label = '', url = '', type = 'demo') {
    linkFields.push({ label, url, type });
    renderLinkFields();
}
function removeLinkField(i) { linkFields.splice(i, 1); renderLinkFields(); }
function renderLinkFields() {
    const c = document.getElementById('linksContainer');
    c.innerHTML = linkFields.map((l, i) => `
    <div class="flex gap-2 items-center">
      <select onchange="linkFields[${i}].type=this.value" class="w-28 flex-shrink-0" style="padding:8px 10px;font-size:13px;">
        <option value="demo" ${l.type === 'demo' ? 'selected' : ''}>Demo</option>
        <option value="github" ${l.type === 'github' ? 'selected' : ''}>GitHub</option>
        <option value="docs" ${l.type === 'docs' ? 'selected' : ''}>Docs</option>
      </select>
      <input value="${l.label || ''}" placeholder="Label" onchange="linkFields[${i}].label=this.value" class="flex-1" style="padding:8px 10px;font-size:13px;">
      <input value="${l.url || ''}" placeholder="https://..." onchange="linkFields[${i}].url=this.value" class="flex-1" style="padding:8px 10px;font-size:13px;">
      <button type="button" onclick="removeLinkField(${i})" class="p-1.5 rounded-lg btn-ghost flex-shrink-0"><i data-lucide="x" style="width:14px;height:14px;"></i></button>
    </div>
  `).join('');
    lucide.createIcons();
}

// =================== ADD/EDIT ===================
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add Project';
    document.getElementById('editId').value = '';
    document.getElementById('projectForm').reset();
    linkFields = [{ label: 'Live Demo', url: '', type: 'demo' }, { label: 'GitHub', url: '', type: 'github' }];
    renderLinkFields();
    openModal('projectModal');
}
function openEditModal(id) {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    document.getElementById('modalTitle').textContent = 'Edit Project';
    document.getElementById('editId').value = id;
    document.getElementById('pTitle').value = p.title;
    document.getElementById('pDesc').value = p.description;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pDifficulty').value = p.difficulty;
    document.getElementById('pTags').value = (p.tags || []).join(', ');
    linkFields = (p.links || []).map(l => ({ ...l }));
    renderLinkFields();
    openModal('projectModal');
}
async function addProjectToFirebase(project) {
    await addDoc(collection(window.db, "projects"), project);
}
document.getElementById('projectForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const data = {
        title: document.getElementById('pTitle').value.trim(),
        description: document.getElementById('pDesc').value.trim(),
        category: document.getElementById('pCategory').value,
        difficulty: document.getElementById('pDifficulty').value,
        tags: document.getElementById('pTags').value.split(',').map(t => t.trim()).filter(Boolean),
        links: linkFields.filter(l => l.url.trim()),
        date: new Date().toISOString()
    };
    if (id) {
        const idx = projects.findIndex(p => p.id === id);
        if (idx >= 0) { projects[idx] = { ...projects[idx], ...data }; toast('Project updated!'); }
    } else {
        data.id = 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
        data.fromCloud = false;
        projects.unshift(data);
        toast('Project added! ⏳ Syncing to cloud...');
        // 👉 এই লাইনটা নতুন
        addProjectToFirebase(data);
    }
    saveData();
    closeModal('projectModal');
    render();
    // Sync to cloud if this is a new project
    if (!id) setTimeout(syncUnsynced, 300);
});

// =================== DELETE ===================
function confirmDelete(id) { deleteTargetId = id; openModal('deleteModal'); }
function showDeletePassword() {
    document.getElementById('deleteStep1').classList.add('hidden');
    document.getElementById('deleteStep2').classList.remove('hidden');
    document.getElementById('deletePassword').value = '';
    document.getElementById('deleteError').style.display = 'none';
    setTimeout(() => document.getElementById('deletePassword').focus(), 100);
}
function goBackDeleteStep1() {
    document.getElementById('deleteStep2').classList.add('hidden');
    document.getElementById('deleteStep1').classList.remove('hidden');
    document.getElementById('deleteError').style.display = 'none';
}
async function confirmDeleteWithPassword() {
    const pwd = document.getElementById('deletePassword').value;
    const masterPwd = localStorage.getItem(PASSWORD_KEY) || 'admin123';
    if (pwd !== masterPwd) {
        document.getElementById('deleteError').textContent = 'Incorrect password';
        document.getElementById('deleteError').style.display = 'block';
        return;
    }
    if (deleteTargetId) {
        const projectToDelete = projects.find(p => p.id === deleteTargetId);
        projects = projects.filter(p => p.id !== deleteTargetId);
        bookmarks.delete(deleteTargetId);

        // If project was from cloud, delete from cloud too
        if (projectToDelete && projectToDelete.fromCloud && window.dataSdk) {
            const cloudProject = { ...projectToDelete, __backendId: projectToDelete.id };
            window.dataSdk.delete(cloudProject).catch(e => console.error('Failed to delete from cloud:', e));
            if (projectToDelete?.id) {
                await deleteDoc(doc(window.db, "projects", projectToDelete.id));
            }
        }

        saveData();
        saveBookmarks();
        toast('Project deleted!');
        deleteTargetId = null;
        closeModal('deleteModal');
        goBackDeleteStep1();
        render();
    }
}

// =================== BOOKMARK ===================
function toggleBookmark(id) {
    if (bookmarks.has(id)) bookmarks.delete(id); else bookmarks.add(id);
    saveBookmarks();
    render();
}

// =================== FILTER & SEARCH ===================
function getFilteredProjects() {
    let list = [...projects];
    if (currentView === 'bookmarks') list = list.filter(p => bookmarks.has(p.id));
    if (currentCategory !== 'All') list = list.filter(p => p.category === currentCategory);
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q)) || p.category.toLowerCase().includes(q));
    }
    return list;
}

// =================== IMPORT/EXPORT ===================
function openImportExport() { openModal('ioModal'); }
function showExportPassword() {
    document.getElementById('ioStep1').classList.add('hidden');
    document.getElementById('ioStep2').classList.remove('hidden');
    document.getElementById('exportPassword').value = '';
    document.getElementById('exportError').style.display = 'none';
    setTimeout(() => document.getElementById('exportPassword').focus(), 100);
}
function goBackExportStep1() {
    document.getElementById('ioStep2').classList.add('hidden');
    document.getElementById('ioStep1').classList.remove('hidden');
    document.getElementById('exportError').style.display = 'none';
}
function exportDataWithPassword() {
    const pwd = document.getElementById('exportPassword').value;
    const masterPwd = localStorage.getItem(PASSWORD_KEY) || 'admin123';
    if (pwd !== masterPwd) {
        document.getElementById('exportError').textContent = 'Incorrect password';
        document.getElementById('exportError').style.display = 'block';
        return;
    }
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'devvault_projects.json'; a.click();
    URL.revokeObjectURL(url);
    toast('Exported successfully!');
    closeModal('ioModal');
    goBackExportStep1();
}
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
        try {
            const data = JSON.parse(ev.target.result);
            if (Array.isArray(data)) { projects = data; saveData(); toast('Imported ' + data.length + ' projects!'); render(); }
            else toast('Invalid format', 'error');
        } catch (err) { toast('Import failed', 'error'); }
    };
    reader.readAsText(file);
    e.target.value = '';
    closeModal('ioModal');
    goBackExportStep1();
}

// =================== RENDERING ===================
function projectCard(p) {
    const bm = bookmarks.has(p.id);
    const diffClass = p.difficulty === 'Beginner' ? 'badge-beginner' : p.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';
    const linkHtml = (p.links || []).map(l => {
        const cls = l.type === 'demo' ? 'link-demo' : l.type === 'github' ? 'link-github' : 'link-docs';
        const icon = l.type === 'demo' ? 'external-link' : l.type === 'github' ? 'github' : 'book-open';
        return `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="link-pill ${cls}"><i data-lucide="${icon}" style="width:12px;height:12px;"></i>${l.label || l.type}</a>`;
    }).join('');
    const tagsHtml = (p.tags || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('');
    const dateStr = p.date ? new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    return `<div class="card-hover rounded-2xl p-5 fade-in" style="background:var(--surface);border:1px solid var(--border);" data-id="${p.id}">
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-base truncate">${p.title}</h3>
        <div class="flex items-center gap-2 mt-1.5"><span class="badge ${diffClass}">${p.difficulty}</span><span class="text-xs" style="opacity:0.4;">${dateStr}</span></div>
      </div>
      <div class="flex items-center gap-1 flex-shrink-0 ml-2">
        <button onclick="toggleBookmark('${p.id}')" class="bookmark-btn p-1.5 rounded-lg btn-ghost ${bm ? 'active' : ''}"><i data-lucide="bookmark" style="width:16px;height:16px;"></i></button>
        <button onclick="openEditModal('${p.id}')" class="p-1.5 rounded-lg btn-ghost"><i data-lucide="edit-3" style="width:15px;height:15px;"></i></button>
        <button onclick="confirmDelete('${p.id}')" class="p-1.5 rounded-lg btn-ghost" style="color:var(--danger);"><i data-lucide="trash-2" style="width:15px;height:15px;"></i></button>
      </div>
    </div>
    <p class="text-sm mb-3 line-clamp-2" style="opacity:0.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${p.description}</p>
    <div class="flex flex-wrap gap-1.5 mb-3">${tagsHtml}</div>
    <div class="flex flex-wrap gap-2 pt-3" style="border-top:1px solid var(--border);">${linkHtml}</div>
  </div>`;
}

function renderDashboard() {
    const cats = {};
    projects.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]);
    const recent = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
    const total = projects.length;
    const bmCount = bookmarks.size;
    const catCount = Object.keys(cats).length;
    const iconMap = { HTML: 'globe', CSS: 'palette', JavaScript: 'terminal', React: 'atom', Vue: 'component', Python: 'code', 'Node.js': 'server', 'Full Stack': 'layers', TypeScript: 'type', API: 'cloud', 'Next.js': 'zap', Other: 'box' };

    return `<div class="fade-in">
    <div class="mb-8">
      <h1 id="heroHeading" class="text-3xl lg:text-4xl font-bold mb-2">Your Web Dev Projects Hub</h1>
      <p id="heroSubtext" class="text-base" style="opacity:0.5;">Organize, track, and showcase your development journey</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
      <div class="stat-card"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(99,102,241,0.15);"><i data-lucide="folder" style="width:20px;height:20px;color:var(--accent);"></i></div><div><div class="text-2xl font-bold">${total}</div><div class="text-xs" style="opacity:0.5;">Total Projects</div></div></div></div>
      <div class="stat-card"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(34,197,94,0.15);"><i data-lucide="grid" style="width:20px;height:20px;color:#4ade80;"></i></div><div><div class="text-2xl font-bold">${catCount}</div><div class="text-xs" style="opacity:0.5;">Categories</div></div></div></div>
      <div class="stat-card"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(245,158,11,0.15);"><i data-lucide="bookmark" style="width:20px;height:20px;color:#fbbf24;"></i></div><div><div class="text-2xl font-bold">${bmCount}</div><div class="text-xs" style="opacity:0.5;">Bookmarks</div></div></div></div>
      <div class="stat-card"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(239,68,68,0.15);"><i data-lucide="flame" style="width:20px;height:20px;color:#f87171;"></i></div><div><div class="text-2xl font-bold">${projects.filter(p => p.difficulty === 'Advanced').length}</div><div class="text-xs" style="opacity:0.5;">Advanced</div></div></div></div>
    </div>
    <div class="mb-8">
      <h2 class="text-lg font-bold mb-4">Categories Overview</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">${sorted.map(([c, n]) => `
        <div class="stat-card card-hover cursor-pointer" onclick="navigateTo('projects','${c}')">
          <div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:rgba(99,102,241,0.1);"><i data-lucide="${iconMap[c] || 'folder'}" style="width:18px;height:18px;color:var(--accent);"></i></div><div><div class="font-bold">${c}</div><div class="text-xs" style="opacity:0.5;">${n} project${n > 1 ? 's' : ''}</div></div></div>
        </div>`).join('')}</div>
    </div>
    <div>
      <h2 class="text-lg font-bold mb-4">Recently Added</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">${recent.map(p => projectCard(p)).join('')}</div>
    </div>
  </div>`;
}

function renderProjects() {
    const filtered = getFilteredProjects();
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const cats = getCategories();

    const catChips = cats.map(c => `<button class="category-chip ${currentCategory === c ? 'active' : ''}" onclick="setCategory('${c}')">${c}</button>`).join('');
    const cards = paged.length ? paged.map(p => projectCard(p)).join('') : `<div class="col-span-full text-center py-20" style="opacity:0.4;"><i data-lucide="search-x" style="width:48px;height:48px;margin:0 auto 12px;display:block;"></i><p class="text-lg font-semibold">No projects found</p><p class="text-sm mt-1">Try adjusting your search or filters</p></div>`;

    const pagination = totalPages > 1 ? `<div class="flex items-center justify-center gap-2 mt-8">${Array.from({ length: totalPages }, (_, i) => `<button onclick="goToPage(${i + 1})" class="w-9 h-9 rounded-lg text-sm font-semibold ${currentPage === i + 1 ? 'btn-primary text-white' : 'btn-ghost'}">${i + 1}</button>`).join('')}</div>` : '';

    const title = currentView === 'bookmarks' ? 'Bookmarked Projects' : currentCategory !== 'All' ? currentCategory + ' Projects' : 'All Projects';

    return `<div class="fade-in">
    <div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold">${title}</h1><span class="text-sm" style="opacity:0.5;">${filtered.length} project${filtered.length !== 1 ? 's' : ''}</span></div>
    <div class="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1" style="scrollbar-width:none;">${catChips}</div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">${cards}</div>
    ${pagination}
  </div>`;
}

function render() {
    renderSidebarCategories();
    const main = document.getElementById('mainContent');
    if (currentView === 'dashboard') main.innerHTML = renderDashboard();
    else main.innerHTML = renderProjects();
    lucide.createIcons();
    updateActiveNav();
    applyConfig();
}

function updateActiveNav() {
    document.querySelectorAll('#sidebarNav .sidebar-link').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.view === currentView && !el.dataset.cat) el.classList.add('active');
        if (el.dataset.cat === currentCategory && currentView === 'projects') el.classList.add('active');
    });
}

function setCategory(c) { currentCategory = c; currentPage = 1; render(); }
function goToPage(p) { currentPage = p; render(); document.getElementById('mainContent').scrollTop = 0; }
function navigateTo(view, cat) {
    currentView = view;
    if (cat) currentCategory = cat; else currentCategory = 'All';
    currentPage = 1;
    render();
}

// =================== EVENT LISTENERS ===================
document.getElementById('sidebarNav').addEventListener('click', function (e) {
    const link = e.target.closest('.sidebar-link');
    if (!link) return;
    if (link.dataset.view) { currentView = link.dataset.view; currentCategory = 'All'; }
    else if (link.dataset.cat) { currentView = 'projects'; currentCategory = link.dataset.cat; }
    currentPage = 1;
    render();
    if (window.innerWidth < 1024) toggleSidebar();
});

document.getElementById('menuBtn').addEventListener('click', toggleSidebar);
document.getElementById('closeSidebar').addEventListener('click', toggleSidebar);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

let searchTimer;
document.getElementById('searchInput').addEventListener('input', function (e) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        searchQuery = e.target.value.trim();
        if (searchQuery && currentView === 'dashboard') currentView = 'projects';
        currentPage = 1;
        render();
    }, 250);
});

// Keyboard shortcut: Ctrl+K to focus search
document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); document.getElementById('searchInput').focus(); }
    if (e.key === 'Escape') { closeModal('projectModal'); closeModal('deleteModal'); closeModal('ioModal'); }
});

// =================== ELEMENT SDK ===================
const defaultConfig = {
    site_title: 'DevVault',
    hero_heading: 'Your Web Dev Projects Hub',
    hero_subtext: 'Organize, track, and showcase your development journey',
    master_password: 'admin123',
    background_color: '#0b0f19',
    surface_color: '#131825',
    text_color: '#e2e8f0',
    accent_color: '#6366f1',
    secondary_action_color: '#818cf8',
    font_family: 'DM Sans',
    font_size: 16
};

function applyConfig() {
    const cfg = (window.elementSdk && window.elementSdk.config) || defaultConfig;

    // Store password
    if (cfg.master_password) localStorage.setItem(PASSWORD_KEY, cfg.master_password);

    const st = document.getElementById('sidebarTitle');
    if (st) st.textContent = cfg.site_title || defaultConfig.site_title;
    const hh = document.getElementById('heroHeading');
    if (hh) hh.textContent = cfg.hero_heading || defaultConfig.hero_heading;
    const hs = document.getElementById('heroSubtext');
    if (hs) hs.textContent = cfg.hero_subtext || defaultConfig.hero_subtext;

    const font = cfg.font_family || defaultConfig.font_family;
    const baseSize = cfg.font_size || defaultConfig.font_size;
    document.body.style.fontFamily = `${font}, DM Sans, sans-serif`;
    document.body.style.fontSize = baseSize + 'px';

    document.documentElement.style.setProperty('--bg', cfg.background_color || defaultConfig.background_color);
    document.documentElement.style.setProperty('--surface', cfg.surface_color || defaultConfig.surface_color);
    document.documentElement.style.setProperty('--text', cfg.text_color || defaultConfig.text_color);
    document.documentElement.style.setProperty('--accent', cfg.accent_color || defaultConfig.accent_color);
    document.documentElement.style.setProperty('--accent2', cfg.secondary_action_color || defaultConfig.secondary_action_color);
    document.body.style.color = cfg.text_color || defaultConfig.text_color;
    document.body.style.background = cfg.background_color || defaultConfig.background_color;
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => { applyConfig(); },
        mapToCapabilities: (config) => ({
            recolorables: [
                { get: () => config.background_color || defaultConfig.background_color, set: v => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
                { get: () => config.surface_color || defaultConfig.surface_color, set: v => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
                { get: () => config.text_color || defaultConfig.text_color, set: v => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
                { get: () => config.accent_color || defaultConfig.accent_color, set: v => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); } },
                { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: v => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } }
            ],
            borderables: [],
            fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: v => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
            fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: v => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
        }),
        mapToEditPanelValues: (config) => new Map([
            ['site_title', config.site_title || defaultConfig.site_title],
            ['hero_heading', config.hero_heading || defaultConfig.hero_heading],
            ['hero_subtext', config.hero_subtext || defaultConfig.hero_subtext],
            ['master_password', config.master_password || defaultConfig.master_password]
        ])
    });
}

// =================== INIT ===================
initTheme();
loadFromFirebase();
initDataSdk();

// Check if password has been set up on first load - REMOVED
// Password setup modal removed per user request
// Now directly render the app
render();

// =================== PASSWORD SETUP ===================
// Password setup functionality removed per user request