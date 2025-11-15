import { PerformanceTrend } from "@/interface/executive/dashboard"

interface PerformanceTrendsProps {
  trends: PerformanceTrend[]
}

export function PerformanceTrendsChart({ trends }: PerformanceTrendsProps) {
  const maxTrend = Math.max(...trends.map(p => p.value))

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Performance Trends</h3>
      <p className="text-sm text-gray-500 mb-6">Consumption Trends (4-Hourly)</p>
      
      <div className="h-64 flex items-end justify-between gap-4 px-4">
        {trends.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 h-full">
            <div className="w-full flex flex-col justify-end h-full">
              <div
                className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-colors"
                style={{ 
                  height: `${(item.value / maxTrend) * 100}%`
                }}
              />
            </div>
            <span className="text-xs text-gray-500 mt-2">{item.hour}</span>
          </div>
        ))}
      </div>
    </div>
  )
}