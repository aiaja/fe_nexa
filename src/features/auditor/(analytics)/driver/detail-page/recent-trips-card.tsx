'use client'

import { Navigation2, ChevronDown } from 'lucide-react'

interface Trip {
  date: string
  fleetId: string
  route: string
  distance: string
  fuelUsed: string
  duration: string
  status: string
}

interface RecentTripsProps {
  trips: Trip[]
  expanded: boolean
  onToggle: () => void
}

export default function RecentTripsCard({
  trips,
  expanded,
  onToggle
}: RecentTripsProps) {

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Completed': 'bg-green-50 text-green-700 border-green-200',
      'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
      'Delayed': 'bg-red-50 text-red-700 border-red-200',
      'Cancelled': 'bg-gray-50 text-gray-700 border-gray-200',
    }
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Navigation2 className="h-5 w-5 text-gray-600" />
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-900">Recent Trips</h2>
            <p className="text-sm text-gray-600">{trips.length} trips</p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-600 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Fleet ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Distance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Fuel Used</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {trips.length > 0 ? (
                trips.map((trip, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{trip.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{trip.fleetId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{trip.route}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{trip.distance}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{trip.fuelUsed}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{trip.duration}</td>

                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(trip.status)}`}>
                        {trip.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Navigation2 className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">No trips recorded</p>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  )
}
