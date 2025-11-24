
export interface DashboardMetrics {
  icon: string 
  label: string
  value: number
  subtitle: string
  color: string
  bgColor: string
  detail?: {
    items: Array<{
      label: string
      value: number
      color: string
    }>
  }
}

export interface DashboardMetricsWithIcon extends Omit<DashboardMetrics, 'icon'> {
  icon: any
}


export interface TenantStatusDistribution {
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED' | 'EXPIRED' | 'INACTIVE'
  count: number
  color: string
}


export interface SubscriptionPlanDistribution {
  plan: 'FREE' | 'STARTER' | 'BUSINESS' | 'ENTERPRISE'
  count: number
  color: string
  percentage: number
}

export interface Tenant {
  id: string
  company_name: string
  email: string
  address: string
  plan: 'FREE' | 'STARTER' | 'BUSINESS' | 'ENTERPRISE'
  tenantStatus: 'ACTIVE' | 'TRIAL' | 'SUSPENDED' | 'EXPIRED' | 'INACTIVE'
  createdAt: string 
  updatedAt: string 
}


export interface TenantWithCounts extends Tenant {
  _count?: {
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
}

// Tenant with computed fields (for frontend display)
export interface TenantWithStats extends Tenant {
  daysSinceRegistration?: number
  trialDaysRemaining?: number
}

// Alert/Attention Items
export interface AttentionItem {
  tenant: Tenant
  type: 'suspended' | 'trial_ending' | 'expired'
  message: string
  severity: 'high' | 'medium' | 'low'
  daysRemaining?: number
}