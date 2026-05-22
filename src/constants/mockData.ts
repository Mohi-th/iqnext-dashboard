import type { OverviewData, ProductUpdate, BuildingHealth, MapBuilding, DeviceHealthRecord } from '../types';

export const OVERVIEW_MOCK: OverviewData = { campuses: 1, buildings: 2, floors: 2, rooms: 9, users: 5, assets: 279, workOrders: 1164, workRequests: 13, alarms: 25, gateways: 5, wiredDevices: 11, wirelessDevices: 22, healthScore: 63.64, areaSqFt: 105000 };
export const UPDATES_MOCK: ProductUpdate[] = [
  { id: 1, title: 'Customisable dashboard released', version: '3.4.0', releaseDate: 1702171842000 },
  { id: 2, title: 'Personalised widgets support added', version: '3.4.0', releaseDate: 1702171842000 },
  { id: 3, title: 'Email notifications enabled for CMMS users', version: '3.4.0', releaseDate: 1702171842000 },
  { id: 4, title: 'Bug fixes and enhancements', version: '3.4.0', releaseDate: 1702171842000 },
];
export const ASSET_HEALTH_MOCK: BuildingHealth[] = [
  { building: 'Garuda Bhive', floors: [{ name: 'Floor 1', assets: { healthy: 120, warning: 18, critical: 4 }, energy: { consumption: 240, unit: 'kWh' } }, { name: 'Floor 2', assets: { healthy: 98, warning: 11, critical: 2 }, energy: { consumption: 190, unit: 'kWh' } }] },
  { building: 'Marathon Futurex', floors: [{ name: 'Ground Floor', assets: { healthy: 85, warning: 9, critical: 1 }, energy: { consumption: 130, unit: 'kWh' } }] },
];
export const BUILDINGS_MOCK: MapBuilding[] = [
  { id: 12, name: 'Marathon Futurex', city: 'Mumbai', area: 100000, totalFloors: 1, healthScore: 72, geoLocation: [19.0176, 72.8562] },
  { id: 14, name: 'Garuda Bhive', city: 'Bengaluru', area: 5000, totalFloors: 1, healthScore: 63.64, geoLocation: [12.916, 77.6159] },
];
export const ANALYTICS_MOCK: DeviceHealthRecord[] = [
  { month: 'Jan', healthy: 210, warning: 32, critical: 8 },
  { month: 'Feb', healthy: 225, warning: 28, critical: 6 },
  { month: 'Mar', healthy: 240, warning: 20, critical: 5 },
  { month: 'Apr', healthy: 260, warning: 16, critical: 3 },
];
