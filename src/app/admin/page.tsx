import SuperAdminDashboard from "@/features/admin/page"
import { 
  dashboardStats,  
  activityLogs, 
  userDistribution,
  activityTrends 
} from "@/data/admin/dashboard"

export default function Page() {
  return (
    <SuperAdminDashboard 
      stats={dashboardStats}
      logs={activityLogs}
      distribution={userDistribution}
      trends={activityTrends}
    />
  )
}