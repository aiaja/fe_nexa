import React from 'react'
import { LucideIcon } from 'lucide-react'

interface MetricsCardProps {
  icon: LucideIcon
  label: string
  value: number
  subtitle: string
  color: string
  bgColor: string
  detail?: {
    items: Array<{
      label: string
      value: number
      color: string
    }>
  }
}

export function MetricsCard({ 
  icon: Icon, 
  label, 
  value, 
  subtitle, 
  color, 
  bgColor, 
  detail 
}: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          
          {detail ? (
            <div className="mt-2 flex items-center gap-4 text-xs">
              {detail.items.map((item, idx) => (
                <span key={idx} className={`${item.color} font-medium`}>
                  {item.value} {item.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>
        
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  )
}