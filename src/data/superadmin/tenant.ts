import { Tenant, TenantWithCounts, PlanDetails, PeriodDetails, TelemetryLogCounts } from '@/interface/superadmin/tenant'


export const PLAN_DETAILS: Record<string, PlanDetails> = {
  BASIC: {
    name: "BASIC",
    displayName: "Basic (Free Trial)",
    price: "FREE",
    features: [
      "14-day free trial",
      "Basic fleet tracking",
      "Standard reporting",
      "Email support"
    ],
    limits: {
      fleets: 10,
      users: 5
    }
  },
  PREMIUM: {
    name: "PREMIUM",
    displayName: "Premium",
    price: "Starting from $99/month",
    features: [
      "Unlimited fleets",
      "Unlimited users",
      "Advanced analytics",
      "Real-time telemetry",
      "Custom integration",
      "Priority support",
      "API access"
    ],
    limits: {
      fleets: "unlimited",
      users: "unlimited"
    }
  }
}

export const PERIOD_DETAILS: Record<string, PeriodDetails> = {
  TRIAL: {
    period: "TRIAL",
    displayName: "14-Day Trial",
    days: 14
  },
  MONTHLY: {
    period: "MONTHLY",
    displayName: "Monthly",
    days: 30,
    price: "$99"
  },
  QUARTERLY: {
    period: "QUARTERLY",
    displayName: "Quarterly (3 Months)",
    days: 90,
    price: "$269"
  },
  YEARLY: {
    period: "YEARLY",
    displayName: "Yearly (12 Months)",
    days: 365,
    price: "$999"
  }
}


export const getPlanPrice = (plan: string, period: string): string => {
  if (plan === "BASIC") return "FREE"
  return PERIOD_DETAILS[period]?.price || "Contact us"
}

export const getPeriodDays = (period: string): number => {
  return PERIOD_DETAILS[period]?.days || 0
}

export const calculateSubscriptionEnd = (startDate: string, period: string): string => {
  const start = new Date(startDate)
  const days = getPeriodDays(period)
  const end = new Date(start.getTime() + (days * 24 * 60 * 60 * 1000))
  return end.toISOString()
}

export const getDaysRemaining = (subscriptionEnd: string): number => {
  const end = new Date(subscriptionEnd)
  const now = new Date()
  const diffTime = end.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

export const isExpiringSoon = (subscriptionEnd: string): boolean => {
  const daysLeft = getDaysRemaining(subscriptionEnd)
  return daysLeft <= 7 && daysLeft > 0
}

export const isOnTrial = (tenant: Tenant): boolean => {
  return tenant.plan === "BASIC" && tenant.tenantStatus === "ACTIVE"
}

export const getExistingEmails = (): string[] => {
  return mockTenants.map(t => t.email.toLowerCase())
}

// Helper: Generate realistic telemetry data based on plan
const generateTelemetryData = (plan: string, tenantStatus: string): TelemetryLogCounts => {
  const planMultiplier = {
    BASIC: 0.05,
    PREMIUM: 1.0
  }[plan] || 0.05

  const statusMultiplier = tenantStatus === 'ACTIVE' ? 1.0 : 
                          tenantStatus === 'SUSPENDED' ? 0.1 : 0

  const multiplier = planMultiplier * statusMultiplier

  const avgPerDay = Math.floor(1200 * multiplier)
  const last7days = avgPerDay * 7
  const last30days = avgPerDay * 30
  const last24h = Math.floor(avgPerDay * (0.8 + Math.random() * 0.4))
  const total = Math.floor(last30days * 12)

  const activityTrend = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
    date: day,
    logs: Math.floor(avgPerDay * (0.7 + Math.random() * 0.6))
  }))

  const byType = {
    gps: Math.floor(last30days * 0.35),
    temperature: Math.floor(last30days * 0.25),
    fuel: Math.floor(last30days * 0.20),
    speed: Math.floor(last30days * 0.12),
    rpm: Math.floor(last30days * 0.05),
    battery: Math.floor(last30days * 0.03)
  }

  return {
    total,
    last24h,
    last7days,
    last30days,
    avgPerDay,
    byType,
    activityTrend,
    isActive: tenantStatus === 'ACTIVE',
    lastUpdate: new Date(Date.now() - Math.floor(Math.random() * 300000)).toISOString()
  }
}

