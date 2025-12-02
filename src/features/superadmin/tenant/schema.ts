// features/superadmin/tenants/schema.ts
import { z } from "zod"
import { TenantStatus, SubscriptionPlan, SubscriptionPeriod } from "@/interface/superadmin/tenant"

// ==========================================
// CONSTANTS (UPDATED)
// ==========================================

export const TENANT_STATUSES: TenantStatus[] = [
  "ACTIVE",
  "SUSPENDED",
  "EXPIRED",
  "INACTIVE"
  // Note: "TRIAL" removed - use BASIC + ACTIVE instead
]

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  "BASIC",    // Free trial
  "PREMIUM"   // Paid subscription
]

export const SUBSCRIPTION_PERIODS: SubscriptionPeriod[] = [
  "TRIAL",      // 14 days (BASIC only)
  "MONTHLY",    // 30 days (PREMIUM only)
  "QUARTERLY",  // 90 days (PREMIUM only)
  "YEARLY"      // 365 days (PREMIUM only)
]

// ==========================================
// BUSINESS RULES
// ==========================================

// Valid status combinations per plan
export const PLAN_STATUS_RULES = {
  BASIC: ['ACTIVE', 'EXPIRED', 'INACTIVE'] as TenantStatus[],
  PREMIUM: ['ACTIVE', 'SUSPENDED', 'EXPIRED', 'INACTIVE'] as TenantStatus[]
} as const

// Valid period combinations per plan
export const PLAN_PERIOD_RULES = {
  BASIC: ['TRIAL'] as SubscriptionPeriod[],
  PREMIUM: ['MONTHLY', 'QUARTERLY', 'YEARLY'] as SubscriptionPeriod[]
} as const

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Get available statuses for a plan
export function getAvailableStatusesForPlan(plan: SubscriptionPlan): TenantStatus[] {
  return PLAN_STATUS_RULES[plan]
}

// Get available periods for a plan
export function getAvailablePeriodsForPlan(plan: SubscriptionPlan): SubscriptionPeriod[] {
  return PLAN_PERIOD_RULES[plan]
}

// Check if plan-status combination is valid
export function isValidPlanStatusCombo(plan: SubscriptionPlan, status: TenantStatus): boolean {
  return PLAN_STATUS_RULES[plan].includes(status)
}

// Check if plan-period combination is valid
export function isValidPlanPeriodCombo(plan: SubscriptionPlan, period: SubscriptionPeriod): boolean {
  return PLAN_PERIOD_RULES[plan].includes(period)
}

// Get default status for a plan (always ACTIVE when creating)
export function getDefaultStatusForPlan(plan: SubscriptionPlan): TenantStatus {
  return 'ACTIVE'
}

// Get default period for a plan
export function getDefaultPeriodForPlan(plan: SubscriptionPlan): SubscriptionPeriod {
  return plan === 'BASIC' ? 'TRIAL' : 'MONTHLY'
}

// Check if tenant is on trial
export function isOnTrial(plan: SubscriptionPlan, status: TenantStatus): boolean {
  return plan === 'BASIC' && status === 'ACTIVE'
}

// Get status description for Add Modal
export function getAddModalStatusDescription(plan: SubscriptionPlan, period: SubscriptionPeriod): string {
  if (plan === 'BASIC') {
    return '🟢 New tenant will be ACTIVE with 14-day free trial (5 fleets, 3 users)'
  }
  
  const periodText = {
    TRIAL: '14-day trial',
    MONTHLY: 'monthly',
    QUARTERLY: '3-month',
    YEARLY: '12-month'
  }[period] || period.toLowerCase()
  
  return `🟢 New tenant will be ACTIVE with ${periodText} subscription (unlimited resources)`
}

// Get status description for Edit Modal
export function getEditModalStatusDescription(plan: SubscriptionPlan): string {
  if (plan === 'BASIC') {
    return 'ℹ️ BASIC plan: Limited to ACTIVE, EXPIRED, or INACTIVE status'
  }
  return 'ℹ️ PREMIUM plan: Can be ACTIVE, SUSPENDED, EXPIRED, or INACTIVE'
}


