export interface Entitlement {
  id: string;
  serviceId: string;
  serviceName: string;
  provider: string;
  purchasedAt: number;
  expiresAt: number;
  totalPaid: number;
  usageQuota?: number;
  usageUsed?: number;
  status: "active" | "expired" | "expiring_soon";
}

export const MOCK_ENTITLEMENTS: Entitlement[] = [
  {
    id: "ent-1",
    serviceId: "0x268060691fbe57a86e16d41a8ba0a277441a7566beb9ddb2774430d68ef4a912",
    serviceName: "SuiNode Pro RPC",
    provider: "Sui Foundation",
    purchasedAt: Date.now() - 86400000 * 5,
    expiresAt: Date.now() + 86400000 * 25,
    totalPaid: 0.5,
    usageQuota: 1000000,
    usageUsed: 342567,
    status: "active",
  },
  {
    id: "ent-2",
    serviceId: "mock-2",
    serviceName: "Index-O-Matic Pro",
    provider: "IndexLabs",
    purchasedAt: Date.now() - 86400000 * 10,
    expiresAt: Date.now() + 86400000 * 2,
    totalPaid: 0.25,
    usageQuota: 500000,
    usageUsed: 489230,
    status: "expiring_soon",
  },
  {
    id: "ent-3",
    serviceId: "mock-6",
    serviceName: "Sui Price Oracle",
    provider: "OracleNet",
    purchasedAt: Date.now() - 86400000 * 30,
    expiresAt: Date.now() - 86400000 * 2,
    totalPaid: 0.1,
    status: "expired",
  },
];

export interface ProviderService {
  id: string;
  name: string;
  category: string;
  status: "active" | "draft" | "paused";
  totalRevenue: number;
  totalUsers: number;
  activeEntitlements: number;
  createdAt: number;
  lastUpdated: number;
}

export const MOCK_PROVIDER_SERVICES: ProviderService[] = [
  {
    id: "0x268060691fbe57a86e16d41a8ba0a277441a7566beb9ddb2774430d68ef4a912",
    name: "SuiNode Pro RPC",
    category: "RPC",
    status: "active",
    totalRevenue: 125.5,
    totalUsers: 342,
    activeEntitlements: 89,
    createdAt: Date.now() - 86400000 * 60,
    lastUpdated: Date.now() - 86400000 * 2,
  },
  {
    id: "prov-2",
    name: "Sui Mainnet Archive",
    category: "RPC",
    status: "active",
    totalRevenue: 45.2,
    totalUsers: 123,
    activeEntitlements: 34,
    createdAt: Date.now() - 86400000 * 30,
    lastUpdated: Date.now() - 86400000 * 5,
  },
  {
    id: "prov-3",
    name: "WebSocket Gateway (Beta)",
    category: "RPC",
    status: "draft",
    totalRevenue: 0,
    totalUsers: 0,
    activeEntitlements: 0,
    createdAt: Date.now() - 86400000 * 3,
    lastUpdated: Date.now() - 86400000 * 1,
  },
];

export interface UsageRecord {
  date: string;
  requests: number;
}

export const MOCK_USAGE_HISTORY: UsageRecord[] = [
  { date: "2024-12-05", requests: 45230 },
  { date: "2024-12-06", requests: 52100 },
  { date: "2024-12-07", requests: 48900 },
  { date: "2024-12-08", requests: 61200 },
  { date: "2024-12-09", requests: 55800 },
  { date: "2024-12-10", requests: 49300 },
  { date: "2024-12-11", requests: 42037 },
];
