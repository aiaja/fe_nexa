"use client"

import { DailyTarget } from "@/interface/executive/dashboard"
import { CheckCircle, AlertCircle, XCircle, Crosshair } from 'lucide-react'

interface DailyTargetAchievementProps {
  target: DailyTarget
}

export function DailyTargetAchievement({ target }: DailyTargetAchievementProps) {
  
  // Determine status based on percentage
  const getStatus = (percentage: number) => {
    if (percentage >= 70) return { label: "On track", color: "green", icon: CheckCircle }
    if (percentage >= 40) return { label: "At risk", color: "yellow", icon: AlertCircle }
    return { label: "Behind", color: "red", icon: XCircle }
  }
  
  const status = getStatus(target.percentage)
  
  // Color classes
  const getColorClasses = (color: string) => {
    if (color === 'green') return {
      text: 'text-green-600',
      bg: 'bg-green-50',
      stroke: '#10b981'
    }
    if (color === 'yellow') return {
      text: 'text-yellow-600',
      bg: 'bg-yellow-50',
      stroke: '#f59e0b'
    }
    return {
      text: 'text-red-600',
      bg: 'bg-red-50',
      stroke: '#ef4444'
    }
  }
  
  const colors = getColorClasses(status.color)
  const StatusIcon = status.icon
  
  // Calculate semi-circle arc (180 degrees)
  const circumference = 40 * Math.PI // Half circle circumference
  const progress = (target.percentage / 100) * circumference
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header with Icon */}
      <div className="flex items-center gap-2 mb-6">
        <Crosshair className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-semibold text-gray-900">Daily Target Achievement</h3>
      </div>
      
      {/* Semi-circle Gauge */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-24">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            {/* Background arc (gray) */}
            <path
              d="M 10 45 A 40 40 0 0 1 90 45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Progress arc (colored) */}
            <path
              d="M 10 45 A 40 40 0 0 1 90 45"
              fill="none"
              stroke={colors.stroke}
              strokeWidth="8"
              strokeDasharray={`${progress} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center percentage */}
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <div className="text-4xl font-bold text-gray-900">{target.percentage}%</div>
          </div>
        </div>
      </div>
      
      {/* Target and Status */}
      <div className="text-center space-y-3">
        <div className="text-sm text-gray-500">
          Daily Target: <span className="font-semibold text-gray-900">{target.target}%</span>
        </div>
        
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg}`}>
          <StatusIcon className={`h-4 w-4 ${colors.text}`} />
          <span className={`text-sm font-semibold ${colors.text}`}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  )
}