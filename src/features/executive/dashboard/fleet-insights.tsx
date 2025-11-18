"use client"

import { Bot, Pause, Map, Thermometer, LucideIcon } from 'lucide-react'
import { FleetInsights } from "@/interface/executive/dashboard"

interface FleetInsightsProps {
  insights: FleetInsights[]
  iconMap: Record<string, LucideIcon>
}

export function FleetInsightsCard({ insights, iconMap }: FleetInsightsProps) {
  
  // Map icon names to better matching Lucide icons
  const getIcon = (iconName: string): LucideIcon => {
    const betterIconMap: Record<string, LucideIcon> = {
      'TrendingUp': Pause,      // For idle alert
      'Navigation': Map,         // For route optimization  
      'ThermometerSun': Thermometer // For temperature
    }
    return betterIconMap[iconName] || iconMap[iconName] || Map
  }
  
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header with AI Icon - Simple style */}
      <div className="flex items-center gap-2 mb-2">
        <Bot className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Fleet Insights</h3>
      </div>
      
      {/* Subtitle */}
      <p className="text-sm text-gray-600 mb-6">
        Automated recommendations based on audit data
      </p>
      
      {/* Insights Cards */}
      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = getIcon(insight.icon)
          
          return (
            <div 
              key={insight.id} 
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`p-2 rounded-lg ${
                  insight.iconColor.includes('yellow') ? 'bg-yellow-50' :
                  insight.iconColor.includes('blue') ? 'bg-blue-50' :
                  insight.iconColor.includes('red') ? 'bg-red-50' :
                  'bg-gray-50'
                }`}>
                  <Icon className={`h-5 w-5 ${insight.iconColor} shrink-0`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1 text-gray-900">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {insight.description}
                  </p>
                  
                  {/* Action Button */}
                  <button className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700 hover:gap-2 transition-all">
                    <span>{insight.action}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* View All Button */}
      <button className="w-full mt-4 py-2.5 text-sm text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
        View All Recommendations (8)
      </button>
    </div>
  )
}