# IQNext — Smart Building Admin Dashboard

A modern, responsive admin dashboard for smart building management built with **React 19**, **TypeScript**, **Redux Toolkit**, and **Vite**. The dashboard provides real-time facility monitoring across five interactive widgets: organization overview, product updates, asset health, interactive map, and device health analytics.

![Dashboard Preview](./screenshots/dashboard.png)

---

## ✨ Features

### 🏢 Widget 1 — Organization Overview
- Statistical cards displaying 12 real-time facility metrics (campuses, buildings, assets, users, devices, health score, etc.)
- Responsive 6-column grid that adapts down to 2 columns on mobile
- Health score progress bar with animated fill
- Contextual card highlighting for alarms and health metrics

### 🔔 Widget 2 — Product Updates
- Timeline-style release notes feed with version badges and formatted dates
- Hover interactions and smooth color transitions

### 💡 Widget 3 — Asset Health Summary
- Expandable accordion showing building-wise and floor-wise asset health
- Stacked health bars (healthy / warning / critical) per floor
- Detail modal with tabular breakdown and energy consumption data
- Animated expand/collapse using Framer Motion

### 🗺️ Widget 4 — Interactive Building Map
- Leaflet + OpenStreetMap integration with custom health-score markers
- Color-coded markers (green/amber/red) based on building health
- Click-to-open popups with building name, city, health %, and area
- Map legend with health status categories

### 📊 Widget 5 — Device Health Analytics
- Stacked bar chart built with Recharts showing monthly trends (Jan–Apr)
- Custom dark-themed tooltip with per-category breakdown
- Averages summary row below the chart
- Simulated error state button to demonstrate graceful error handling

---

## 🏗️ Architecture & Data Handling

| Requirement | Implementation |
|---|---|
| **Mock API Integration** | Sample data stored in separate JSON files under `/public/data/*.json` |
| **Fetch API** | Native `fetch()` via a centralized API layer (`src/api/dashboardApi.ts`) |
| **Simulated Latency** | Configurable `setTimeout` delays (900ms–1800ms) per endpoint |
| **Loading States** | Skeleton loaders for every widget (stat cards, list rows, accordion rows, map, chart) |
| **Error Handling** | Graceful error states with retry buttons; simulated error toggle on Analytics widget |
| **State Management** | Redux Toolkit with dedicated slices, async thunks, and memoized selectors per widget |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Redux Toolkit (slices, thunks, selectors) |
| **Charts** | Recharts |
| **Maps** | Leaflet + React-Leaflet |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
src/
├── api/                    # Centralized API layer with fetch + simulated delays
│   └── dashboardApi.ts
├── components/
│   ├── common/             # Reusable UI components
│   │   ├── ErrorState.tsx      # Error fallback with retry
│   │   ├── Modal.tsx           # Animated modal dialog
│   │   ├── SectionHeader.tsx   # Section title + badge + action slot
│   │   └── Skeleton.tsx        # Skeleton loaders (stat card, list, chart, map)
│   └── widgets/            # Dashboard widget components
│       ├── OverviewWidget.tsx
│       ├── UpdatesWidget.tsx
│       ├── AssetHealthWidget.tsx
│       ├── MapWidget.tsx
│       └── AnalyticsWidget.tsx
├── config/                 # App configuration (API endpoints, delays)
│   └── index.ts
├── constants/              # Static definitions (stat definitions, health colors)
│   ├── ui.ts
│   └── mockData.ts
├── hooks/                  # Custom hooks
│   └── useModel.ts             # Modal open/close state hook
├── redux/                  # Redux Toolkit store
│   ├── index.ts                # Store configuration
│   ├── hooks/hooks.ts          # Typed useDispatch/useSelector
│   ├── slices/                 # One slice per widget
│   ├── thunks/                 # Async thunks for data fetching
│   └── selectors/              # Memoized selectors (createSelector)
├── types/                  # TypeScript interfaces
│   └── index.ts
├── utils/                  # Utility functions
│   ├── formatters.ts           # Number, date, percent formatters
│   └── healthUtils.ts          # Health score colors and calculations
├── App.tsx                 # Main layout (header, breadcrumb, widget grid)
├── main.tsx                # Entry point (React + Redux Provider)
└── index.css               # Global styles + Leaflet z-index overrides

public/
└── data/                   # Mock API JSON files
    ├── overview.json
    ├── updates.json
    ├── assetHealth.json
    ├── buildings.json
    └── analytics.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Mohi-th/iqnext-dashboard.git
cd iqnext-dashboard

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📱 Responsive Design

The dashboard is fully responsive across breakpoints:

| Breakpoint | Layout |
|---|---|
| **Desktop** (≥1024px) | 12-column grid — widgets side-by-side |
| **Tablet** (≥768px) | Overview cards collapse to 4 columns, widgets stack |
| **Mobile** (<768px) | Single-column layout, 2-column stat cards |

---

## ♿ Accessibility

- Semantic HTML5 elements (`<section>`, `<nav>`, `<header>`, `<main>`)
- ARIA labels on interactive elements, charts, and map
- `aria-labelledby` linking section headers to widget regions
- `role="progressbar"` on health score bar with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`
- Keyboard-navigable buttons with visible focus rings (`focus:ring-2`)
- Screen-reader-friendly health bar descriptions

---

## 🧪 Error Simulation

The Analytics widget includes a **⚠️ Simulate Error** button that triggers a mock API failure. This demonstrates:

1. Graceful error state UI with descriptive message
2. **Retry** button to re-fetch data
3. Proper Redux error state management (`status: 'failed'`)

---

## 📸 Screenshots

> Add screenshots of the running dashboard to a `screenshots/` folder and reference them here.

| View | Screenshot |
|---|---|
| Desktop | `./screenshots/dashboard.png` |
| Mobile | `./screenshots/mobile.png` |
| Loading State | `./screenshots/loading.png` |
| Error State | `./screenshots/error.png` |

---

## 🌐 Deployment

This project can be deployed to any static hosting platform:

```bash
# Build for production
npm run build

# The output is in the dist/ folder
```

**Recommended platforms:** Vercel, Netlify, GitHub Pages

---

## 📝 License

This project was built as part of the IQNext Frontend Developer Intern Assignment.
