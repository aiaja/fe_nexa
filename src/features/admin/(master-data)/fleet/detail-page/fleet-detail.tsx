"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, ImageIcon } from 'lucide-react'
import { FleetData } from '@/interface/admin/fleet'
import { EditFleetModal } from '../edit-modal'
import { DeleteConfirmationModal } from "@/components/delete-modal"
import { toast } from 'sonner'

interface FleetDetailProps {
  fleet: FleetData | null
  fleetId: string
}

const STORAGE_KEY = 'fleets-data'

export default function FleetDetail({ fleet: initialFleet, fleetId }: FleetDetailProps) {
  const router = useRouter()
  const [fleet, setFleet] = useState<FleetData | null>(initialFleet)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(!initialFleet)

  useEffect(() => {
    if (!initialFleet) {
      loadFleetFromStorage()
    } else {
      // Jika initialFleet ada, coba cek apakah ada data terbaru di localStorage
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          const fleets = parsedData.fleets || parsedData
          const deletedIds = parsedData.deletedIds || []
          
          const foundFleet = fleets.find((f: FleetData) => 
            f.fleetID === initialFleet.fleetID && !deletedIds.includes(f.id)
          )
          
          if (foundFleet) {
            setFleet(foundFleet)
          }
        } catch (error) {
          console.error('Failed to sync with storage:', error)
        }
      }
    }
  }, [fleetId, initialFleet])

  const loadFleetFromStorage = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        const fleets = parsedData.fleets || parsedData
        const deletedIds = parsedData.deletedIds || []
        
        const foundFleet = fleets.find((f: FleetData) => 
          f.fleetID === fleetId && !deletedIds.includes(f.id)
        )
        
        if (foundFleet) {
          setFleet(foundFleet)
          console.log('Fleet loaded from storage:', foundFleet)
          console.log('Fleet photo:', foundFleet.photo ? 'Available' : 'Not available')
        } else {
          console.log('Fleet not found in storage for ID:', fleetId)
        }
      }
    } catch (error) {
      console.error('Failed to load fleet from storage:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveFleetToStorage = (updatedFleet: FleetData) => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        const fleets = parsedData.fleets || parsedData
        const deletedIds = parsedData.deletedIds || []
        
        const updatedFleets = fleets.map((f: FleetData) => 
          f.id === updatedFleet.id ? updatedFleet : f
        )
        
        const dataToSave = {
          fleets: updatedFleets,
          deletedIds: deletedIds
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      }
    } catch (error) {
      console.error('Failed to save fleet to storage:', error)
    }
  }

  const deleteFleetFromStorage = (fleetIdToDelete: string) => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        const fleets = parsedData.fleets || parsedData
        const deletedIds = parsedData.deletedIds || []
        
        const fleetToDelete = fleets.find((f: FleetData) => f.fleetID === fleetIdToDelete)
        
        if (fleetToDelete) {
          const updatedDeletedIds = [...deletedIds, fleetToDelete.id]
          
          const dataToSave = {
            fleets: fleets,
            deletedIds: updatedDeletedIds
          }
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        }
      }
    } catch (error) {
      console.error('Failed to delete fleet from storage:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading fleet data...</p>
      </div>
    )
  }

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

  const handleEditSuccess = (updatedFleet: FleetData) => {
    setFleet(updatedFleet)
    saveFleetToStorage(updatedFleet)
    toast.success('Fleet updated successfully!', {
      description: `${updatedFleet.fleetID} - ${updatedFleet.licensePlate} has been updated`
    })
  }

  const handleDeleteConfirm = () => {
    deleteFleetFromStorage(fleet.fleetID)
    toast.success('Fleet deleted successfully!', {
      description: `${fleet.fleetID} has been removed from the system`
    })
    setTimeout(() => {
      router.push('/admin/fleet')
    }, 500)
  }

  // Debug: Log fleet data
  console.log('Current fleet data:', fleet)
  console.log('Fleet photo exists:', !!fleet.photo)
  console.log('Fleet photo value:', fleet.photo)

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
                  {/* Photo Section */}
                  <div className="lg:col-span-1">
                    {fleet.photo && fleet.photo.trim() !== '' ? (
                      <div className="rounded-lg aspect-square overflow-hidden border-2 border-gray-200">
                        <img 
                          src={fleet.photo} 
                          alt={fleet.fleetID} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', fleet.photo)
                            e.currentTarget.style.display = 'none'
                            const parent = e.currentTarget.parentElement
                            if (parent) {
                              parent.innerHTML = `
                                <div class="bg-gray-100 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 w-full h-full">
                                  <div class="text-center">
                                    <p class="text-sm text-gray-500">Image Load Error</p>
                                  </div>
                                </div>
                              `
                            }
                          }}
                        />
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

                  {/* Details Section */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{fleet.fleetID}</h1>
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
                          <p className="text-sm text-gray-500 mb-1">License Plate</p>
                          <p className="text-base font-medium text-gray-900">{fleet.licensePlate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Brand</p>
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