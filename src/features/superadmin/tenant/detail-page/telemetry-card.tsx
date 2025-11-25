"use client"

import { Activity, Radio, Thermometer, Fuel, Gauge, Battery, Navigation } from 'lucide-react'
import { TelemetryLogCounts } from '@/interface/superadmin/tenant'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface TelemetryOverviewCardProps {
  telemetryData: TelemetryLogCounts
}

export function TelemetryOverviewCard({ telemetryData }: TelemetryOverviewCardProps) {
  const {
    total,
    last24h,
    last7days,
    last30days,
    avgPerDay,
    byType,
    activityTrend,
    isActive,
    lastUpdate
  } = telemetryData

  const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toLocaleString()
  }

  const formatLastUpdate = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  const totalByType = byType.gps + byType.temperature + byType.fuel + byType.speed + byType.rpm + byType.battery
  const getPercentage = (value: number) => Math.round((value / totalByType) * 100)

  const sensorTypes = [
    {
      type: 'GPS',
      count: byType.gps,
      percentage: getPercentage(byType.gps),
      icon: Navigation,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      barColor: 'bg-blue-500'
    },
    {
      type: 'Temperature',
      count: byType.temperature,
      percentage: getPercentage(byType.temperature),
      icon: Thermometer,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      barColor: 'bg-orange-500'
    },
    {
      type: 'Fuel Level',
      count: byType.fuel,
      percentage: getPercentage(byType.fuel),
      icon: Fuel,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      barColor: 'bg-green-500'
    },
    {
      type: 'Speed',
      count: byType.speed,
      percentage: getPercentage(byType.speed),
      icon: Gauge,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      barColor: 'bg-purple-500'
    },
    {
      type: 'RPM',
      count: byType.rpm,
      percentage: getPercentage(byType.rpm),
      icon: Activity,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      barColor: 'bg-pink-500'
    },
    {
      type: 'Battery',
      count: byType.battery,
      percentage: getPercentage(byType.battery),
      icon: Battery,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      barColor: 'bg-yellow-500'
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-teal-50 to-cyan-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Radio className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Telemetry Overview</h3>
              <p className="text-sm text-gray-600">IoT Device Activity & Sensor Logs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className={`text-sm font-medium ${isActive ? 'text-green-700' : 'text-gray-500'}`}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Chart Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-700">Activity Trend (Last 7 Days)</h4>
            <span className="text-xs text-gray-500">Avg: {formatCount(avgPerDay)} logs/day</span>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityTrend}>
                <defs>
                  <linearGradient id="colorLogs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                  labelStyle={{ color: '#374151', fontWeight: 600 }}
                  formatter={(value: number) => [formatCount(value), 'Logs']}
                />
                <Area 
                  type="monotone" 
                  dataKey="logs" 
                  stroke="#14b8a6" 
                  strokeWidth={2}
                  fill="url(#colorLogs)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Logs by Sensor Type */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4"> Logs by Sensor Type</h4>
          <div className="space-y-3">
            {sensorTypes.map((sensor) => {
              const Icon = sensor.icon
              return (
                <div key={sensor.type} className="flex items-center gap-3">
                  <div className={`${sensor.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-4 w-4 ${sensor.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{sensor.type}</span>
                      <span className="text-sm text-gray-600">
                        {formatCount(sensor.count)} <span className="text-gray-400">({sensor.percentage}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`${sensor.barColor} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${sensor.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Last 24 Hours</p>
            <p className="text-lg font-bold text-gray-900">{formatCount(last24h)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Last 7 Days</p>
            <p className="text-lg font-bold text-gray-900">{formatCount(last7days)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Last 30 Days</p>
            <p className="text-lg font-bold text-gray-900">{formatCount(last30days)}</p>
          </div>
          <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
            <p className="text-xs text-teal-700 mb-1">Total Logs</p>
            <p className="text-lg font-bold text-teal-900">{formatCount(total)}</p>
          </div>
        </div>

        {/* Footer - Last Update */}
        <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
          <span> Last update: {formatLastUpdate(lastUpdate)}</span>
          <span className="text-gray-400">Real-time monitoring</span>
        </div>
      </div>
    </div>
  )
}