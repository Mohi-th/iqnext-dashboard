import {
  Building2, Landmark, Wrench, ClipboardList, Bell,
  Users, Wifi, Monitor, Radio, FileText,
  HeartPulse, Ruler, type LucideIcon,
} from 'lucide-react';

export const HEALTH_COLORS = { healthy: '#16a34a', warning: '#d97706', critical: '#dc2626' } as const;
export const HEALTH_THRESHOLDS = { good: 70, moderate: 50 } as const;
export const STAT_DEFINITIONS = [
  { key: 'campuses', label: 'Campuses', icon: Landmark },
  { key: 'buildings', label: 'Buildings', icon: Building2 },
  { key: 'assets', label: 'Total Assets', icon: Wrench, format: 'number' },
  { key: 'workOrders', label: 'Work Orders', icon: ClipboardList, format: 'number' },
  { key: 'alarms', label: 'Active Alarms', icon: Bell, highlight: true },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'wirelessDevices', label: 'Wireless Devices', icon: Wifi },
  { key: 'wiredDevices', label: 'Wired Devices', icon: Monitor },
  { key: 'gateways', label: 'Gateways', icon: Radio },
  { key: 'workRequests', label: 'Work Requests', icon: FileText },
  { key: 'healthScore', label: 'Health Score', icon: HeartPulse, format: 'percent' },
  { key: 'areaSqFt', label: 'Area', icon: Ruler, format: 'sqft' },
] as const;
