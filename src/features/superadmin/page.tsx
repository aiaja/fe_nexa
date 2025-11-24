"use client"

import React from 'react'
import { Building2, TrendingUp, Activity, AlertTriangle, LucideIcon } from 'lucide-react'
import { MetricsCard } from '@/features/superadmin/dashboard/metric-cards'
import { SubscriptionChart } from '@/features/superadmin/dashboard/subscription-chart'
import { StatusOverview } from '@/features/superadmin/dashboard/status-overview'
import { 
  DashboardMetrics,
  SubscriptionPlanDistribution,
  TenantStatusDistribution
} from '@/interface/superadmin/dashboard'

interface SuperAdminDashboardProps {
  metrics: DashboardMetrics[]
  plans: SubscriptionPlanDistribution[]
  statuses: TenantStatusDistribution[]
}


const iconMap: Record<string, LucideIcon> = {
  Building2,
  TrendingUp,
  Activity,
  AlertTriangle
}

export default function SuperAdminDashboard({ 
  metrics,
  plans,
  statuses
}: SuperAdminDashboardProps) {
  
  const totalTenants = metrics[0].value
  const activeTenants = metrics[1].value
  const suspendedTenants = metrics[3].detail?.items[0].value || 0
  const expiredTenants = metrics[3].detail?.items[1].value || 0

  return (
  <div className="flex flex-1 flex-col">
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-6 p-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SuperAdmin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform-wide tenant management and monitoring</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricsCard
              key={index}
              icon={iconMap[metric.icon]}
              label={metric.label}
              value={metric.value}
              subtitle={metric.subtitle}
              color={metric.color}
              bgColor={metric.bgColor}
              detail={metric.detail}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SubscriptionChart 
            plans={plans} 
            totalTenants={totalTenants} 
          />
          <StatusOverview 
            statuses={statuses}
            totalTenants={totalTenants}
            activeTenants={activeTenants}
            suspendedTenants={suspendedTenants}
            expiredTenants={expiredTenants}
          />
        </div>

      </div>
    </div>
  </div>
)
}