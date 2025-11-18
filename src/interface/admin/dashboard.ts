export interface DashboardStats {
  icon: string 
  label: string
  value: string
  subtitle: string
  color: string
}

export interface ActivityLog {
  name: string
  role: string
  action: string
  time: string
}

export interface UserDistribution {
  role: string
  count: number
  color: string
  percentage: number
}

export interface ActivityTrend {
  hour: number
  value: number
}

export interface DailyTarget {
  percentage: number
  target: number
  status: string
}

export interface EfficiencyScore {
  score: number
  maxScore: number
  change: string
  changePositive: boolean
}

export interface FleetInsights {
  id: string
  icon: string
  iconColor: string
  title: string
  description: string
  action: string
}

export interface PerformanceTrend {
  hour: string
  value: number
  fleetCount: number
}

export interface PerformancePeriodData {
  today: PerformanceTrend[]
  yesterday: PerformanceTrend[]
  last7days: PerformanceTrend[]
}