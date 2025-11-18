import ExecutiveDashboard from "@/features/executive/page"
import { 
  dashboardStats,
  dailyTarget,
  efficiencyScore,
  fleetInsights,
  performanceTrendsData
} from "@/data/executive/dashboard"

export default function Page() {
  return (
    <ExecutiveDashboard 
      stats={dashboardStats}
      dailyTarget={dailyTarget}
      efficiencyScore={efficiencyScore}
      fleetInsights={fleetInsights}
      performanceTrends={performanceTrendsData}
    />
  )
}