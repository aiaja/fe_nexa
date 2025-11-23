
export type TenantStatus = "ACTIVE" | "TRIAL" | "SUSPENDED" | "EXPIRED" | "INACTIVE"
export type SubscriptionPlan = "FREE" | "STARTER" | "BUSINESS" | "ENTERPRISE"


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