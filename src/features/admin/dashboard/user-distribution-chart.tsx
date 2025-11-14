import { UserDistribution } from "@/interface/admin/dashboard"

interface UserDistributionChartProps {
  distribution: UserDistribution[]
}

export function UserDistributionChart({ distribution }: UserDistributionChartProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
      <div className="flex items-center justify-center mb-4">
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
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color}
                />
              )
            })}
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        {distribution.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-600">{item.role}</span>
            </div>
            <span className="font-medium">({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  )
}