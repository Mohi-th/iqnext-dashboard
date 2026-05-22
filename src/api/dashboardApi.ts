import type { OverviewData, ProductUpdate, BuildingHealth, MapBuilding, DeviceHealthRecord } from '../types';
import config from '../config';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchWithDelay<T>(endpoint: string, delay: number): Promise<T> {
  await sleep(delay);
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const dashboardApi = {
  fetchOverview: () => fetchWithDelay<OverviewData>(config.api.endpoints.overview, config.api.delays.overview),
  fetchUpdates: () => fetchWithDelay<ProductUpdate[]>(config.api.endpoints.updates, config.api.delays.updates),
  fetchAssetHealth: () => fetchWithDelay<BuildingHealth[]>(config.api.endpoints.assetHealth, config.api.delays.assetHealth),
  fetchBuildings: () => fetchWithDelay<MapBuilding[]>(config.api.endpoints.buildings, config.api.delays.buildings),
  fetchAnalytics(simulateError = false): Promise<DeviceHealthRecord[]> {
    if (simulateError) return sleep(config.api.delays.analytics).then(() => { throw new Error('Network error: analytics service unavailable.'); });
    return fetchWithDelay<DeviceHealthRecord[]>(config.api.endpoints.analytics, config.api.delays.analytics);
  },
};
