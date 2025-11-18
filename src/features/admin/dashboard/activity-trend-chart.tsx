import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { generateTodayData, generateYesterdayData, generateLast7DaysData } from '@/data/admin/dashboard'

interface ActivityTrend {
  hour: number
  value: number
}

interface ActivityTrendsChartProps {
  trends: ActivityTrend[]
}

type Period = 'today' | 'yesterday' | 'last7days'

interface ChartDataPoint {
  label: string
  value: number
  fullLabel: string
}

export function ActivityTrendsChart({ trends }: ActivityTrendsChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('today')

  const getPeriodData = (period: Period): ChartDataPoint[] => {
    switch (period) {
      case 'today':
        const todayData = generateTodayData(trends)
        return todayData.map(t => ({
          label: `${t.hour}:00`,
          value: t.value,
          fullLabel: `${String(t.hour).padStart(2, '0')}:00`
        }))
      
      case 'yesterday':
        const yesterdayData = generateYesterdayData(trends)
        return yesterdayData.map(t => ({
          label: `${t.hour}:00`,
          value: t.value,
          fullLabel: `${String(t.hour).padStart(2, '0')}:00`
        }))
      
      case 'last7days':
        const weekData = generateLast7DaysData()
        return weekData.map(d => ({
          label: d.day,
          value: d.value,
          fullLabel: d.fullDay
        }))
      
      default:
        return []
    }
  }

  const displayData = getPeriodData(selectedPeriod)
  const maxActivity = Math.max(...displayData.map(d => d.value))

  const periods: { value: Period; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
  ]

  const getLabelInterval = () => {
    if (selectedPeriod === 'last7days') return 1 //  all days
    return 4 //  every 4th hour 
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
  
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Activity Trends</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {selectedPeriod === 'last7days' 
              ? 'Active users per day' 
              : 'Active users throughout the day'}
          </p>
        </div>

        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-all
                ${selectedPeriod === period.value
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="h-64 flex items-end gap-1">
          {displayData.map((item, index) => (
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
                  {item.fullLabel}: {item.value} users
                </div>
                <div className="w-2 h-2 bg-gray-900 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-1 mt-2">
          {displayData.map((item, index) => {
            const showLabel = index % getLabelInterval() === 0
            
            return (
              <div key={index} className="flex-1 text-center">
                {showLabel && (
                  <span className="text-xs text-gray-500">
                    {item.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {selectedPeriod === 'last7days' ? 'Peak Day' : 'Peak Hours'}
          </span>
          <span className="font-medium text-gray-900">
            {(() => {
              const peak = displayData.reduce((max, curr) => 
                curr.value > max.value ? curr : max
              )
              return `${peak.fullLabel} (${peak.value} users)`
            })()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ActivityTrendsDemo() {
  const sampleTrends = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: Math.floor(Math.random() * 40) + 20
  }))

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <ActivityTrendsChart trends={sampleTrends} />
      </div>
    </div>
  )
}