import { Tenant, TenantWithCounts } from '@/interface/superadmin/tenant'

export const mockTenants: Tenant[] = [
  {
    id: 'TNT-001',
    company_name: 'PT Adaro Mining',
    email: 'admin@adaromining.co.id',
    address: 'Jl. Thamrin No. 20, Jakarta Pusat 10350',
    plan: 'ENTERPRISE',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-03-15T08:00:00Z',
    updatedAt: '2025-11-15T12:00:00Z'
  },
  {
    id: 'TNT-002',
    company_name: 'PT Bukit Asam',
    email: 'admin@bukitasam.co.id',
    address: 'Jl. Parigi No. 1, Tanjung Enim, Sumatera Selatan',
    plan: 'BUSINESS',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-05-20T14:00:00Z',
    updatedAt: '2025-11-18T10:00:00Z'
  },
  {
    id: 'TNT-003',
    company_name: 'PT Indo Coal',
    email: 'admin@indocoal.co.id',
    address: 'Jl. Sudirman No. 45, Samarinda, Kalimantan Timur',
    plan: 'BUSINESS',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-07-10T12:00:00Z',
    updatedAt: '2025-11-14T09:00:00Z'
  },
  {
    id: 'TNT-004',
    company_name: 'PT Vale Indonesia',
    email: 'admin@vale.co.id',
    address: 'Sorowako, Luwu Timur, Sulawesi Selatan',
    plan: 'ENTERPRISE',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2025-11-10T11:00:00Z'
  },
  {
    id: 'TNT-005',
    company_name: 'PT Freeport Indonesia',
    email: 'admin@freeport.co.id',
    address: 'Kuala Kencana, Timika, Papua',
    plan: 'ENTERPRISE',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-06-12T11:00:00Z',
    updatedAt: '2025-11-12T16:00:00Z'
  },
  {
    id: 'TNT-006',
    company_name: 'PT Aneka Tambang',
    email: 'admin@antam.co.id',
    address: 'Jl. Letjen TB Simatupang No. 1, Jakarta Selatan',
    plan: 'BUSINESS',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-08-05T10:00:00Z',
    updatedAt: '2025-11-16T14:00:00Z'
  },
  {
    id: 'TNT-007',
    company_name: 'PT Timah',
    email: 'admin@timah.co.id',
    address: 'Jl. Jenderal Sudirman, Pangkalpinang, Bangka Belitung',
    plan: 'STARTER',
    tenantStatus: 'ACTIVE',
    createdAt: '2024-09-20T13:00:00Z',
    updatedAt: '2025-11-19T11:00:00Z'
  },
  {
    id: 'TNT-008',
    company_name: 'PT Problem Mining',
    email: 'admin@problem.co.id',
    address: 'Jl. Gatot Subroto No. 88, Jakarta',
    plan: 'BUSINESS',
    tenantStatus: 'SUSPENDED',
    createdAt: '2024-08-15T10:00:00Z',
    updatedAt: '2025-11-20T15:30:00Z'
  },
  {
    id: 'TNT-009',
    company_name: 'PT Expired Company',
    email: 'admin@expired.co.id',
    address: 'Jl. Asia Afrika No. 123, Bandung',
    plan: 'STARTER',
    tenantStatus: 'EXPIRED',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2025-11-15T10:00:00Z'
  },
  {
    id: 'TNT-010',
    company_name: 'PT Mining Jaya',
    email: 'admin@miningjaya.co.id',
    address: 'Jl. HR Rasuna Said, Jakarta Selatan',
    plan: 'FREE',
    tenantStatus: 'TRIAL',
    createdAt: '2025-11-17T10:00:00Z', // 6 days ago (8 days left)
    updatedAt: '2025-11-17T10:00:00Z'
  },
  {
    id: 'TNT-011',
    company_name: 'PT Coal Express',
    email: 'admin@coalexpress.co.id',
    address: 'Jl. Pierre Tendean, Samarinda',
    plan: 'STARTER',
    tenantStatus: 'ACTIVE',
    createdAt: '2025-11-05T09:00:00Z',
    updatedAt: '2025-11-19T14:00:00Z'
  },
  {
    id: 'TNT-012',
    company_name: 'PT Bauxite Indo',
    email: 'admin@bauxite.co.id',
    address: 'Jl. Gajah Mada, Pontianak',
    plan: 'FREE',
    tenantStatus: 'TRIAL',
    createdAt: '2025-11-21T13:00:00Z', // 2 days ago (12 days left)
    updatedAt: '2025-11-21T13:00:00Z'
  },
  {
    id: 'TNT-013',
    company_name: 'PT Nickel Mining',
    email: 'admin@nickelmining.co.id',
    address: 'Morowali Industrial Park, Sulawesi Tengah',
    plan: 'BUSINESS',
    tenantStatus: 'ACTIVE',
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-20T09:00:00Z'
  },
  {
    id: 'TNT-014',
    company_name: 'PT Gold Mine Indonesia',
    email: 'admin@goldmine.co.id',
    address: 'Grasberg, Papua',
    plan: 'STARTER',
    tenantStatus: 'ACTIVE',
    createdAt: '2025-10-28T10:00:00Z',
    updatedAt: '2025-11-18T15:00:00Z'
  },
  {
    id: 'TNT-015',
    company_name: 'PT Inactive Corp',
    email: 'admin@inactive.co.id',
    address: 'Jl. Malioboro, Yogyakarta',
    plan: 'FREE',
    tenantStatus: 'INACTIVE',
    createdAt: '2024-12-01T08:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
]

// Mock Tenants with Counts (untuk tabel dengan usage info)
export const mockTenantsWithCounts: TenantWithCounts[] = [
  {
    ...mockTenants[0], // PT Adaro Mining - ENTERPRISE
    _count: {
      users: 48,
      fleets: 247,
      drivers: 156
    }
  },
  {
    ...mockTenants[1], // PT Bukit Asam - BUSINESS
    _count: {
      users: 42,
      fleets: 96,
      drivers: 87
    }
  },
  {
    ...mockTenants[2], // PT Indo Coal - BUSINESS
    _count: {
      users: 35,
      fleets: 89,
      drivers: 68
    }
  },
  {
    ...mockTenants[3], // PT Vale - ENTERPRISE
    _count: {
      users: 52,
      fleets: 312,
      drivers: 201
    }
  },
  {
    ...mockTenants[4], // PT Freeport - ENTERPRISE
    _count: {
      users: 67,
      fleets: 456,
      drivers: 289
    }
  },
  {
    ...mockTenants[5], // PT Aneka Tambang - BUSINESS
    _count: {
      users: 38,
      fleets: 78,
      drivers: 62
    }
  },
  {
    ...mockTenants[6], // PT Timah - STARTER
    _count: {
      users: 8,
      fleets: 18,
      drivers: 15
    }
  },
  {
    ...mockTenants[7], // PT Problem Mining - SUSPENDED
    _count: {
      users: 25,
      fleets: 67,
      drivers: 45
    }
  },
  {
    ...mockTenants[8], // PT Expired - EXPIRED
    _count: {
      users: 3,
      fleets: 5, // At limit!
      drivers: 4
    }
  },
  {
    ...mockTenants[9], // PT Mining Jaya - TRIAL (FREE)
    _count: {
      users: 2,
      fleets: 3,
      drivers: 2
    }
  },
  {
    ...mockTenants[10], // PT Coal Express - STARTER
    _count: {
      users: 9,
      fleets: 15,
      drivers: 12
    }
  },
  {
    ...mockTenants[11], // PT Bauxite - TRIAL (FREE)
    _count: {
      users: 3, // At limit!
      fleets: 5, // At limit!
      drivers: 3
    }
  },
  {
    ...mockTenants[12], // PT Nickel Mining - BUSINESS
    _count: {
      users: 45,
      fleets: 92,
      drivers: 73
    }
  },
  {
    ...mockTenants[13], // PT Gold Mine - STARTER
    _count: {
      users: 7,
      fleets: 12,
      drivers: 9
    }
  },
  {
    ...mockTenants[14], // PT Inactive - INACTIVE
    _count: {
      users: 0,
      fleets: 0,
      drivers: 0
    }
  }
]

// Helper: Get existing emails (untuk validation)
export const getExistingEmails = (): string[] => {
  return mockTenants.map(t => t.email.toLowerCase())
}

// Helper: Calculate trial days left
export const calculateTrialDaysLeft = (createdAt: string): number => {
  const created = new Date(createdAt)
  const now = new Date()
  const daysPassed = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(0, 14 - daysPassed)
}

// Helper: Get plan limits
export const getPlanLimits = (plan: string) => {
  const limits = {
    FREE: { fleets: 5, users: 3 },
    STARTER: { fleets: 20, users: 10 },
    BUSINESS: { fleets: 100, users: 50 },
    ENTERPRISE: { fleets: 999, users: 999 }
  }
  return limits[plan as keyof typeof limits] || limits.FREE
}