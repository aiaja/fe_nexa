export interface DashboardStats {
  icon: string  
  label: string
  value: string
  trend?: string | null  
  trendUp?: boolean 
  subtitle?: string  
  isAlert?: boolean  
}

export interface DailyTarget{
  percentage: number  
  target: number
  status: string 
}

export interface EfficiencyScore{
  score: number  
  maxScore: number
  change: string 
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
}