"use client"

import { useState } from 'react'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DriverDetail } from '@/interface/auditor/driveranalytics'
import DriverHeader from './driver-header'
import PerformanceMetrics from './performance-metrics'
import IncidentHistoryCard from './incident-history-card'
import RecentTripsCard from './recent-trips-card'

interface DriverDetailPageProps {
  driver: DriverDetail
}

export default function DriverDetailPage({ driver }: DriverDetailPageProps) {
  const router = useRouter()
  const [expandedSection, setExpandedSection] = useState<string | null>('metrics')

  const getRiskLevelColor = (riskScore: number) => {
    if (riskScore >= 75) return 'bg-red-100 text-red-700 border-red-200'
    if (riskScore >= 60) return 'bg-orange-100 text-orange-700 border-orange-200'
    if (riskScore >= 45) return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    return 'bg-green-100 text-green-700 border-green-200'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700'
      case 'HIGH':
        return 'bg-orange-100 text-orange-700'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700'
      case 'LOW':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DriverHeader 
        name={driver.name}
        driverId={driver.driverId}
        riskScore={driver.riskScore}
        joinDate={driver.joinDate}
        onBack={() => router.push('/auditor/driver')}
      />

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Performance Metrics */}
          <PerformanceMetrics metrics={driver.performanceMetrics} />

          {/* Incident History */}
          <IncidentHistoryCard incidents={driver.incidentHistory} expanded={expandedSection === 'incidents'} onToggle={() => setExpandedSection(expandedSection === 'incidents' ? null : 'incidents')} />

          {/* Recent Trips */}
          <RecentTripsCard trips={driver.recentTrips} expanded={expandedSection === 'trips'} onToggle={() => setExpandedSection(expandedSection === 'trips' ? null : 'trips')} />
        </div>
      </div>
    </div>
  )
}
