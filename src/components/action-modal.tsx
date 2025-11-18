"use client"

import { useRouter } from 'next/navigation'
import { Eye, Edit } from 'lucide-react'

interface ActionModalProps<T> {
  open: boolean
  onClose: () => void
  data: T | null
  position: { top: number; left: number }
  onEditClick: (data: T) => void
  detailPath: string 
  idKey?: keyof T 
}

export function ActionModal<T extends Record<string, any>>({ 
  open, 
  onClose, 
  data, 
  position, 
  onEditClick,
  detailPath,
  idKey = 'id' as keyof T
}: ActionModalProps<T>) {
  const router = useRouter()
  
  if (!open || !data) return null

  const handleEdit = () => {
    onEditClick(data)
    onClose()
  }

  const handleDetail = () => {
    const id = data[idKey]
    router.push(`${detailPath}/${id}`)
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
          Edit Data
        </button>
        
        <button
          onClick={handleDetail}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Eye className="h-4 w-4 text-gray-500" />
          Detail Data
        </button>
      </div>
    </>
  )
}