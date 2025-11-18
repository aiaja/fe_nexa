import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'


interface SingleStatsProps {
  variant?: 'single'
  icon: LucideIcon
  label: string
  value: string
  subtitle: string
  color: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

interface SplitStatsProps {
  variant: 'split'
  items: Array<{
    icon: LucideIcon
    label: string
    value: string
    subtitle: string
    color: string
  }>
}

type StatsCardProps = SingleStatsProps | SplitStatsProps

export function StatsCard(props: StatsCardProps) {

  if (props.variant !== 'split') {
    const { icon: Icon, label, value, subtitle, color, trend } = props
    
    const getIconBgClass = (color: string) => {
      if (color.includes('blue')) return 'bg-blue-100'
      if (color.includes('orange')) return 'bg-orange-100'
      if (color.includes('purple')) return 'bg-purple-100'
      if (color.includes('green')) return 'bg-green-100'
      return 'bg-gray-100'
    }

    const getCardBgClass = (color: string) => {
      if (color.includes('blue')) return 'bg-blue-50/30'
      if (color.includes('orange')) return 'bg-orange-50/30'
      if (color.includes('purple')) return 'bg-purple-50/30'
      if (color.includes('green')) return 'bg-green-50/30'
      return 'bg-gray-50/30'
    }
    
    const getBorderClass = (color: string) => {
      if (color.includes('blue')) return 'border-blue-100 hover:border-blue-200'
      if (color.includes('orange')) return 'border-orange-100 hover:border-orange-200'
      if (color.includes('purple')) return 'border-purple-100 hover:border-purple-200'
      if (color.includes('green')) return 'border-green-100 hover:border-green-200'
      return 'border-gray-200 hover:border-gray-300'
    }
    
    return (
      <div className={`
        relative overflow-hidden rounded-xl border ${getCardBgClass(color)} p-6 
        shadow-sm hover:shadow-lg transition-all duration-300
        ${getBorderClass(color)}
      `}>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${getIconBgClass(color)}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <span className="text-sm font-semibold text-gray-700">{label}</span>
            </div>
          </div>
          
          <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-gray-500">{subtitle}</div>
            
            {trend && (
              <div className={`
                flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
                ${trend.isPositive 
                  ? 'text-green-700 bg-green-100 border border-green-200' 
                  : 'text-red-700 bg-red-100 border border-red-200'
                }
              `}>
                {trend.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                <span>{trend.value}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const { items } = props
  
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-gray-300 bg-gray-50/20 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative z-10 grid grid-cols-2 gap-6">
        {items.map((item, index) => {
          const Icon = item.icon
          
          const getCardBgClass = (color: string) => {
            if (color.includes('orange')) return 'bg-orange-50/50'
            if (color.includes('purple')) return 'bg-purple-50/50'
            return 'bg-gray-50'
          }
          
          const getBorderClass = (color: string) => {
            if (color.includes('orange')) return 'border-orange-100'
            if (color.includes('purple')) return 'border-purple-100'
            return 'border-gray-200'
          }
          
          const getIconBgClass = (color: string) => {
            if (color.includes('orange')) return 'bg-orange-100'
            if (color.includes('purple')) return 'bg-purple-100'
            return 'bg-gray-100'
          }
          
          return (
            <div 
              key={index}
              className={`
                relative flex flex-col gap-3 p-4 rounded-lg border
                ${getCardBgClass(item.color)} ${getBorderClass(item.color)}
                hover:scale-105 transition-transform duration-200
              `}
            >
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${getIconBgClass(item.color)}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="text-xs font-medium text-gray-500">{item.subtitle}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}