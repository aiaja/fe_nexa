export interface DashboardStats {
  icon: string 
  label: string
  value: string
  subtitle: string
  color: string
}

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