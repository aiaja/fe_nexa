"use client"

import { useRouter } from 'next/navigation'
import { Eye, Edit, Ban, CheckCircle } from 'lucide-react'

interface ActionModalProps<T> {
  open: boolean
  onClose: () => void
  data: T | null
  position: { top: number; left: number }
  onEditClick: (data: T) => void
  detailPath: string 
  idKey?: keyof T
  // Optional toggle status functionality
  onToggleStatus?: (data: T) => void
  statusKey?: keyof T
  activeStatusValue?: string
}

export function ActionModal<T extends Record<string, any>>({ 
  open, 
  onClose, 
  data, 
  position, 
  onEditClick,
  detailPath,
  idKey = 'id' as keyof T,
  onToggleStatus,
  statusKey = 'status' as keyof T,
  activeStatusValue = 'Active'
}: ActionModalProps<T>) {
  const router = useRouter()
  
  if (!open || !data) return null

  const isActive = statusKey && data[statusKey] === activeStatusValue

  const handleEdit = () => {
    onEditClick(data)
    onClose()
  }

  const handleDetail = () => {
    const id = data[idKey]
    router.push(`${detailPath}/${id}`)
    onClose()
  }

  const handleToggleStatus = () => {
    if (onToggleStatus) {
      onToggleStatus(data)
      onClose()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Modal */}
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[180px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Edit className="h-4 w-4 text-gray-500" />
          Edit Data
        </button>
        
        {/* Detail Button */}
        <button
          onClick={handleDetail}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Eye className="h-4 w-4 text-gray-500" />
          Detail Data
        </button>

        {/* Conditional Toggle Status Button */}
        {onToggleStatus && (
          <button
            onClick={handleToggleStatus}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left"
          >
            {isActive ? (
              <>
                <Ban className="h-4 w-4 text-red-500" />
                <span className="text-red-600">Suspend</span>
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