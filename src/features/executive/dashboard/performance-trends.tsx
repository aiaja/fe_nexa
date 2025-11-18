"use client"

import { PerformanceTrend } from "@/interface/executive/dashboard"
import { BarChart3 } from 'lucide-react'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface PerformanceTrendsProps {
  trends: PerformanceTrend[]
}

type PeriodType = 'today' | 'yesterday' | 'last7days'

export function PerformanceTrendsChart({ trends }: PerformanceTrendsProps) {
  const [period, setPeriod] = useState<PeriodType>('today')

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-1">{data.hour}</p>
          <p className="text-sm text-gray-600">
            Consumption: <span className="font-semibold text-blue-600">{data.value} L</span>
          </p>
          {data.fleetCount && (
            <p className="text-sm text-gray-600">
              Fleet Active: <span className="font-semibold">{data.fleetCount}</span>
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const periods = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' }
  ]

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header with Icon and Period Selector */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
        </div>
        
        {/* Period Selector */}
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value as PeriodType)}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-lg transition-all
                ${period === p.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-6">Consumption Trends (4-Hourly)</p>
      
      {/* Recharts Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="hour" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Liters', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 12 } }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
          <Bar 
            dataKey="value" 
            fill="#3b82f6" 
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}