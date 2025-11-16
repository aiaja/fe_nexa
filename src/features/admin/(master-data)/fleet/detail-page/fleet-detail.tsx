"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, ImageIcon } from 'lucide-react'
import { FleetData } from '@/interface/admin/fleet'
import { EditFleetModal } from '../edit-modal'
import { DeleteConfirmationModal } from '../delete-modal'
import { toast } from 'sonner'

interface FleetDetailProps {
  fleet: FleetData | null
}

export default function FleetDetail({ fleet: initialFleet }: FleetDetailProps) {
  const router = useRouter()
  const [fleet, setFleet] = useState(initialFleet)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  if (!fleet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Fleet Not Found</h1>
        <button
          onClick={() => router.push('/admin/fleet')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Fleet Master
        </button>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    if (status === "Active") return "bg-green-100 text-green-700"
    if (status === "Under Review") return "bg-yellow-100 text-yellow-700"
    if (status === "Maintenance") return "bg-orange-100 text-orange-700"
    if (status === "Inactive") return "bg-gray-100 text-gray-700"
    return "bg-gray-100 text-gray-700"
  }

  const getStatusIcon = (status: string) => {
    if (status === "Active") return "🟢"
    if (status === "Under Review") return "🟡"
    if (status === "Maintenance") return "🟠"
    if (status === "Inactive") return "⚫"
    return "⚫"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const handleEditSuccess = (updatedFleet: FleetData) => {
    setFleet(updatedFleet)
    toast.success('Fleet updated successfully!', {
      description: `${updatedFleet.id} - ${updatedFleet.plateNumber} has been updated`
    })
  }

  const handleDeleteConfirm = () => {
    toast.success('Fleet deleted successfully!', {
      description: `${fleet.id} has been removed from the system`
    })
    setTimeout(() => {
      router.push('/admin/fleet')
    }, 500)
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => router.push('/admin/fleet')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Fleet Master</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: Photo */}
                  <div className="lg:col-span-1">
                    {fleet.photo ? (
                      <div className="rounded-lg aspect-square overflow-hidden border-2 border-gray-200">
                        <img src={fleet.photo} alt={fleet.id} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">No Photo Available</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Fleet Details Header */}
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{fleet.id}</h1>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">{fleet.type}</span>
                        <span>•</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(fleet.status)}`}>
                          {fleet.status}
                        </span>
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Vehicle Information
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Plate Number</p>
                          <p className="text-base font-medium text-gray-900">{fleet.plateNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Brands</p>
                          <p className="text-base font-medium text-gray-900">{fleet.brands}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Model</p>
                          <p className="text-base font-medium text-gray-900">{fleet.model}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Year</p>
                          <p className="text-base font-medium text-gray-900">{fleet.year}</p>
                        </div>
                      </div>
                    </div>

                    {/* Purchase Details */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Purchase Details
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Purchase Date</p>
                          <p className="text-base font-medium text-gray-900">
                            {fleet.purchaseDate ? formatDate(fleet.purchaseDate) : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Initial Mileage</p>
                          <p className="text-base font-medium text-gray-900">
                            {fleet.initialMileage !== undefined ? `${fleet.initialMileage.toLocaleString()} km` : '0 km'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Operational Status */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Operational Status
                      </h2>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getStatusIcon(fleet.status)}</span>
                        <span className="text-lg font-medium text-gray-900">{fleet.status}</span>
                      </div>
                      <p className="text-sm text-gray-500">Last Updated: 2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditFleetModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        fleet={fleet}
        onSuccess={handleEditSuccess}
      />

      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        count={1}
      />
    </>
  )
}