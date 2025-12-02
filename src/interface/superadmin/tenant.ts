// Tenant Status (SIMPLIFIED - no TRIAL status)
export type TenantStatus = "ACTIVE" | "SUSPENDED" | "EXPIRED" | "INACTIVE"

// Subscription Plan (SIMPLIFIED: Only 2 plans)
export type SubscriptionPlan = "BASIC" | "PREMIUM"

// Subscription Period
export type SubscriptionPeriod = "TRIAL" | "MONTHLY" | "QUARTERLY" | "YEARLY"

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
  period: SubscriptionPeriod
  subscriptionStart?: string // When subscription started (ISO DateTime)
  subscriptionEnd?: string   // When subscription expires (ISO DateTime)
  createdAt: string
  updatedAt: string
}

export interface TenantWithCounts extends Tenant {
  _count: {
    users: number
    fleets: number
    drivers: number
    zones: number
    routes: number
    transactions: number
    schedules: number
    telemetry: number
    incidents: number
    checkpoints: number
    notifications: number
  }
  telemetryLogs?: TelemetryLogCounts
}

// For Create/Edit Form
export interface TenantFormData {
  company_name: string
  email: string
  address: string
  plan: SubscriptionPlan
  period: SubscriptionPeriod
  tenantStatus: TenantStatus
}

// For Table Display
export interface TenantTableItem extends Tenant {
  registeredDays?: number
  subscriptionDaysLeft?: number
  isOnTrial?: boolean // computed: plan === BASIC && status === ACTIVE
}

// Filter Options
export interface TenantFilterOptions {
  status?: TenantStatus | "ALL"
  plan?: SubscriptionPlan | "ALL"
  period?: SubscriptionPeriod | "ALL"
  searchQuery?: string
}

// Sort Options
export interface TenantSortOptions {
  field: 'company_name' | 'email' | 'createdAt' | 'plan' | 'tenantStatus'
  order: 'asc' | 'desc'
}

// Pagination
export interface PaginationOptions {
  page: number
  limit: number
  total: number
}

// Plan Details (untuk UI display)
export interface PlanDetails {
  name: SubscriptionPlan
  displayName: string
  price: string
  features: string[]
  limits: {
    fleets: number | "unlimited"
    users: number | "unlimited"
  }
}

// Period Details (untuk UI display)
export interface PeriodDetails {
  period: SubscriptionPeriod
  displayName: string
  days: number
  price?: string
}