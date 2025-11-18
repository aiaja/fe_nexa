// Single stat item
export interface DashboardStats {
  variant?: 'single'
  icon: string 
  label: string
  value: string
  subtitle: string
  color: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

// Split stat item (for Fleet & Driver)
export interface DashboardStatsSplit {
  variant: 'split'
  items: Array<{
    icon: string
    label: string
    value: string
    subtitle: string
    color: string
  }>
}

// Union type for both variants
export type DashboardStatsItem = DashboardStats | DashboardStatsSplit

export interface SystemAlert {
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  bgColor: string
  borderColor: string
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

export interface ChartDataPoint {
  label: string
  value: number
  fullLabel: string
}