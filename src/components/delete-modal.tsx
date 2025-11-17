"use client"

import { X } from 'lucide-react'

interface DeleteConfirmationModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  count: number
}

export function DeleteConfirmationModal({ 
  open, 
  onClose, 
  onConfirm, 
  count 
}: DeleteConfirmationModalProps) {
  if (!open) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <>
    
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      
     
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl w-full max-w-md z-50 p-6">
      
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <X className="h-8 w-8 text-red-600" strokeWidth={3} />
          </div>
        </div>


        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
          Confirm Deletion
        </h3>

        <p className="text-sm text-gray-600 text-center mb-6">
          Are you sure want to delete <span className="font-semibold">{count} selected</span>?
          <br />
          This action cannot to be undone.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}