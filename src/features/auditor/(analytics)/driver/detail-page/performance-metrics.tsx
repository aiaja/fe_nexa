'use client'

import { Activity, Fuel, Shield, CheckCircle } from 'lucide-react'

interface PerformanceMetricsProps {
  metrics: {
    onTimeDelivery: number
    fuelEfficiency: number
    safetyScore: number
    complianceRate: number
  }
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: number
  unit: string
  color: string
}

function MetricCard({ icon, label, value, unit, color }: MetricCardProps) {
  const getBackgroundColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-50 border-green-200',
      blue: 'bg-blue-50 border-blue-200',
      purple: 'bg-purple-50 border-purple-200',
      amber: 'bg-amber-50 border-amber-200',
    }
    return colors[color] || 'bg-gray-50 border-gray-200'
  }

  const getTextColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'text-green-700',
      blue: 'text-blue-700',
      purple: 'text-purple-700',
      amber: 'text-amber-700',
    }
    return colors[color] || 'text-gray-700'
  }

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      amber: 'text-amber-600',
    }
    return colors[color] || 'text-gray-600'
  }

  return (
    <div className={`rounded-xl border p-6 ${getBackgroundColor(color)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${getBackgroundColor(color).split(' ')[0]}`}>
          <div className={`${getIconColor(color)}`}>{icon}</div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${getTextColor(color)}`}>{value}</span>
        <span className={`text-sm font-medium ${getTextColor(color)}`}>{unit}</span>
      </div>
      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            color === 'green' ? 'bg-green-600' :
            color === 'blue' ? 'bg-blue-600' :
            color === 'purple' ? 'bg-purple-600' :
            'bg-amber-600'
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={<Activity className="h-5 w-5" />}
        label="On-Time Delivery"
        value={metrics.onTimeDelivery}
        unit="%"
        color="green"
      />
      <MetricCard
        icon={<Fuel className="h-5 w-5" />}
        label="Fuel Efficiency"
        value={metrics.fuelEfficiency}
        unit="%"
        color="blue"
      />
      <MetricCard
        icon={<Shield className="h-5 w-5" />}
        label="Safety Score"
        value={metrics.safetyScore}
        unit="%"
        color="purple"
      />
      <MetricCard
        icon={<CheckCircle className="h-5 w-5" />}
        label="Compliance Rate"
        value={metrics.complianceRate}
        unit="%"
        color="amber"
      />
    </div>
  )
}
