"use client"

import { FileText, Edit, Ban, CheckCircle } from 'lucide-react'
import { UserData } from '@/interface/admin/user'

interface UserActionModalProps {
  open: boolean
  onClose: () => void
  data: UserData | null
  position: { top: number; left: number }
  onEditClick: (data: UserData) => void
  onViewActivity: (data: UserData) => void
  onToggleStatus: (data: UserData) => void
}

export function UserActionModal({ 
  open, 
  onClose, 
  data, 
  position, 
  onEditClick,
  onViewActivity,
  onToggleStatus
}: UserActionModalProps) {
  if (!open || !data) return null

  const isActive = data.status === 'Active'

  const handleEdit = () => {
    onEditClick(data)
    onClose()
  }

  const handleToggleStatus = () => {
    onToggleStatus(data)
    onClose()
  }

  const handleViewActivity = () => {
    onViewActivity(data)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[180px]"
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
          onClick={handleViewActivity}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <FileText className="h-4 w-4 text-gray-500" />
          View Activity
        </button>
        
        <button
          onClick={handleToggleStatus}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left"
        >
          {isActive ? (
            <>
              <Ban className="h-4 w-4 text-red-500" />
              <span className="text-red-600">Deactivate</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-green-600">Activate</span>
            </>
          )}
        </button>

        
      </div>
    </>
  )
}