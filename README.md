# Doer Global — Entrepreneurship Development Platform

A modern, responsive landing page for Doer Global — helping early-stage entrepreneurs raise their first cheque through structured guidance, professional deliverables, and hands-on mentorship.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Custom styling (no frameworks) |
| Vanilla JavaScript (ES Modules) | Interactive features & animations |
| Vite 6.x | Development server & production bundler |

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The site will open at [http://localhost:5173](http://localhost:5173) with hot-reload enabled.

### 3. Build for Production

```bash
npm run build
```

This generates an optimized `dist/` folder ready for deployment.

### 4. Preview Production Build

```bash
npm run preview
```

Serves the `dist/` folder locally so you can verify the production build before deploying.

## 📁 Project Structure

```
DoerGlobal/
├── index.html              # Main HTML page
├── package.json            # Project config & dependencies
├── vite.config.js          # Vite build configuration
├── public/                 # Static assets (favicon, etc.)
│   └── favicon.png
└── src/
    ├── css/
    │   ├── base.css        # Reset, variables, typography
    │   ├── components.css  # Buttons, cards, modals, forms
    │   ├── sections.css    # Section-specific styles
    │   └── animations.css  # Scroll animations & transitions
    └── js/
        ├── main.js         # App entry point & orchestration
        ├── data.js         # All site content (services, team, FAQs, etc.)
        ├── navbar.js       # Navigation & mobile menu
        ├── hero.js         # Hero canvas animation & typewriter
        ├── counters.js     # Animated number counters
        ├── services.js     # Services tabs & accordion
        ├── stories.js      # Founder stories carousel & modal
        ├── team.js         # Team member cards
        ├── faq.js          # FAQ accordion
        ├── contact.js      # Contact form
        └── animations.js   # Scroll-triggered animations
```

## 🌐 Deployment

The production build outputs static files to the `dist/` folder. These can be deployed to any static hosting provider:

- **Vercel** — `npx vercel`
- **Netlify** — drag & drop the `dist/` folder
- **GitHub Pages** — push `dist/` contents to `gh-pages` branch
- **Any web server** — upload `dist/` contents to the server root

## 📝 Updating Content

All website content (services, team members, FAQs, founder stories, metrics) is centralized in `src/js/data.js`. Edit this file to update content without touching HTML.

## 📄 License

© 2026 Doer Global. All rights reserved.
