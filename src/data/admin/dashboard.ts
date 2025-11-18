import { 
  DashboardStatsItem,
  SystemAlert, 
  ActivityLog, 
  UserDistribution,
  ActivityTrend 
} from "@/interface/admin/dashboard"

export const dashboardStats: DashboardStatsItem[] = [
  // Single stat - Total User with trend
  { 
    variant: 'single',
    icon: "Users", 
    label: "Total User", 
    value: "84", 
    subtitle: "Data Overview", 
    color: "text-blue-600",
    trend: {
      value: "+5 this month",
      isPositive: true
    }
  },
  
  // Split stat - Fleet & Driver combined
  {
    variant: 'split',
    items: [
      {
        icon: "Truck",
        label: "Total Fleet",
        value: "63",
        subtitle: "Trucks",
        color: "text-orange-600"
      },
      {
        icon: "UserCircle",
        label: "Total Driver",
        value: "55",
        subtitle: "Drivers",
        color: "text-purple-600"
      }
    ]
  }
]

export const systemAlerts: SystemAlert[] = [
  { 
    title: "System Update", 
    message: "Scheduled maintenance tonight at 11 PM",
    type: "info",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  { 
    title: "Performance Excellent", 
    message: "All systems operating optimally",
    type: "success",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
]

export const activityLogs: ActivityLog[] = [
  { name: "Amanda Wan", role: "Supervisor", action: "Logged in to system", time: "22:02" },
  { name: "Lisa Lim", role: "Supervisor", action: "Downloaded October 2024 Monthly Summary Report", time: "21:45" },
  { name: "Robert Kim", role: "Auditor", action: "Logged in to system", time: "21:30" },
  { name: "Sarah Micel", role: "Manager", action: "Updated driver DRV-001 schedule", time: "20:15" },
  { name: "Sarah Micel", role: "Manager", action: "Logged in to system", time: "20:15" },
  { name: "Lisa Lim", role: "Supervisor", action: "Logged in to system", time: "21:45" },
]

export const userDistribution: UserDistribution[] = [
  { role: "SuperAdmin", count: 3, color: "#10b981", percentage: 3.8 },
  { role: "Auditor", count: 43, color: "#3b82f6", percentage: 55.1 },
  { role: "Manager", count: 28, color: "#6366f1", percentage: 35.9 },
  { role: "Supervisor", count: 10, color: "#f59e0b", percentage: 5.2 },
]

export const activityTrends: ActivityTrend[] = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  value: Math.floor(Math.random() * 40) + 20
}))

// Mock data generators for different periods
export const generateTodayData = (baseData: ActivityTrend[]): ActivityTrend[] => {
  return baseData
}

export const generateYesterdayData = (baseData: ActivityTrend[]): ActivityTrend[] => {
  return baseData.map(t => ({
    ...t,
    value: Math.max(10, t.value - Math.floor(Math.random() * 10))
  }))
}

export const generateLast7DaysData = (): { day: string; fullDay: string; value: number }[] => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const fullDaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  return daysOfWeek.map((day, index) => ({
    day,
    fullDay: fullDaysOfWeek[index],
    value: Math.floor(Math.random() * 200) + 150 
  }))
}