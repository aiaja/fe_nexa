"use client"

import TenantManagement from "@/features/superadmin/tenant/tenant-data"
import { mockTenantsWithCounts } from "@/data/superadmin/tenant"

export default function Page() {
  return <TenantManagement tenantItems={mockTenantsWithCounts} />
}