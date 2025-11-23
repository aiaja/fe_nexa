import {
  DashboardMetrics,
  SubscriptionPlanDistribution,
  TenantStatusDistribution,
  Tenant
} from '@/interface/superadmin/dashboard'

export const dashboardMetrics: DashboardMetrics[] = [
  {
    icon: "Building2",
    label: "Total Tenants",
    value: 24,
    subtitle: "Registered companies",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    detail: {
      items: [
        { label: "Active", value: 18, color: "text-green-600" },
        { label: "Trial", value: 4, color: "text-blue-600" }
      ]
    }
  },
  {
    icon: "TrendingUp",
    label: "Active Subscriptions",
    value: 18,
    subtitle: "75% of total",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: "Activity",
    label: "Trial Accounts",
    value: 4,
    subtitle: "14-day trial period",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: "AlertTriangle",
    label: "Needs Attention",
    value: 2,
    subtitle: "Requires action",
    color: "text-red-600",
    bgColor: "bg-red-100",
    detail: {
      items: [
        { label: "Suspended", value: 1, color: "text-red-600" },
        { label: "Expired", value: 1, color: "text-gray-600" }
      ]
    }
  }
]


export const subscriptionPlans: SubscriptionPlanDistribution[] = [
  { plan: 'FREE', count: 5, color: '#10b981', percentage: 21 },
  { plan: 'STARTER', count: 8, color: '#3b82f6', percentage: 33 },
  { plan: 'BUSINESS', count: 9, color: '#8b5cf6', percentage: 38 },
  { plan: 'ENTERPRISE', count: 2, color: '#f59e0b', percentage: 8 }
]


export const tenantStatuses: TenantStatusDistribution[] = [
  { status: 'ACTIVE', count: 18, color: '#10b981' },
  { status: 'TRIAL', count: 4, color: '#3b82f6' },
  { status: 'SUSPENDED', count: 1, color: '#ef4444' },
  { status: 'EXPIRED', count: 1, color: '#6b7280' },
  { status: 'INACTIVE', count: 0, color: '#9ca3af' }
]


export const mockTenants: Tenant[] = [
  {
    id: 'tenant-001',
    company_name: 'PT Adaro Mining',
    email: 'admin@adaromining.co.id',
    address: 'Jakarta',
    plan: 'ENTERPRISE',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-03-15T08:00:00Z',
    updatedAt: '2025-11-15T12:00:00Z'
  },
  {
    id: 'tenant-002',
    company_name: 'PT Bukit Asam',
    email: 'admin@bukitasam.co.id',
    address: 'Tanjung Enim',
    plan: 'BUSINESS',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-05-20T14:00:00Z',
    updatedAt: '2025-11-18T10:00:00Z'
  },
  {
    id: 'tenant-003',
    company_name: 'PT Indo Coal',
    email: 'admin@indocoal.co.id',
    address: 'Samarinda',
    plan: 'BUSINESS',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-07-10T12:00:00Z',
    updatedAt: '2025-11-14T09:00:00Z'
  },
  {
    id: 'tenant-004',
    company_name: 'PT Vale Indonesia',
    email: 'admin@vale.co.id',
    address: 'Sorowako',
    plan: 'ENTERPRISE',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2025-11-10T11:00:00Z'
  },
  {
    id: 'tenant-005',
    company_name: 'PT Freeport',
    email: 'admin@freeport.co.id',
    address: 'Timika',
    plan: 'BUSINESS',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-06-12T11:00:00Z',
    updatedAt: '2025-11-12T16:00:00Z'
  },
  {
    id: 'tenant-010',
    company_name: 'PT Problem Tenant',
    email: 'admin@problem.co.id',
    address: 'Jakarta',
    plan: 'BUSINESS',
    tenantStatus: 'SUSPENDED',
    createdAt: '2024-08-15T10:00:00Z',
    updatedAt: '2025-11-20T15:30:00Z'
  },
  {
    id: 'tenant-011',
    company_name: 'PT Expired Company',
    email: 'admin@expired.co.id',
    address: 'Bandung',
    plan: 'STARTER',
    tenantStatus: 'EXPIRED',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2025-11-15T10:00:00Z'
  },
  {
    id: 'tenant-020',
    company_name: 'PT Mining Jaya',
    email: 'admin@miningjaya.co.id',
    address: 'Jakarta',
    plan: 'FREE',
    tenantStatus: 'TRIAL',
    createdAt: '2025-11-20T10:00:00Z',
    updatedAt: '2025-11-20T10:00:00Z'
  },
  {
    id: 'tenant-021',
    company_name: 'PT Coal Express',
    email: 'admin@coalexpress.co.id',
    address: 'Samarinda',
    plan: 'STARTER',
    tenantStatus: 'ACTIVE',
    createdAt: '2025-11-18T09:00:00Z',
    updatedAt: '2025-11-19T14:00:00Z'
  },
  {
    id: 'tenant-022',
    company_name: 'PT Bauxite Indo',
    email: 'admin@bauxite.co.id',
    address: 'Pontianak',
    plan: 'FREE',
    tenantStatus: 'TRIAL',
    createdAt: '2025-11-15T13:00:00Z',
    updatedAt: '2025-11-15T13:00:00Z'
  }
]