"use client"

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
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

  const periods: { value: Period; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 shadow-lg">
          <p className="font-semibold">{data.fullLabel}</p>
          <p>{data.value} users</p>
        </div>
      )
    }
    return null
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

      <ResponsiveContainer width="100%" height={256}>
        <BarChart data={displayData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="label" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            interval={selectedPeriod === 'last7days' ? 0 : 3} // Show all days, every 4th hour
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
          <Bar 
            dataKey="value" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>

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