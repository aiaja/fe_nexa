import ExecutiveDashboard from "@/features/executive/page"
import { 
  dashboardStats,
  dailyTarget,
  efficiencyScore,
  fleetInsights,
  performanceTrends
} from "@/data/executive/dashboard"

export default function Page() {
  return (
    <ExecutiveDashboard 
      stats={dashboardStats}
      dailyTarget={dailyTarget}
      efficiencyScore={efficiencyScore}
      fleetInsights={fleetInsights}
      performanceTrends={performanceTrends}
    />
  )
}