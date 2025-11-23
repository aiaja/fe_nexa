import { z } from "zod"
import { TenantStatus, SubscriptionPlan } from "@/interface/superadmin/tenant"

// Constants
export const TENANT_STATUSES: TenantStatus[] = [
  "ACTIVE",
  "TRIAL", 
  "SUSPENDED",
  "EXPIRED",
  "INACTIVE"
]

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  "FREE",
  "STARTER",
  "BUSINESS",
  "ENTERPRISE"
]

// Business Rules: Valid status combinations per plan
export const PLAN_STATUS_RULES = {
  FREE: ['TRIAL', 'INACTIVE'] as TenantStatus[],
  STARTER: ['ACTIVE', 'SUSPENDED', 'EXPIRED'] as TenantStatus[],
  BUSINESS: ['ACTIVE', 'SUSPENDED', 'EXPIRED'] as TenantStatus[],
  ENTERPRISE: ['ACTIVE', 'SUSPENDED', 'EXPIRED'] as TenantStatus[]
} as const

// Helper: Get available statuses for a plan
export function getAvailableStatusesForPlan(plan: SubscriptionPlan): TenantStatus[] {
  return PLAN_STATUS_RULES[plan]
}

// Helper: Check if plan-status combination is valid
export function isValidPlanStatusCombo(plan: SubscriptionPlan, status: TenantStatus): boolean {
  return PLAN_STATUS_RULES[plan].includes(status)
}

// Helper: Get default status for a plan
export function getDefaultStatusForPlan(plan: SubscriptionPlan): TenantStatus {
  return plan === 'FREE' ? 'TRIAL' : 'ACTIVE'
}

// Helper: Get status description for Add Modal
export function getAddModalStatusDescription(plan: SubscriptionPlan): string {
  switch(plan) {
    case 'FREE':
      return '🔒 FREE plan: 14-day trial with 5 fleets & 3 users'
    case 'STARTER':
      return '🔒 STARTER plan: Active subscription with 20 fleets & 10 users'
    case 'BUSINESS':
      return '🔒 BUSINESS plan: Active subscription with 100 fleets & 50 users'
    case 'ENTERPRISE':
      return '🔒 ENTERPRISE plan: Active subscription with unlimited resources'
    default:
      return ''
  }
}

export const addTenantSchema = z.object({
  company_name: z.string()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name must be less than 100 characters"),
  
  email: z.string()
    .email("Invalid email address")
    .toLowerCase(),
  
  address: z.string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
  
  plan: z.enum(["FREE", "STARTER", "BUSINESS", "ENTERPRISE"], {
    message: "Please select a subscription plan"
  }),
  
  tenantStatus: z.enum(["ACTIVE", "TRIAL", "SUSPENDED", "EXPIRED", "INACTIVE"], {
    message: "Please select a status"
  })
}).refine(
  (data) => isValidPlanStatusCombo(data.plan, data.tenantStatus),
  {
    message: "Invalid status for the selected plan",
    path: ["tenantStatus"]
  }
)

export type AddTenantFormData = z.infer<typeof addTenantSchema>


export const editTenantSchema = z.object({
  company_name: z.string()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name must be less than 100 characters"),
  
  email: z.string()
    .email("Invalid email address")
    .toLowerCase(),
  
  address: z.string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
  
  plan: z.enum(["FREE", "STARTER", "BUSINESS", "ENTERPRISE"], {
    message: "Please select a subscription plan"
  }),
  
  tenantStatus: z.enum(["ACTIVE", "TRIAL", "SUSPENDED", "EXPIRED", "INACTIVE"], {
    message: "Please select a status"
  })
}).refine(
  (data) => isValidPlanStatusCombo(data.plan, data.tenantStatus),
  {
    message: "Invalid status for the selected plan",
    path: ["tenantStatus"]
  }
)

export type EditTenantFormData = z.infer<typeof editTenantSchema>


export const changePlanSchema = z.object({
  plan: z.enum(["FREE", "STARTER", "BUSINESS", "ENTERPRISE"], {
    message: "Please select a subscription plan"
  })
})

export type ChangePlanFormData = z.infer<typeof changePlanSchema>

// Helper: Get auto status when changing plan
export function getAutoStatusForPlanChange(newPlan: SubscriptionPlan): TenantStatus {
  return newPlan === 'FREE' ? 'TRIAL' : 'ACTIVE'
}

// Helper: Check if plan change is a downgrade
export function isDowngrade(currentPlan: SubscriptionPlan, newPlan: SubscriptionPlan): boolean {
  const planHierarchy: Record<SubscriptionPlan, number> = {
    'FREE': 0,
    'STARTER': 1,
    'BUSINESS': 2,
    'ENTERPRISE': 3
  }
  
  return planHierarchy[newPlan] < planHierarchy[currentPlan]
}

// Helper: Get plan change description
export function getPlanChangeDescription(
  currentPlan: SubscriptionPlan, 
  newPlan: SubscriptionPlan
): string {
  const newStatus = getAutoStatusForPlanChange(newPlan)
  const changeType = isDowngrade(currentPlan, newPlan) ? 'downgrade' : 'upgrade'
  
  if (newPlan === 'FREE') {
    return `⚠️ Downgrade to FREE will set status to TRIAL (14-day trial period)`
  }
  
  return `✅ ${changeType === 'upgrade' ? 'Upgrade' : 'Change'} to ${newPlan} will set status to ACTIVE`
}

// Helper: Generate Tenant ID
export function generateTenantId(): string {
  const prefix = "TNT"
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}${random}`
}

// Helper: Format Date
export function formatDate(date: Date): string {
  return date.toISOString()
}

// Helper: Get Plan Limits
export function getPlanLimits(plan: SubscriptionPlan) {
  const limits = {
    FREE: { fleets: 5, users: 3 },
    STARTER: { fleets: 20, users: 10 },
    BUSINESS: { fleets: 100, users: 50 },
    ENTERPRISE: { fleets: 999, users: 999 }
  }
  return limits[plan]
}