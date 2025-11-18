"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, User, Phone, Mail, MapPin, Truck, Award, AlertTriangle } from 'lucide-react'
import { DriverData } from '@/interface/admin/driver'
import { EditDriverModal } from '../edit-modal'
import { DeleteConfirmationModal } from "@/components/delete-modal"
import { toast } from 'sonner'

interface DriverDetailProps {
  driver: DriverData | null
}

export default function DriverDetail({ driver: initialDriver }: DriverDetailProps) {
  const router = useRouter()
  const [driver, setDriver] = useState(initialDriver)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  if (!driver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Driver Not Found</h1>
        <button
          onClick={() => router.push('/admin/driver')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Driver Master
        </button>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    if (status === "Active") return "bg-green-100 text-green-700"
    if (status === "Under Review") return "bg-yellow-100 text-yellow-700"
    if (status === "Suspended") return "bg-red-100 text-red-700"
    if (status === "On Leave") return "bg-blue-100 text-blue-700"
    return "bg-gray-100 text-gray-700"
  }


  const getLicenseDescription = (license: string) => {
    const descriptions: Record<string, string> = {
      "A": "Motorcycle",
      "B1": "Light Vehicle (< 3,500 kg)",
      "B2": "Heavy Vehicle (> 3,500 kg)",
      "C": "Trailer & Articulated Vehicle"
    }
    return descriptions[license] || license
  }

  const getIncidentBadge = (count: number) => {
    if (count === 0) return { color: "bg-green-100 text-green-700", label: "No Incidents" }
    if (count <= 2) return { color: "bg-yellow-100 text-yellow-700", label: `${count} Incident${count > 1 ? 's' : ''}` }
    return { color: "bg-red-100 text-red-700", label: `${count} Incidents` }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const handleEditSuccess = (updatedDriver: DriverData) => {
    setDriver(updatedDriver)
    toast.success('Driver updated successfully!', {
      description: `${updatedDriver.id} - ${updatedDriver.name} has been updated`
    })
  }

  const handleDeleteConfirm = () => {
    toast.success('Driver deleted successfully!', {
      description: `${driver.id} has been removed from the system`
    })
    setTimeout(() => {
      router.push('/admin/driver')
    }, 500)
  }

  const incidentBadge = getIncidentBadge(driver.incident)

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">

        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => router.push('/admin/driver')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Driver Master</span>
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

       
        <div className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
                  <div className="lg:col-span-1">
                    {driver.photo ? (
                      <div className="rounded-lg aspect-square overflow-hidden border-2 border-gray-200">
                        <img src={driver.photo} alt={driver.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <User className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">No Photo Available</p>
                        </div>
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="mt-6 space-y-3">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Safety Record</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${incidentBadge.color}`}>
                            {incidentBadge.label}
                          </span>
                        </div>
                      </div>
                      
                      {driver.assignedTruck && (
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Truck className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Assigned Vehicle</span>
                          </div>
                          <p className="text-lg font-bold text-blue-700">{driver.assignedTruck}</p>
                        </div>
                      )}
                    </div>
                  </div>

                
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{driver.name}</h1>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">{driver.id}</span>
                        <span>•</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                          {driver.status}
                        </span>
                      </div>
                    </div>

                 
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                        <Award className="h-5 w-5 text-gray-600" />
                        License Information
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">SIM Number</p>
                          <p className="text-base font-medium text-gray-900">{driver.simNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">License Type</p>
                          <p className="text-base font-medium text-gray-900">
                            SIM {driver.license}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {getLicenseDescription(driver.license)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Contact Information
                      </h2>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            <Phone className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="text-base font-medium text-gray-900">{driver.phone}</p>
                          </div>
                        </div>
                        
                        {driver.email && (
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <Mail className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email Address</p>
                              <p className="text-base font-medium text-gray-900">{driver.email}</p>
                            </div>
                          </div>
                        )}
                        
                        {driver.address && (
                          <div className="flex items-start gap-3">
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <MapPin className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Address</p>
                              <p className="text-base font-medium text-gray-900">{driver.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Employment Details
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Join Date</p>
                          <p className="text-base font-medium text-gray-900">
                            {driver.joinDate ? formatDate(driver.joinDate) : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Incident Count</p>
                          <div className="flex items-center gap-2">
                            {driver.incident === 0 ? (
                              <>
                                <p className="text-base font-medium text-green-600">{driver.incident}</p>
                                <span className="text-xs text-green-600">Perfect Record</span>
                              </>
                            ) : (
                              <>
                                <p className={`text-base font-medium ${driver.incident > 2 ? "text-red-600" : "text-yellow-600"}`}>
                                  {driver.incident}
                                </p>
                                {driver.incident > 2 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditDriverModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        driver={driver}
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