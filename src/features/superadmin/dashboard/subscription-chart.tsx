import React from 'react'
import { TrendingUp } from 'lucide-react'
import { SubscriptionPlanDistribution } from '@/interface/superadmin/dashboard'

interface SubscriptionChartProps {
  plans: SubscriptionPlanDistribution[]
  totalTenants: number
}

export function SubscriptionChart({ plans, totalTenants }: SubscriptionChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Subscription Plan Distribution</h2>
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {plans.map((item, idx) => {
              const prevPercentage = plans.slice(0, idx).reduce((sum, i) => sum + i.percentage, 0)
              const circumference = 2 * Math.PI * 40
              const rotate = (prevPercentage / 100) * 360
              
              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={`${(item.percentage / 100) * circumference} ${circumference}`}
                  strokeDashoffset="0"
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    transformOrigin: '50% 50%'
                  }}
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalTenants}</p>
              <p className="text-xs text-gray-600">Tenants</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {plans.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm font-medium text-gray-700">{item.plan}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {item.count} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}