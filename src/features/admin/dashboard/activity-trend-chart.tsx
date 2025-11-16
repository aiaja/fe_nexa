import { ActivityTrend } from "@/interface/admin/dashboard"

interface ActivityTrendsChartProps {
  trends: ActivityTrend[]
}

export function ActivityTrendsChart({ trends }: ActivityTrendsChartProps) {
  const maxActivity = Math.max(...trends.map(d => d.value))

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm lg:col-span-2">
      <h3 className="text-lg font-semibold mb-2">Activity Trends</h3>
      <p className="text-sm text-gray-500 mb-6">Active users throughout the day</p>
      
      <div className="relative">
        <div className="h-64 flex items-end gap-1 px-2">
          {trends.map((item, index) => {
            const hourStr = `${String(item.hour).padStart(2, '0')}:00`
            return (
              <div
                key={index}
                className="group relative flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                style={{ 
                  height: `${(item.value / maxActivity) * 100}%`,
                  minHeight: '20px'
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {hourStr}: {item.value} users
                  </div>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}