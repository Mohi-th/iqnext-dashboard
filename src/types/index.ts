
export interface OverviewData {
  campuses: number; buildings: number; floors: number; rooms: number;
  users: number; assets: number; workOrders: number; workRequests: number;
  alarms: number; gateways: number; wiredDevices: number; wirelessDevices: number;
  healthScore: number; areaSqFt: number;
}

export interface ProductUpdate {
  id: number; title: string; version: string; releaseDate: number;
}

export interface FloorAssets { healthy: number; warning: number; critical: number; }
export interface FloorEnergy { consumption: number; unit: string; }
export interface Floor { name: string; assets: FloorAssets; energy: FloorEnergy; }
export interface BuildingHealth { building: string; floors: Floor[]; }

export interface MapBuilding {
  id: number; name: string; city: string; area: number;
  totalFloors: number; healthScore: number; geoLocation: [number, number];
}

export interface DeviceHealthRecord {
  month: string; healthy: number; warning: number; critical: number;
}

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export interface SliceState<T> { data: T | null; status: LoadingStatus; error: string | null; }
