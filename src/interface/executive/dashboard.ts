export interface DashboardStats {
  icon: string  
  label: string
  value: string
  trend?: string | null  
  trendUp?: boolean 
  subtitle?: string  
  isAlert?: boolean
  clickable?: boolean      
  href?: string 
}

export interface DailyTarget {
  percentage: number  
  target: number
  status: "On track" | "At risk" | "Behind" 
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
  fleetCount?: number  
}

export type PeriodType = "today" | "yesterday" | "last7days"  