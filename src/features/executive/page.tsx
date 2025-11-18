"use client"

import React from 'react'
import { 
  Fuel, 
  Gauge, 
  AlertTriangle, 
  TrendingUp, 
  Navigation, 
  ThermometerSun,
  LucideIcon 
} from 'lucide-react'
import { 
  DashboardStats, 
  DailyTarget, 
  EfficiencyScore, 
  FleetInsights, 
  PerformancePeriodData  
} from "@/interface/executive/dashboard"

import { StatsCard } from "@/features/executive/dashboard/stats-card"
import { DailyTargetAchievement } from "@/features/executive/dashboard/daily-target-achievement"
import { EfficiencyScoreCard } from "@/features/executive/dashboard/efficiency-score"
import { FleetInsightsCard } from "@/features/executive/dashboard/fleet-insights"
import { PerformanceTrendsChart } from "@/features/executive/dashboard/performance-trends"

interface ExecutiveDashboardProps {
  stats: DashboardStats[]
  dailyTarget: DailyTarget
  efficiencyScore: EfficiencyScore
  fleetInsights: FleetInsights[]
  performanceTrends: PerformancePeriodData  // ⭐ UBAH 2
}

const iconMap: Record<string, LucideIcon> = {
  Fuel,
  Gauge,
  AlertTriangle,
  TrendingUp,
  Navigation,
  ThermometerSun,
}

export default function ExecutiveDashboard({ 
  stats,
  dailyTarget,
  efficiencyScore,
  fleetInsights,
  performanceTrends
}: ExecutiveDashboardProps) {
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatsCard 
              key={index}
              icon={iconMap[stat.icon]}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendUp={stat.trendUp}
              subtitle={stat.subtitle}
              isAlert={stat.isAlert}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <DailyTargetAchievement target={dailyTarget} />
            <EfficiencyScoreCard score={efficiencyScore} />
          </div>

          {/* Right Column */}
          <FleetInsightsCard insights={fleetInsights} iconMap={iconMap} />
        </div>

        {/* Performance Trends */}
        <PerformanceTrendsChart trends={performanceTrends} />

      </div>
    </div>
  )
}