export const mockTenants: Tenant[] = [
  {
    id: 'TNT-001',
    company_name: 'PT Adaro Mining',
    email: 'admin@adaromining.co.id',
    address: 'Jl. Thamrin No. 20, Jakarta Pusat 10350',
    plan: 'PREMIUM',
    period: 'YEARLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2024-03-15T08:00:00Z',
    subscriptionEnd: '2025-03-15T08:00:00Z',
    createdAt: '2024-03-15T08:00:00Z',
    updatedAt: '2025-11-15T12:00:00Z'
  },
  {
    id: 'TNT-002',
    company_name: 'PT Bukit Asam',
    email: 'admin@bukitasam.co.id',
    address: 'Jl. Parigi No. 1, Tanjung Enim, Sumatera Selatan',
    plan: 'PREMIUM',
    period: 'MONTHLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-11-01T00:00:00Z',
    subscriptionEnd: '2025-12-01T00:00:00Z',
    createdAt: '2024-05-20T14:00:00Z',
    updatedAt: '2025-11-18T10:00:00Z'
  },
  {
    id: 'TNT-003',
    company_name: 'PT Indo Coal',
    email: 'admin@indocoal.co.id',
    address: 'Jl. Sudirman No. 45, Samarinda, Kalimantan Timur',
    plan: 'PREMIUM',
    period: 'QUARTERLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-09-01T00:00:00Z',
    subscriptionEnd: '2025-12-01T00:00:00Z',
    createdAt: '2024-07-10T12:00:00Z',
    updatedAt: '2025-11-14T09:00:00Z'
  },
  {
    id: 'TNT-004',
    company_name: 'PT Vale Indonesia',
    email: 'admin@vale.co.id',
    address: 'Sorowako, Luwu Timur, Sulawesi Selatan',
    plan: 'PREMIUM',
    period: 'YEARLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2024-02-01T00:00:00Z',
    subscriptionEnd: '2026-02-01T00:00:00Z',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2025-11-10T11:00:00Z'
  },
  {
    id: 'TNT-005',
    company_name: 'PT Freeport Indonesia',
    email: 'admin@freeport.co.id',
    address: 'Kuala Kencana, Timika, Papua',
    plan: 'PREMIUM',
    period: 'YEARLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2024-06-12T00:00:00Z',
    subscriptionEnd: '2025-06-12T00:00:00Z',
    createdAt: '2024-06-12T11:00:00Z',
    updatedAt: '2025-11-12T16:00:00Z'
  },
  {
    id: 'TNT-006',
    company_name: 'PT Aneka Tambang',
    email: 'admin@antam.co.id',
    address: 'Jl. Letjen TB Simatupang No. 1, Jakarta Selatan',
    plan: 'PREMIUM',
    period: 'QUARTERLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-08-05T00:00:00Z',
    subscriptionEnd: '2025-11-05T00:00:00Z',
    createdAt: '2024-08-05T10:00:00Z',
    updatedAt: '2025-11-16T14:00:00Z'
  },
  {
    id: 'TNT-007',
    company_name: 'PT Timah',
    email: 'admin@timah.co.id',
    address: 'Jl. Jenderal Sudirman, Pangkalpinang, Bangka Belitung',
    plan: 'PREMIUM',
    period: 'MONTHLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-11-01T00:00:00Z',
    subscriptionEnd: '2025-12-01T00:00:00Z',
    createdAt: '2024-09-20T13:00:00Z',
    updatedAt: '2025-11-19T11:00:00Z'
  },
  {
    id: 'TNT-008',
    company_name: 'PT Problem Mining',
    email: 'admin@problem.co.id',
    address: 'Jl. Gatot Subroto No. 88, Jakarta',
    plan: 'PREMIUM',
    period: 'MONTHLY',
    tenantStatus: 'SUSPENDED',
    subscriptionStart: '2024-08-15T00:00:00Z',
    subscriptionEnd: '2025-11-15T00:00:00Z',
    createdAt: '2024-08-15T10:00:00Z',
    updatedAt: '2025-11-20T15:30:00Z'
  },
  {
    id: 'TNT-009',
    company_name: 'PT Expired Company',
    email: 'admin@expired.co.id',
    address: 'Jl. Asia Afrika No. 123, Bandung',
    plan: 'PREMIUM',
    period: 'MONTHLY',
    tenantStatus: 'EXPIRED',
    subscriptionStart: '2024-01-10T00:00:00Z',
    subscriptionEnd: '2025-10-10T00:00:00Z',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2025-11-15T10:00:00Z'
  },
  {
    id: 'TNT-010',
    company_name: 'PT Mining Jaya',
    email: 'admin@miningjaya.co.id',
    address: 'Jl. HR Rasuna Said, Jakarta Selatan',
    plan: 'BASIC',
    period: 'TRIAL',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-11-17T10:00:00Z',
    subscriptionEnd: '2025-12-01T10:00:00Z',
    createdAt: '2025-11-17T10:00:00Z',
    updatedAt: '2025-11-17T10:00:00Z'
  },
  {
    id: 'TNT-011',
    company_name: 'PT Coal Express',
    email: 'admin@coalexpress.co.id',
    address: 'Jl. Pierre Tendean, Samarinda',
    plan: 'PREMIUM',
    period: 'MONTHLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-11-05T00:00:00Z',
    subscriptionEnd: '2025-12-05T00:00:00Z',
    createdAt: '2025-11-05T09:00:00Z',
    updatedAt: '2025-11-19T14:00:00Z'
  },
  {
    id: 'TNT-012',
    company_name: 'PT Bauxite Indo',
    email: 'admin@bauxite.co.id',
    address: 'Jl. Gajah Mada, Pontianak',
    plan: 'BASIC',
    period: 'TRIAL',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-11-21T13:00:00Z',
    subscriptionEnd: '2025-12-05T13:00:00Z',
    createdAt: '2025-11-21T13:00:00Z',
    updatedAt: '2025-11-21T13:00:00Z'
  },
  {
    id: 'TNT-013',
    company_name: 'PT Nickel Mining',
    email: 'admin@nickelmining.co.id',
    address: 'Morowali Industrial Park, Sulawesi Tengah',
    plan: 'PREMIUM',
    period: 'QUARTERLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-08-01T00:00:00Z',
    subscriptionEnd: '2025-11-01T00:00:00Z',
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-20T09:00:00Z'
  },
  {
    id: 'TNT-014',
    company_name: 'PT Gold Mine Indonesia',
    email: 'admin@goldmine.co.id',
    address: 'Grasberg, Papua',
    plan: 'PREMIUM',
    period: 'MONTHLY',
    tenantStatus: 'ACTIVE',
    subscriptionStart: '2025-11-01T00:00:00Z',
    subscriptionEnd: '2025-12-01T00:00:00Z',
    createdAt: '2025-10-28T10:00:00Z',
    updatedAt: '2025-11-18T15:00:00Z'
  },
  {
    id: 'TNT-015',
    company_name: 'PT Inactive Corp',
    email: 'admin@inactive.co.id',
    address: 'Jl. Malioboro, Yogyakarta',
    plan: 'BASIC',
    period: 'TRIAL',
    tenantStatus: 'INACTIVE',
    subscriptionStart: '2024-12-01T08:00:00Z',
    subscriptionEnd: '2024-12-15T08:00:00Z',
    createdAt: '2024-12-01T08:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
]

// Mock Tenants with Counts
export const mockTenantsWithCounts: TenantWithCounts[] = mockTenants.map((tenant, index) => {
  const isPremium = tenant.plan === 'PREMIUM'
  const isActive = tenant.tenantStatus === 'ACTIVE'
  
  const baseUsers = isPremium ? (isActive ? 30 + Math.floor(Math.random() * 40) : 5) : 2
  const baseFleets = isPremium ? (isActive ? 50 + Math.floor(Math.random() * 400) : 10) : 3
  const baseDrivers = isPremium ? (isActive ? 30 + Math.floor(Math.random() * 250) : 8) : 2
  
  return {
    ...tenant,
    _count: {
      users: baseUsers,
      fleets: baseFleets,
      drivers: baseDrivers,
      zones: Math.floor(baseFleets * 0.15),
      routes: Math.floor(baseFleets * 0.3),
      transactions: Math.floor(baseFleets * 10),
      schedules: Math.floor(baseFleets * 5),
      telemetry: Math.floor(baseFleets * 100),
      incidents: Math.floor(baseFleets * 0.05),
      checkpoints: Math.floor(baseFleets * 0.8),
      notifications: Math.floor(baseUsers * 5)
    },
    telemetryLogs: generateTelemetryData(tenant.plan, tenant.tenantStatus)
  }
})