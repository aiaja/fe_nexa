import { useState } from 'react'
import { Users } from 'lucide-react'
import { UserDistribution } from "@/interface/admin/dashboard"

interface UserDistributionChartProps {
  distribution: UserDistribution[]
}

export function UserDistributionChart({ distribution }: UserDistributionChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const totalUsers = distribution.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold">User Distribution by Role</h3>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {distribution.map((item, index) => {
              const prevSum = distribution.slice(0, index).reduce((s, i) => s + i.percentage, 0)
              const startAngle = (prevSum / 100) * 360
              const endAngle = ((prevSum + item.percentage) / 100) * 360
              
              const startRad = (startAngle * Math.PI) / 180
              const endRad = (endAngle * Math.PI) / 180
              
              const x1 = 50 + 50 * Math.cos(startRad)
              const y1 = 50 + 50 * Math.sin(startRad)
              const x2 = 50 + 50 * Math.cos(endRad)
              const y2 = 50 + 50 * Math.sin(endRad)
              
              const largeArc = item.percentage > 50 ? 1 : 0
              
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 50 50 0 ${largeArc} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ')
              
              const isHovered = hoveredIndex === index
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color}
                  className="cursor-pointer transition-opacity duration-200"
                  style={{ 
                    opacity: hoveredIndex === null ? 1 : isHovered ? 1 : 0.4,
                    filter: isHovered ? 'brightness(1.1)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              )
            })}
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        {distribution.map((item, index) => {
          const isHovered = hoveredIndex === index
          
          return (
            <div
              key={index}
              className={`
                flex items-center justify-between text-sm p-2 rounded-lg transition-all cursor-pointer
                ${isHovered ? 'bg-gray-50' : ''}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full transition-transform"
                  style={{ 
                    backgroundColor: item.color,
                    transform: isHovered ? 'scale(1.3)' : 'scale(1)'
                  }}
                />
                <span className={`text-gray-600 ${isHovered ? 'font-medium' : ''}`}>
                  {item.role}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{item.count}</span>
                <span className="text-xs text-gray-500">({item.percentage.toFixed(1)}%)</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}