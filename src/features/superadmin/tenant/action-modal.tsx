"use client"

import { Edit, Eye, CreditCard, ShieldAlert, CheckCircle } from 'lucide-react'
import { TenantWithCounts } from '@/interface/superadmin/tenant'

interface TenantActionModalProps {
  open: boolean
  onClose: () => void
  data: TenantWithCounts | null
  position: { top: number; left: number }
  onEditClick: (data: TenantWithCounts) => void
  onViewDetails: (data: TenantWithCounts) => void
  onChangePlan: (data: TenantWithCounts) => void
  onToggleStatus: (data: TenantWithCounts) => void
}

export function TenantActionModal({ 
  open, 
  onClose, 
  data, 
  position, 
  onEditClick,
  onViewDetails,
  onChangePlan,
  onToggleStatus
}: TenantActionModalProps) {
  if (!open || !data) return null

  const isActive = data.tenantStatus === 'ACTIVE'
  const isSuspended = data.tenantStatus === 'SUSPENDED'
  const canToggle = isActive || isSuspended

  const handleEdit = () => {
    onEditClick(data)
    onClose()
  }

  const handleViewDetails = () => {
    onViewDetails(data)
    onClose()
  }

  const handleChangePlan = () => {
    onChangePlan(data)
    onClose()
  }

  const handleToggleStatus = () => {
    onToggleStatus(data)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[200px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <button
          onClick={handleEdit}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Edit className="h-4 w-4 text-gray-500" />
          Edit
        </button>

        <button
          onClick={handleViewDetails}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Eye className="h-4 w-4 text-gray-500" />
          View Details
        </button>

        <button
          onClick={handleChangePlan}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <CreditCard className="h-4 w-4 text-gray-500" />
          Change Plan
        </button>

        <div className="border-t my-1" />
        
        {canToggle && (
          <button
            onClick={handleToggleStatus}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left"
          >
            {isActive ? (
              <>
                <ShieldAlert className="h-4 w-4 text-orange-500" />
                <span className="text-orange-600">Suspend</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Activate</span>
              </>
            )}
          </button>
        )}
      </div>
    </>
  )
}