import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string
  trend?: string | null
  trendUp?: boolean
  subtitle?: string
  isAlert?: boolean
}

export function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendUp, 
  subtitle, 
  isAlert 
}: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`h-5 w-5 ${isAlert ? 'text-red-600' : 'text-blue-600'}`} />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      {trend && (
        <div className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </div>
      )}
      {subtitle && (
        <div className={`text-sm ${isAlert ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
          {subtitle}
        </div>
      )}
    </div>
  )
}