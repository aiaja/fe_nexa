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
  
  plan: z.enum(["FREE", "STARTER", "BUSINESS", "ENTERPRISE"], {
    message: "Please select a subscription plan"
  }),
  
  tenantStatus: z.enum(["ACTIVE", "TRIAL", "SUSPENDED", "EXPIRED", "INACTIVE"], {
    message: "Please select a status"
  })
})

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
  
  plan: z.enum(["FREE", "STARTER", "BUSINESS", "ENTERPRISE"], {
    message: "Please select a subscription plan"
  }),
  
  tenantStatus: z.enum(["ACTIVE", "TRIAL", "SUSPENDED", "EXPIRED", "INACTIVE"], {
    message: "Please select a status"
  })
})

export type AddTenantFormData = z.infer<typeof addTenantSchema>
export type EditTenantFormData = z.infer<typeof editTenantSchema>

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