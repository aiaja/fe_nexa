"use client"

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string
  trend?: string | null
  trendUp?: boolean
  subtitle?: string
  isAlert?: boolean
  clickable?: boolean
  onClick?: () => void
}

export function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendUp, 
  subtitle, 
  isAlert,
  clickable,
  onClick
}: StatsCardProps) {
  
  // Dynamic colors based on card type
  const getColor = () => {
    if (isAlert) return 'text-red-600'
    if (label.includes('Fuel Usage')) return 'text-blue-600'
    if (label.includes('Efficiency')) return 'text-purple-600'
    return 'text-gray-600'
  }
  
  const getIconBgClass = () => {
    if (isAlert) return 'bg-red-100'
    if (label.includes('Fuel Usage')) return 'bg-blue-100'
    if (label.includes('Efficiency')) return 'bg-purple-100'
    return 'bg-gray-100'
  }
  
  const getCardBgClass = () => {
    if (isAlert) return 'bg-red-50/30'
    if (label.includes('Fuel Usage')) return 'bg-blue-50/30'
    if (label.includes('Efficiency')) return 'bg-purple-50/30'
    return 'bg-gray-50/30'
  }
  
  const getBorderClass = () => {
    if (isAlert) return 'border-red-100 hover:border-red-200'
    if (label.includes('Fuel Usage')) return 'border-blue-100 hover:border-blue-200'
    if (label.includes('Efficiency')) return 'border-purple-100 hover:border-purple-200'
    return 'border-gray-200 hover:border-gray-300'
  }
  
  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl border p-6 
        shadow-sm hover:shadow-lg transition-all duration-300
        ${getCardBgClass()} ${getBorderClass()}
        ${clickable ? 'cursor-pointer hover:scale-[1.02]' : ''}
      `}
      onClick={clickable ? onClick : undefined}
    >
      <div className="relative z-10">
        {/* Header: Icon + Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-lg ${getIconBgClass()}`}>
            <Icon className={`h-5 w-5 ${getColor()}`} />
          </div>
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        
        {/* Main Value */}
        <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
        
        {/* Footer: Subtitle or Trend */}
        <div className="flex items-center gap-2">
          {trend && (
            <div className={`
              inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full
              ${trendUp 
                ? 'text-green-600 bg-green-50'  // ⬅️ Green untuk trend positif
                : 'text-red-600 bg-red-50'      // ⬅️ Red untuk trend negatif
              }
            `}>
              {trendUp ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{trend}</span>
            </div>
          )}
          
          {subtitle && (
            <div className={`text-sm ${
              isAlert ? 'text-red-600 font-semibold' : 'text-gray-500'
            }`}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}