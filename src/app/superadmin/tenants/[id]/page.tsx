"use client"

import { useParams } from 'next/navigation'
import TenantDetail from '@/features/superadmin/tenant/detail-page/tenant-detail'
import { mockTenantsWithCounts } from '@/data/superadmin/tenant'

export default function Page() {
  const params = useParams()
  const tenantId = params.id as string

  const tenant = mockTenantsWithCounts.find(t => t.id === tenantId)

  return <TenantDetail tenant={tenant || null} />
}