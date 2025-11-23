"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, Building2, Mail, MapPin, Users, Truck, UserCircle, Calendar, CreditCard, ShieldAlert, CheckCircle } from 'lucide-react'
import { TenantWithCounts, Tenant } from '@/interface/superadmin/tenant'
import { EditTenantModal } from '../edit-modal'
import { DeleteConfirmationModal } from "@/components/delete-modal"
import { ChangePlanModal } from '../change-plan-modal'
import { toast } from 'sonner'

interface TenantDetailProps {
  tenant: TenantWithCounts | null
}

const STORAGE_KEY = 'tenants-data'

export default function TenantDetail({ tenant: initialTenant }: TenantDetailProps) {
  const router = useRouter()
  const [tenant, setTenant] = useState(initialTenant)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(!initialTenant)

  // Load from localStorage if tenant not found in initial props
  useEffect(() => {
    if (!initialTenant && typeof window !== 'undefined') {
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
          }
        }
      } catch (error) {
        console.error('Failed to load tenant from storage:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [initialTenant])

  // Update localStorage when tenant is edited
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
      }
    } catch (error) {
      console.error('Failed to update tenant in storage:', error)
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
          onClick={() => router.push('/superadmin/tenant')}
          className="px-4 py-2 bg-[#0047AB] text-white rounded-lg hover:bg-[#003580]"
        >
          Back to Tenant Management
        </button>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "bg-green-100 text-green-700"
    if (status === "TRIAL") return "bg-blue-100 text-blue-700"
    if (status === "SUSPENDED") return "bg-red-100 text-red-700"
    if (status === "EXPIRED") return "bg-orange-100 text-orange-700"
    if (status === "INACTIVE") return "bg-gray-100 text-gray-700"
    return "bg-gray-100 text-gray-700"
  }

  const getPlanColor = (plan: string) => {
    if (plan === "FREE") return "bg-gray-100 text-gray-700"
    if (plan === "STARTER") return "bg-blue-100 text-blue-700"
    if (plan === "BUSINESS") return "bg-purple-100 text-purple-700"
    if (plan === "ENTERPRISE") return "bg-amber-100 text-amber-700"
    return "bg-gray-100 text-gray-700"
  }

  const getPlanPrice = (plan: string) => {
    const prices: Record<string, string> = {
      "FREE": "$0/month",
      "STARTER": "$29/month",
      "BUSINESS": "$99/month",
      "ENTERPRISE": "$299/month"
    }
    return prices[plan] || "-"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const handleEditSuccess = (updatedTenant: Tenant) => {
    const updatedTenantWithCounts: TenantWithCounts = {
      ...updatedTenant,
      _count: tenant?._count || { users: 0, fleets: 0, drivers: 0 }
    }
    setTenant(updatedTenantWithCounts)
    updateTenantInStorage(updatedTenantWithCounts)
    toast.success('Tenant updated successfully!', {
      description: `${updatedTenant.company_name} has been updated`
    })
  }

  const handleChangePlanSuccess = (updatedTenant: TenantWithCounts) => {
    setTenant(updatedTenant)
    updateTenantInStorage(updatedTenant)
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
      }
    } catch (error) {
      console.error('Failed to delete tenant:', error)
    }
    
    toast.success('Tenant deleted successfully!', {
      description: `${tenant.company_name} has been removed from the system`
    })
    setTimeout(() => {
      router.push('/superadmin/tenant')
    }, 500)
  }

  const handleToggleStatus = () => {
    const newStatus = tenant.tenantStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
    const updatedTenant: TenantWithCounts = {
      ...tenant,
      tenantStatus: newStatus,
      updatedAt: new Date().toISOString()
    }
    
    setTenant(updatedTenant)
    updateTenantInStorage(updatedTenant)
    
    toast.success(`Tenant ${newStatus === 'ACTIVE' ? 'activated' : 'suspended'} successfully!`, {
      description: `${tenant.company_name} is now ${newStatus.toLowerCase()}`
    })
  }

  const existingEmails: string[] = [] // Will be populated from parent if needed

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => router.push('/superadmin/tenants')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Tenant Management</span>
            </button>

            <div className="flex items-center gap-2">
              {(tenant.tenantStatus === 'ACTIVE' || tenant.tenantStatus === 'SUSPENDED') && (
                <button
                  onClick={handleToggleStatus}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    tenant.tenantStatus === 'ACTIVE'
                      ? 'text-orange-600 bg-orange-50 border border-orange-200 hover:bg-orange-100'
                      : 'text-green-600 bg-green-50 border border-green-200 hover:bg-green-100'
                  }`}
                >
                  {tenant.tenantStatus === 'ACTIVE' ? (
                    <>
                      <ShieldAlert className="h-4 w-4" />
                      Suspend
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Activate
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => setIsChangePlanOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0047AB] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                Change Plan
              </button>
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

        {/* Main Content */}
        <div className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Stats */}
                  <div className="lg:col-span-1 space-y-4">
                    {/* Plan Card */}
                    <div className="bg-linear-to-br from-[#0047AB] to-[#003580] rounded-lg p-6 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="h-5 w-5" />
                        <span className="text-sm font-medium opacity-90">Current Plan</span>
                      </div>
                      <p className="text-2xl font-bold mb-1">{tenant.plan}</p>
                      <p className="text-sm opacity-75">{getPlanPrice(tenant.plan)}</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Total Users</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700">{tenant._count.users}</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Total Fleets</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-700">{tenant._count.fleets}</p>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCircle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-900">Total Drivers</span>
                      </div>
                      <p className="text-2xl font-bold text-amber-700">{tenant._count.drivers}</p>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{tenant.company_name}</h1>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{tenant.id}</span>
                        <span>•</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tenant.tenantStatus)}`}>
                          {tenant.tenantStatus}
                        </span>
                        <span>•</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(tenant.plan)}`}>
                          {tenant.plan}
                        </span>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-gray-600" />
                        Company Information
                      </h2>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            <Mail className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="text-base font-medium text-gray-900">{tenant.email}</p>
                          </div>
                        </div>
                        
                        {tenant.address && (
                          <div className="flex items-start gap-3">
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <MapPin className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Company Address</p>
                              <p className="text-base font-medium text-gray-900">{tenant.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Account Details */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        Account Details
                      </h2>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Created At</p>
                          <p className="text-base font-medium text-gray-900">
                            {formatDate(tenant.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                          <p className="text-base font-medium text-gray-900">
                            {formatDate(tenant.updatedAt)}
                          </p>
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