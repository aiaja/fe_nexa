import { MapPin, LucideIcon } from 'lucide-react'
import { FleetInsights } from "@/interface/executive/dashboard"

interface FleetInsightsProps {
  insights: FleetInsights[]
  iconMap: Record<string, LucideIcon>
}

export function FleetInsightsCard({ insights, iconMap }: FleetInsightsProps) {
  return (
    <div className="rounded-lg border bg-blue-50 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Fleet Insights</h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.icon] || MapPin
          return (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 ${insight.iconColor} shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1 text-gray-900">{insight.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                  <button className="text-xs text-blue-600 font-medium hover:text-blue-700">
                    {insight.action} →
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <button className="w-full mt-4 text-sm text-blue-600 font-medium hover:text-blue-700">
        View All Recommendations (8)
      </button>
    </div>
  )
}