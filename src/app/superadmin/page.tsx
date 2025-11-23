import SuperAdminDashboard from "@/features/superadmin/page"
import { 
  dashboardMetrics,  
  subscriptionPlans, 
  tenantStatuses 
} from "@/data/superadmin/dashboard"

export default function Page() {
  return (
    <SuperAdminDashboard 
      metrics={dashboardMetrics}
      plans={subscriptionPlans}
      statuses={tenantStatuses}
    />
  )
}