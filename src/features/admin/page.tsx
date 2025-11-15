"use client"

import React from 'react'
import { Users, Truck, UserCircle, LucideIcon } from 'lucide-react'
import { 
  DashboardStats, 
  ActivityLog, 
  UserDistribution,
  ActivityTrend 
} from "@/interface/admin/dashboard"
import { StatsCard } from "@/features/admin/dashboard/stats-card"
import { UserDistributionChart } from "@/features/admin/dashboard/user-distribution-chart"
import { ActivityLogs } from "@/features/admin/dashboard/activity-logs"
import { ActivityTrendsChart } from "@/features/admin/dashboard/activity-trend-chart"

interface SuperAdminDashboardProps {
  stats: DashboardStats[]
  logs: ActivityLog[]
  distribution: UserDistribution[]
  trends: ActivityTrend[]
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Truck,
  UserCircle,
}

export default function SuperAdminDashboard({ 
  stats,  
  logs, 
  distribution, 
  trends 
}: SuperAdminDashboardProps) {
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 p-6">
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SuperAdmin Dashboard</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
              <StatsCard 
                key={index}
                icon={iconMap[stat.icon]}
                label={stat.label}
                value={stat.value}
                subtitle={stat.subtitle}
                color={stat.color}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <UserDistributionChart distribution={distribution} />
            <ActivityLogs logs={logs} />
            <ActivityTrendsChart trends={trends} />
          </div>
        </div>
      </div>
    </div>
  )
}