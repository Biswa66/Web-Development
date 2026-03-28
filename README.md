# DevVault - Your Web Dev Projects Hub

A beautiful, feature-rich project management platform designed for developers to organize, track, and showcase their web development projects. Built with vanilla JavaScript, Tailwind CSS, and modern web technologies.

## 🚀 Features

### Core Features
- **📁 Project Management**: Create, edit, and delete projects with full CRUD functionality
- **🔍 Smart Search**: Real-time search across project titles, descriptions, tags, and categories
- **📚 Rich Organization**: Categorize projects by technology (HTML, CSS, JavaScript, React, Vue, Python, Node.js, Full Stack, TypeScript, Next.js, API, and more)
- **⭐ Bookmarking System**: Save your favorite projects for quick access
- **🏷️ Tags & Labels**: Add custom tags to projects for better organization
- **🔗 Link Management**: Store multiple links per project (Demo, GitHub, Documentation)
- **📊 Dashboard**: View at-a-glance statistics and recent projects

### Data Management
- **☁️ Cloud Sync**: Automatic synchronization with Canva Sheets for data persistence
- **💾 Import/Export**: Backup your projects as JSON or restore from backup
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### UI & Experience
- **🌓 Dark/Light Theme**: Toggle between themes with persistent preferences
- **🎨 Customizable**: Edit site title, hero text, colors, fonts, and font sizes through Canva's edit panel
- **✨ Smooth Animations**: Beautiful transitions and hover effects
- **⚡ Fast & Smooth**: Optimized for performance with lazy rendering
- **🎯 Difficulty Levels**: Track project complexity (Beginner, Intermediate, Advanced)

## 📊 Dashboard

The dashboard provides:
- Total project count
- Total categories
- Total bookmarks
- Advanced projects count
- Category overview with project counts
- Recently added projects preview

## 🏗️ Project Structure

### Main Sections
1. **Sidebar Navigation**
   - Dashboard view
   - All Projects view
   - Bookmarks view
   - Category filters
   - Import/Export options

2. **Top Navigation**
   - Search functionality with debounce
   - Theme toggle
   - Add Project button

3. **Project Views**
   - Dashboard: Overview and statistics
   - Projects: Filtered grid with pagination
   - Bookmarks: Saved projects only

## 📝 Project Data Structure

Each project contains:
```javascript
{
  id: string,
  title: string,
  description: string,
  category: string,
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  tags: string[],
  links: Array<{ label: string, url: string, type: "demo" | "github" | "docs" }>,
  date: ISO string,
  bookmarked: boolean
}

🎨 Customization
Via Canva Edit Panel
Site Title: Change the app name displayed in sidebar
Hero Heading: Customize the dashboard main heading
Hero Subtext: Update the tagline text
Colors: Customize background, surfaces, text, and accent colors
Typography: Change font family and base font size
Supported Categories
HTML, CSS, JavaScript
React, Vue, Python
Node.js, Full Stack
TypeScript, Next.js
API, Other
Difficulty Levels
🟢 Beginner: Getting started projects
🟠 Intermediate: Building on fundamentals
🔴 Advanced: Complex implementations
🌐 Link Types
Link Categories
Demo: Live preview or deployed project
GitHub: Source code repository
Docs: Documentation or blog post
Each project can have multiple links of different types.

💾 Data Persistence
Local Storage
Projects stored locally in browser
Bookmarks preferences saved
Theme preference persisted
Cloud Sync
Automatic synchronization with Canva Sheets
Cloud data merged with local projects
Failed syncs retry automatically
Import/Export
// Export: Download projects as JSON
// Import: Upload JSON file to restore projects

🔑 Keyboard Shortcuts
Ctrl+K or Cmd+K: Focus search bar
Esc: Close modals
🛠️ Technology Stack
Frontend: Vanilla JavaScript (ES6+)
Styling: Tailwind CSS 3.4
Icons: Lucide Icons 0.263
Typography: DM Sans, Space Mono
Storage: LocalStorage + Canva Data SDK
Build: Inline HTML with embedded CSS and JavaScript
📱 Responsive Breakpoints
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
🎯 Use Cases
Portfolio Building: Organize and showcase your development projects
Learning Tracker: Track learning progress across different technologies
Project Archive: Maintain a searchable archive of past work
Team Reference: Share project links and documentation with team members
Skills Development: Track difficulty progression and skill building
🔄 Workflow
Add a Project: Click "Add Project" button to create new entry
Fill Details: Enter title, description, category, difficulty, tags, and links
Save: Project syncs to cloud automatically
Organize: Use categories and bookmarks for organization
Search: Find projects quickly using search functionality
Share: Export projects or share links
Update: Edit or delete projects as needed
📊 Statistics Available
Project Count: Total number of projects
Categories: Number of different technologies used
Bookmarks: Saved favorite projects
Difficulty Distribution: Count of projects by difficulty level
Category Breakdown: Projects per category
🎨 Color Scheme (Default Dark Theme)
Background:        #0b0f19
Surface:          #131825
Secondary Surface: #1a2035
Text:             #e2e8f0
Accent:           #6366f1
Accent 2:         #818cf8
Danger:           #ef4444
Success:          #22c55e
Warning:          #f59e0b

🌟 Features Roadmap
✅ Basic CRUD operations
✅ Cloud synchronization
✅ Import/Export functionality
✅ Search and filtering
✅ Dark/Light theme
✅ Customizable colors and fonts
🔄 Collaborative features (upcoming)
🔄 Advanced analytics (upcoming)
🔄 Project templates (upcoming)
📄 License
© 2024 DevVault. All rights reserved.

🤝 Contributing
DevVault is a personal project tool. For features or suggestions, please consider extending the codebase to meet your needs.

⚙️ Technical Details
Performance
Efficient DOM updates with selective rendering
Debounced search (250ms)
Lazy loading of list items
Optimized animations with CSS transitions
Accessibility
Semantic HTML structure
Keyboard navigation support
Focus management in modals
Proper contrast ratios
ARIA-compliant form labels
Browser Support
Chrome/Edge (latest)
Firefox (latest)
Safari (latest)
Mobile browsers
Made with ❤️ for developers who love organizing their projects