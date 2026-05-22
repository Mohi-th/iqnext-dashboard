# IQNext — Smart Building Admin Dashboard

A responsive admin dashboard built as part of the IQNext Frontend Developer Intern assignment.

## Live Demo

🔗 [your-deployment-link-here] <!-- Replace with Vercel/Netlify URL -->

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit |
| Charts | Recharts |
| Map | React-Leaflet + OpenStreetMap |
| Animations | Framer Motion |
| Icons | Lucide React |
| Build Tool | Vite |

---

## Features

### Widgets
- **Organization Overview** — Stat cards showing campuses, buildings, assets, devices, work orders, and health score
- **Product Updates** — Timeline feed of release notes with version tags
- **Asset Health Summary** — Expandable accordion per building, floor-level breakdown with health bars, modal detail view
- **Global Facility Map** — Leaflet map with color-coded health score markers and popup info
- **Device Health Analytics** — Stacked bar chart showing monthly healthy/warning/critical device trends

### Architecture
- Mock API layer (`/public/data/*.json`) fetched with the native `fetch` API
- Simulated network latency per endpoint (900ms – 1800ms) via `setTimeout`
- Redux slices + async thunks for each data domain
- Skeleton loaders during fetch, graceful error states with retry
- Error simulation toggle on the Analytics widget
- Reusable `Modal`, `SectionHeader`, `ErrorState`, and `Skeleton` components
- Custom `useModal` hook for modal state management
- Fully typed with TypeScript interfaces in `src/types/index.ts`
- ARIA labels and semantic HTML throughout

---

## Project Structure

```
src/
├── api/              # Fetch wrappers with simulated delay
├── components/
│   ├── common/       # Modal, Skeleton, SectionHeader, ErrorState
│   └── widgets/      # One file per dashboard widget
├── config/           # API endpoints and delay config
├── constants/        # UI definitions, mock fallback data
├── hooks/            # useModal
├── redux/
│   ├── hooks/        # Typed useAppDispatch / useAppSelector
│   ├── selectors/    # Per-slice selectors
│   ├── slices/       # Redux state slices
│   └── thunks/       # Async thunks
├── types/            # Shared TypeScript interfaces
└── utils/            # Formatters, health score utilities
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/Mohi-th/iqnext-dashboard.git
cd iqnext-dashboard
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for production

```bash
npm run build
npm run preview
```

---

## Data Layer

All widget data is served from static JSON files in `/public/data/`:

| File | Widget |
|---|---|
| `overview.json` | Organization Overview |
| `updates.json` | Product Updates |
| `assetHealth.json` | Asset Health Summary |
| `buildings.json` | Facility Map |
| `analytics.json` | Device Health Analytics |

Each endpoint has a configurable simulated delay (see `src/config/index.ts`).

---

## Screenshots

### Organization Overview
![Organization Overview](./screenshots/overview.png)

### Asset Health, Product Updates & Map
![Asset Health and Map](./screenshots/widgets.png)

### Device Health Analytics
![Device Health Analytics](./screenshots/analytics.png)