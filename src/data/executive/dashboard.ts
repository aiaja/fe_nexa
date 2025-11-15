import { 
  DashboardStats, DailyTarget, 
  EfficiencyScore, FleetInsights, 
  PerformanceTrend

} from "@/interface/executive/dashboard"

export const dashboardStats: DashboardStats[] = [
  { icon: "Fuel", label: "Total Fuel Usage", value: "12.500 L", trend: "+3.2%", trendUp: true },
  { icon: "Gauge", label: "Fuel Efficiency Rasio", value: "2,5 L/ton", subtitle: "Target: 2.3 L/ton", trend: null },
  { icon: "AlertTriangle", label: "Active Critical Alerts", value: "3",  subtitle: "Requires immediate action", isAlert: true  },
]

export const dailyTarget: DailyTarget = { percentage: 45, target: 100, status: "On track"}


export const efficiencyScore: EfficiencyScore = { score: 78, maxScore: 100, change: "+8 pts today"} 


export const fleetInsights: FleetInsights[] = [
  { id: "T-012", icon: "TrendingUp", iconColor: "text-yellow-600", title: "T-012 started idling 5 min", description: "Currently at checkpoint C - wasting fuel", action: "Investigate" },
  { id: "route-opt", icon: "Navigation", iconColor: "text-blue-600", title: "Route optimization", description: "Save 12% by taking Route D (active congestion on Route B)", action: "Investigate"},
  { id: "T-007", icon: "ThermometerSun", iconColor: "text-red-600", title: "T-007 engine temperature alert", description: "Current: 95°C | Normal: 85°C - Investigate soon", action: "Investigate" }
]

export const performanceTrends: PerformanceTrend[] = [
  { hour: "00:00", value: 20 },  
  { hour: "04:00", value: 35 },
  { hour: "08:00", value: 60 },
  { hour: "12:00", value: 95 },
  { hour: "16:00", value: 75 },
  { hour: "20:00", value: 50 }
]