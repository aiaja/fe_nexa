"use client"

import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { PerformancePeriodData } from '@/interface/executive/dashboard' // ⭐ TAMBAH IMPORT

type PeriodType = 'today' | 'yesterday' | 'last7days'

interface ChartDataPoint {
  label: string
  value: number
  fleetCount?: number
  fullLabel: string
}

// ⭐ TAMBAH PROPS INTERFACE
interface PerformanceTrendsChartProps {
  trends: PerformancePeriodData
}

// ⭐ TERIMA PROPS
export function PerformanceTrendsChart({ trends }: PerformanceTrendsChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today')

  // ⭐ UBAH FUNCTION INI - pakai data dari props
  const getPeriodData = (period: PeriodType): ChartDataPoint[] => {
    const data = trends[period] // ambil dari props, bukan import
    
    return data.map(t => ({
      label: t.hour,
      value: t.value,
      fleetCount: t.fleetCount,
      fullLabel: t.hour
    }))
  }

  const displayData = getPeriodData(selectedPeriod)

  const periods: { value: PeriodType; label: string }[] = [
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
          <p>{data.value}L consumed</p>
          {data.fleetCount && (
            <p>{data.fleetCount} fleet active</p>
          )}
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
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Performance Trends</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {selectedPeriod === 'last7days' 
              ? 'Fuel consumption per day' 
              : 'Fuel consumption throughout the day (4-hourly)'}
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
              return `${peak.fullLabel} (${peak.value}L)`
            })()}
          </span>
        </div>
      </div>
    </div>
  )
}