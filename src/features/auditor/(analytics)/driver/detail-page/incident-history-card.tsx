'use client'

import { AlertCircle, ChevronDown, AlertTriangle, AlertOctagon } from 'lucide-react'

interface Incident {
  id: string
  date: string
  type: string
  severity: string
  description: string
  resolution: string
}

interface IncidentHistoryProps {
  incidents: Incident[]
  expanded: boolean
  onToggle: () => void
}

export default function IncidentHistoryCard({
  incidents,
  expanded,
  onToggle
}: IncidentHistoryProps) {

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      CRITICAL: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-600' },
      HIGH: { bg: 'bg-orange-50', text: 'text-orange-700', icon: 'text-orange-600' },
      MEDIUM: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: 'text-yellow-600' },
      LOW: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-600' },
    }
    return colors[severity] || { bg: 'bg-gray-50', text: 'text-gray-700', icon: 'text-gray-600' }
  }

  const getSeverityIcon = (severity: string) => {
    if (severity === 'CRITICAL') return <AlertOctagon className="h-4 w-4" />
    if (severity === 'HIGH') return <AlertTriangle className="h-4 w-4" />
    return <AlertCircle className="h-4 w-4" />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-gray-600" />
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-900">Incident History</h2>
            <p className="text-sm text-gray-600">{incidents.length} incidents recorded</p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-600 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="divide-y divide-gray-200">
          {incidents.length > 0 ? (
            incidents.map((incident) => {
              const severityColor = getSeverityColor(incident.severity)
              return (
                <div
                  key={incident.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg mt-0.5 ${severityColor.bg}`}>
                        <div className={severityColor.icon}>
                          {getSeverityIcon(incident.severity)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {incident.type}
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">{incident.date}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${severityColor.bg} ${severityColor.text}`}
                    >
                      {incident.severity}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">
                    {incident.description}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Resolution:</p>
                    <p className="text-sm text-gray-900">{incident.resolution}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="px-6 py-12 text-center">
              <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">No incidents recorded</p>
              <p className="text-sm text-gray-500 mt-1">Perfect safety record!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
