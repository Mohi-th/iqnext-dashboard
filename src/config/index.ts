const config = {
  api: {
    endpoints: {
      overview: '/data/overview.json',
      updates: '/data/updates.json',
      assetHealth: '/data/assetHealth.json',
      buildings: '/data/buildings.json',
      analytics: '/data/analytics.json',
    },
    delays: { overview: 1200, updates: 900, assetHealth: 1500, buildings: 1800, analytics: 1600 },
  },
  map: {
    defaultCenter: [15.5, 76.5] as [number, number],
    defaultZoom: 6,
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
} as const;
export default config;
