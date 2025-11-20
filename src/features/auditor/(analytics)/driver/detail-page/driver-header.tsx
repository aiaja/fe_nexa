'use client'

import { ArrowLeft, TrendingUp, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DriverHeaderProps {
  name: string
  driverId: string
  riskScore: number
  joinDate: string
  onBack?: () => void 
}

export default function DriverHeader({ name, driverId, riskScore, joinDate }: DriverHeaderProps) {
  const router = useRouter()

  const getRiskLevelColor = (score: number) => {
    if (score >= 75) return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Critical' }
    if (score >= 60) return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: 'High' }
    if (score >= 45) return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: 'Medium' }
    return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Low' }
  }

  const riskLevel = getRiskLevelColor(riskScore)

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Driver Analytics</span>
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-1">{name}</h1>
            <p className="text-sm text-gray-600">Driver ID: {driverId}</p>
          </div>
          
          <div className={`rounded-xl px-4 py-3 border ${riskLevel.bg} ${riskLevel.border}`}>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className={`h-4 w-4 ${riskLevel.text}`} />
              <span className={`text-xs font-medium ${riskLevel.text}`}>Risk Level: {riskLevel.label}</span>
            </div>
            <p className={`text-2xl font-bold ${riskLevel.text}`}>{riskScore}</p>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <span>Joined: {joinDate}</span>
        </div>
      </div>
    </div>
  )
}