// Add Tenant Schema
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
  
  plan: z.enum(["BASIC", "PREMIUM"], {
    message: "Please select a subscription plan"
  }),
  
  period: z.enum(["TRIAL", "MONTHLY", "QUARTERLY", "YEARLY"], {
    message: "Please select a subscription period"
  })
}).refine(
  (data) => isValidPlanPeriodCombo(data.plan, data.period),
  {
    message: "Invalid period for the selected plan",
    path: ["period"]
  }
)

export type AddTenantFormData = z.infer<typeof addTenantSchema>

// Edit Tenant Schema
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
  
  plan: z.enum(["BASIC", "PREMIUM"], {
    message: "Please select a subscription plan"
  }),
  
  period: z.enum(["TRIAL", "MONTHLY", "QUARTERLY", "YEARLY"], {
    message: "Please select a subscription period"
  }),
  
  tenantStatus: z.enum(["ACTIVE", "SUSPENDED", "EXPIRED", "INACTIVE"], {
    message: "Please select a status"
  })
}).refine(
  (data) => isValidPlanStatusCombo(data.plan, data.tenantStatus),
  {
    message: "Invalid status for the selected plan",
    path: ["tenantStatus"]
  }
).refine(
  (data) => isValidPlanPeriodCombo(data.plan, data.period),
  {
    message: "Invalid period for the selected plan",
    path: ["period"]
  }
)

export type EditTenantFormData = z.infer<typeof editTenantSchema>

// Change Plan Schema
export const changePlanSchema = z.object({
  plan: z.enum(["BASIC", "PREMIUM"], {
    message: "Please select a subscription plan"
  }),
  period: z.enum(["TRIAL", "MONTHLY", "QUARTERLY", "YEARLY"], {
    message: "Please select a subscription period"
  })
}).refine(
  (data) => isValidPlanPeriodCombo(data.plan, data.period),
  {
    message: "Invalid period for the selected plan",
    path: ["period"]
  }
)

export type ChangePlanFormData = z.infer<typeof changePlanSchema>


// Check if plan change is a downgrade
export function isDowngrade(currentPlan: SubscriptionPlan, newPlan: SubscriptionPlan): boolean {
  const planHierarchy: Record<SubscriptionPlan, number> = {
    'BASIC': 0,
    'PREMIUM': 1
  }
  
  return planHierarchy[newPlan] < planHierarchy[currentPlan]
}

// Get plan change description
export function getPlanChangeDescription(
  currentPlan: SubscriptionPlan, 
  newPlan: SubscriptionPlan,
  newPeriod: SubscriptionPeriod
): string {
  const changeType = isDowngrade(currentPlan, newPlan) ? 'downgrade' : 'upgrade'
  
  if (newPlan === 'BASIC') {
    return `Downgrade to BASIC will start a 14-day trial period with limited features`
  }
  
  const periodText = {
    TRIAL: '14-day trial',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly'
  }[newPeriod] || newPeriod.toLowerCase()
  
  return `✅ ${changeType === 'upgrade' ? 'Upgrade' : 'Change'} to PREMIUM (${periodText}) will unlock unlimited features`
}

// Generate Tenant ID
export function generateTenantId(): string {
  const prefix = "TNT"
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}${random}`
}

// Format Date
export function formatDate(date: Date): string {
  return date.toISOString()
}

// Get Plan Limits
export function getPlanLimits(plan: SubscriptionPlan) {
  const limits = {
    BASIC: { fleets: 5, users: 3 },
    PREMIUM: { fleets: 'unlimited' as const, users: 'unlimited' as const }
  }
  return limits[plan]
}

// Get Plan Display Name
export function getPlanDisplayName(plan: SubscriptionPlan): string {
  return plan === 'BASIC' ? 'Basic (Free Trial)' : 'Premium'
}

// Get Period Display Name
export function getPeriodDisplayName(period: SubscriptionPeriod): string {
  const names = {
    TRIAL: '14-Day Trial',
    MONTHLY: 'Monthly',
    QUARTERLY: 'Quarterly (3 Months)',
    YEARLY: 'Yearly (12 Months)'
  }
  return names[period]
}