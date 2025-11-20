import React from 'react'

interface FleetStatusBadgeProps {
  status: 'Normal' | 'Monitoring' | 'Under Watch' | 'Maintenance'
}

const statusConfig = {
  Normal: { bg: 'bg-green-100', text: 'text-green-700'},
  Monitoring: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Under Watch': { bg: 'bg-orange-100', text: 'text-orange-700' },
  Maintenance: { bg: 'bg-red-100', text: 'text-red-700'},
}

export default function FleetStatusBadge({ status }: FleetStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {status}
    </span>
  )
}
