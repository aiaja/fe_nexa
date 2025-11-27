export type TenantStatus = "ACTIVE" | "TRIAL" | "SUSPENDED" | "EXPIRED" | "INACTIVE"
export type SubscriptionPlan = "FREE" | "STARTER" | "BUSINESS" | "ENTERPRISE"

// Telemetry Log Types
export type TelemetrySensorType = "GPS" | "TEMPERATURE" | "FUEL" | "SPEED" | "RPM" | "BATTERY"

// Telemetry Activity Data Point (untuk chart)
export interface TelemetryActivityPoint {
  date: string 
  logs: number
}

// Telemetry Breakdown by Sensor Type
export interface TelemetryByType {
  gps: number
  temperature: number
  fuel: number
  speed: number
  rpm: number
  battery: number
}


export interface TelemetryLogCounts {
  total: number
  last24h: number
  last7days: number
  last30days: number
  avgPerDay: number
  byType: TelemetryByType
  activityTrend: TelemetryActivityPoint[] 
  isActive: boolean 
  lastUpdate: string 
}

export interface Tenant {
  id: string
  company_name: string
  address: string
  email: string
  tenantStatus: TenantStatus
  plan: SubscriptionPlan
  createdAt: string
  updatedAt: string
}


export interface TenantWithCounts extends Tenant {
  _count: {
    users: number
    fleets: number
    drivers: number
    telemetryLogs: TelemetryLogCounts 
  }
}

export interface TenantFormData {
  company_name: string
  email: string
  address: string
  plan: SubscriptionPlan
  tenantStatus: TenantStatus
}

export interface TenantFilterOptions {
  status?: TenantStatus | "ALL"
  plan?: SubscriptionPlan | "ALL"
  searchQuery?: string
}