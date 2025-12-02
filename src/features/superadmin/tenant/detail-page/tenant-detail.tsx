"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TenantWithCounts, Tenant } from '@/interface/superadmin/tenant'
import { EditTenantModal } from '../edit-modal'
import { DeleteConfirmationModal } from "@/components/delete-modal"
import { ChangePlanModal } from '../change-plan-modal'
import { TelemetryOverviewCard } from './telemetry-card'
import { TenantDetailHeader } from './header'
import { TenantLeftColumn } from './left'
import { TenantRightColumn } from './right'
import { toast } from 'sonner'

interface TenantDetailProps {
  tenant: TenantWithCounts | null
}

const STORAGE_KEY = 'tenants-data'

export default function TenantDetail({ tenant: initialTenant }: TenantDetailProps) {
  const router = useRouter()
  const [tenant, setTenant] = useState<TenantWithCounts | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Function untuk load data tenant dari localStorage
  const loadTenantData = () => {
    const tenantIdFromUrl = window.location.pathname.split('/').pop()
    
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        const tenants = parsedData.tenants || parsedData
        
        const foundTenant = tenants.find((t: TenantWithCounts) => 
          t.id === tenantIdFromUrl
        )
        
        if (foundTenant) {
          setTenant(foundTenant)
          return foundTenant
        }
      }
      
      // Fallback ke initialTenant jika tidak ada di localStorage
      if (initialTenant) {
        setTenant(initialTenant)
        return initialTenant
      }
      
      return null
    } catch (error) {
      console.error('Failed to load tenant from storage:', error)
      // Fallback ke initialTenant jika error
      if (initialTenant) {
        setTenant(initialTenant)
        return initialTenant
      }
      return null
    }
  }

  // Load data pertama kali saat component mount
  useEffect(() => {
    const loadedTenant = loadTenantData()
    setIsLoading(false)
    
    // Jika tidak ada tenant sama sekali
    if (!loadedTenant) {
      setIsLoading(false)
    }
  }, [])

  // Listen untuk perubahan dari tab/window lain
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadTenantData()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Listen untuk perubahan dari tab yang sama (custom event)
  useEffect(() => {
    const handleCustomUpdate = () => {
      loadTenantData()
    }

    window.addEventListener('tenantDataUpdated', handleCustomUpdate)
    return () => window.removeEventListener('tenantDataUpdated', handleCustomUpdate)
  }, [])

  // Listen ketika window kembali focus (switch tab)
  useEffect(() => {
    const handleFocus = () => {
      loadTenantData()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Function untuk update tenant di localStorage
  const updateTenantInStorage = (updatedTenant: TenantWithCounts) => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        const tenants = parsedData.tenants || parsedData
        
        const updatedTenants = tenants.map((t: TenantWithCounts) => 
          t.id === updatedTenant.id ? updatedTenant : t
        )
        
        const dataToSave = {
          tenants: updatedTenants,
          deletedIds: parsedData.deletedIds || []
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        
        // Update state lokal
        setTenant(updatedTenant)
        
        // Trigger event untuk memberitahu komponen lain
        window.dispatchEvent(new Event('tenantDataUpdated'))
      }
    } catch (error) {
      console.error('Failed to update tenant in storage:', error)
      toast.error("Failed to update data", {
        description: "Your changes may not persist"
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading tenant data...</p>
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Tenant Not Found</h1>
        <button
          onClick={() => router.push('/superadmin/tenants')}
          className="px-4 py-2 bg-[#0047AB] text-white rounded-lg hover:bg-[#003580]"
        >
          Back to Tenant Management
        </button>
      </div>
    )
  }

  const handleEditSuccess = (updatedTenant: Tenant) => {
    const updatedTenantWithCounts: TenantWithCounts = {
      ...updatedTenant,
      _count: tenant?._count || { 
        users: 0, 
        fleets: 0, 
        drivers: 0,
        zones: 0,
        routes: 0,
        transactions: 0,
        schedules: 0,
        telemetry: 0,
        incidents: 0,
        checkpoints: 0,
        notifications: 0
      },
      telemetryLogs: tenant?.telemetryLogs
    }
    
    updateTenantInStorage(updatedTenantWithCounts)
    
    toast.success('Tenant updated successfully!', {
      description: `${updatedTenant.company_name} has been updated`
    })
  }

  const handleChangePlanSuccess = (updatedTenant: Tenant) => {
    const updatedTenantWithCounts: TenantWithCounts = {
      ...updatedTenant,
      _count: tenant?._count || { 
        users: 0, 
        fleets: 0, 
        drivers: 0,
        zones: 0,
        routes: 0,
        transactions: 0,
        schedules: 0,
        telemetry: 0,
        incidents: 0,
        checkpoints: 0,
        notifications: 0
      },
      telemetryLogs: tenant?.telemetryLogs
    }
    
    updateTenantInStorage(updatedTenantWithCounts)
    
    toast.success('Plan changed successfully!', {
      description: `${updatedTenant.company_name} is now on ${updatedTenant.plan} plan`
    })
  }

  const handleDeleteConfirm = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        const updatedDeletedIds = [...(parsedData.deletedIds || []), tenant.id]
        
        const dataToSave = {
          tenants: parsedData.tenants || parsedData,
          deletedIds: updatedDeletedIds
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        
        window.dispatchEvent(new Event('tenantDataUpdated'))
      }
    } catch (error) {
      console.error('Failed to delete tenant:', error)
    }
    
    toast.success('Tenant deleted successfully!', {
      description: `${tenant.company_name} has been removed from the system`
    })
    setTimeout(() => {
      router.push('/superadmin/tenants')
    }, 500)
  }

  const handleToggleStatus = () => {
    const newStatus = tenant.tenantStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
    const updatedTenant: TenantWithCounts = {
      ...tenant,
      tenantStatus: newStatus,
      updatedAt: new Date().toISOString()
    }
    
    updateTenantInStorage(updatedTenant)
    
    toast.success(`Tenant ${newStatus === 'ACTIVE' ? 'activated' : 'suspended'} successfully!`, {
      description: `${tenant.company_name} is now ${newStatus.toLowerCase()}`
    })
  }

  const existingEmails: string[] = [] 

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TenantDetailHeader
          tenant={tenant}
          onBack={() => router.push('/superadmin/tenants')}
          onEdit={() => setIsEditOpen(true)}
          onDelete={() => setIsDeleteOpen(true)}
          onChangePlan={() => setIsChangePlanOpen(true)}
          onToggleStatus={handleToggleStatus}
        />

        <div className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <TenantLeftColumn tenant={tenant} />
                  <TenantRightColumn tenant={tenant} />
                </div>

                {tenant.telemetryLogs && tenant.telemetryLogs.total > 0 && (
                  <div className="mt-8">
                    <TelemetryOverviewCard telemetryData={tenant.telemetryLogs} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditTenantModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        tenant={tenant}
        onSuccess={handleEditSuccess}
        existingEmails={existingEmails}
      />

      <ChangePlanModal
        open={isChangePlanOpen}
        onClose={() => setIsChangePlanOpen(false)}
        tenant={tenant}
        onSuccess={handleChangePlanSuccess}
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