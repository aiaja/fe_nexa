import React from 'react'
import { Activity } from 'lucide-react'
import { TenantStatusDistribution } from '@/interface/superadmin/dashboard'

interface StatusOverviewProps {
  statuses: TenantStatusDistribution[]
  totalTenants: number
  activeTenants: number
  suspendedTenants: number
  expiredTenants: number
}

export function StatusOverview({ 
  statuses, 
  totalTenants,
  activeTenants,
  suspendedTenants,
  expiredTenants
}: StatusOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Tenant Status Overview</h2>
      </div>

      <div className="space-y-4">
        {statuses.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.status}</span>
              <span className="text-sm font-semibold text-gray-900">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${(item.count / totalTenants) * 100}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1 text-xs">Active</p>
            <p className="text-lg font-bold text-green-600">{activeTenants}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1 text-xs">Suspended</p>
            <p className="text-lg font-bold text-red-600">{suspendedTenants}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1 text-xs">Expired</p>
            <p className="text-lg font-bold text-gray-600">{expiredTenants}</p>
          </div>
        </div>
      </div>
    </div>
  )
}