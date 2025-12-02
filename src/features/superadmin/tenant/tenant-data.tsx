"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Tenant, TenantWithCounts } from "@/interface/superadmin/tenant"
import { FilterPopover, FilterValues } from "./filter-popover"
import { DeleteConfirmationModal } from "@/components/delete-modal"
import { AddTenantModal } from "./add-modal"
import { EditTenantModal } from "./edit-modal"
import { TenantActionModal } from "./action-modal"
import { ChangePlanModal } from "./change-plan-modal"

interface TenantManagementProps {
  tenantItems: TenantWithCounts[]
}

const STORAGE_KEY = 'tenants-data'

export default function TenantManagement({ tenantItems: initialTenantItems }: TenantManagementProps) {
  const router = useRouter()
  const [tenantItems, setTenantItems] = useState<TenantWithCounts[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<TenantWithCounts | null>(null)
  const [selectedRows, setSelectedRows] = useState<TenantWithCounts[]>([])
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 })
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
    plans: []
  })

  useEffect(() => {
    loadTenantsData()
  }, [])

  const loadTenantsData = () => {
    setIsLoading(true)
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        
        if (parsedData.tenants && Array.isArray(parsedData.tenants)) {
          setTenantItems(parsedData.tenants)
          setDeletedIds(parsedData.deletedIds || [])
        } else {
          setTenantItems(parsedData)
        }
      } else {
        setTenantItems(initialTenantItems)
        saveToStorage(initialTenantItems, [])
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      setTenantItems(initialTenantItems)
      saveToStorage(initialTenantItems, [])
    } finally {
      setIsLoading(false)
    }
  }

  const saveToStorage = (updatedTenants: TenantWithCounts[], updatedDeletedIds?: string[]) => {
    try {
      const dataToSave = {
        tenants: updatedTenants,
        deletedIds: updatedDeletedIds !== undefined ? updatedDeletedIds : deletedIds
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      
      // Dispatch event agar halaman detail tau ada perubahan
      window.dispatchEvent(new Event('tenantDataUpdated'))
    } catch (error) {
      console.error('Failed to save to storage:', error)
      toast.error("Failed to save data", {
        description: "Your changes may not persist after refresh"
      })
    }
  }

  const activeTenantItems = useMemo(() => {
    return tenantItems.filter(item => !deletedIds.includes(item.id))
  }, [tenantItems, deletedIds])

  const existingEmails = useMemo(() => 
    activeTenantItems.map(t => t.email.toLowerCase()), 
    [activeTenantItems]
  )

  const filteredData = useMemo(() => {
    let result = activeTenantItems

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(tenant =>
        tenant.id.toLowerCase().includes(query) ||
        tenant.company_name.toLowerCase().includes(query) ||
        tenant.email.toLowerCase().includes(query)
      )
    }

    if (filters.statuses && filters.statuses.length > 0) {
      result = result.filter(tenant => filters.statuses.includes(tenant.tenantStatus))
    }

    if (filters.plans && filters.plans.length > 0) {
      result = result.filter(tenant => filters.plans.includes(tenant.plan))
    }

    return result
  }, [activeTenantItems, searchQuery, filters])

  const handleActionClick = (tenant: TenantWithCounts, position: { top: number; left: number }) => {
    setSelectedTenant(tenant)
    setActionPosition(position)
    setIsActionOpen(true)
  }

  const handleEditClick = (tenant: TenantWithCounts) => {
    setSelectedTenant(tenant)
    setIsEditOpen(true)
  }

  const handleViewDetails = (tenant: TenantWithCounts) => {
    router.push(`/superadmin/tenants/${tenant.id}`)
  }

  const handleChangePlan = (tenant: TenantWithCounts) => {
    setSelectedTenant(tenant)
    setIsChangePlanOpen(true)
  }

  const handleToggleStatus = (tenant: TenantWithCounts) => {
    const newStatus: 'ACTIVE' | 'SUSPENDED' = tenant.tenantStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
    
    const updatedTenants: TenantWithCounts[] = tenantItems.map(t => 
      t.id === tenant.id 
        ? { ...t, tenantStatus: newStatus, updatedAt: new Date().toISOString() }
        : t
    )
    
    setTenantItems(updatedTenants)
    saveToStorage(updatedTenants)
    
    toast.success(`Tenant ${newStatus === 'ACTIVE' ? 'activated' : 'suspended'} successfully!`, {
      description: `${tenant.company_name} is now ${newStatus.toLowerCase()}`
    })
  }

  const handleSelectionChange = (rows: TenantWithCounts[]) => {
    setSelectedRows(rows)
  }

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return
    setIsDeleteOpen(true)
  }

  const handleConfirmDelete = () => {
    const idsToDelete = selectedRows.map(row => row.id)
    const count = idsToDelete.length

    const updatedDeletedIds = [...deletedIds, ...idsToDelete]
    setDeletedIds(updatedDeletedIds)
    setSelectedRows([])

    saveToStorage(tenantItems, updatedDeletedIds)

    toast.success(`${count} tenant${count > 1 ? "s" : ""} deleted successfully!`, {
      description: `${count} tenant${count > 1 ? "s have" : " has"} been removed from the system`
    })
  }

  const handleAddSuccess = (newTenant: Tenant) => {
    const newTenantWithCounts: TenantWithCounts = {
      ...newTenant,
      _count: {
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
      }
    }
    
    const updatedTenants = [...tenantItems, newTenantWithCounts]
    setTenantItems(updatedTenants)
    saveToStorage(updatedTenants)
    
    toast.success("Tenant added successfully!", {
      description: `${newTenant.company_name} has been added to the system`
    })
  }

  const handleEditSuccess = (updatedTenant: Tenant) => {
    const updatedTenants: TenantWithCounts[] = tenantItems.map(tenant => 
      tenant.id === updatedTenant.id 
        ? { ...tenant, ...updatedTenant } as TenantWithCounts
        : tenant
    )
    setTenantItems(updatedTenants)
    saveToStorage(updatedTenants)
    
    toast.success("Tenant updated successfully!", {
      description: `${updatedTenant.company_name} has been updated`
    })
  }

  const handleChangePlanSuccess = (updatedTenant: Tenant) => {
    const updatedTenants: TenantWithCounts[] = tenantItems.map(tenant => 
      tenant.id === updatedTenant.id 
        ? { ...tenant, ...updatedTenant } as TenantWithCounts
        : tenant
    )
    setTenantItems(updatedTenants)
    saveToStorage(updatedTenants)
    
    toast.success("Plan changed successfully!", {
      description: `${updatedTenant.company_name} is now on ${updatedTenant.plan} plan`
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading tenants data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Tenant Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by Company Name, Email, or ID"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 focus-visible:ring-0 focus-visible:border-[#0047AB]"
            />
          </div>

          <FilterPopover onApply={setFilters} currentFilters={filters} />

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={selectedRows.length === 0}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete {selectedRows.length > 0 && `(${selectedRows.length})`}
            </Button>

            <Button
              onClick={() => setIsAddOpen(true)}
              className="gap-2 bg-[#0047AB] hover:bg-[#003580]"
            >
              Add Data
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          onActionClick={handleActionClick}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <TenantActionModal
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedTenant}
        position={actionPosition}
        onEditClick={handleEditClick}
        onViewDetails={handleViewDetails}
        onChangePlan={handleChangePlan}
        onToggleStatus={handleToggleStatus}
      />

      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        count={selectedRows.length}
      />

      <AddTenantModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={handleAddSuccess}
        existingEmails={existingEmails}
      />

      <EditTenantModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        tenant={selectedTenant}
        onSuccess={handleEditSuccess}
        existingEmails={existingEmails}
      />

      <ChangePlanModal
        open={isChangePlanOpen}
        onClose={() => setIsChangePlanOpen(false)}
        tenant={selectedTenant}
        onSuccess={handleChangePlanSuccess}
      />
    </div>
  )
}