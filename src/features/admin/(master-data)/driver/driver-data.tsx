"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { DriverData } from "@/interface/admin/driver"
import { FilterPopover, FilterValues } from "./filter-popover"
import { ActionModal } from "@/components/action-modal"
import { DeleteConfirmationModal } from "@/components/delete-modal"
import { AddDriverModal } from "./add-modal"
import { EditDriverModal } from "./edit-modal"

interface DriverMasterProps {
  driverItems: DriverData[]
}

const STORAGE_KEY = 'drivers-data'

export default function DriverMaster({ driverItems: initialDriverItems }: DriverMasterProps) {
  const [driverItems, setDriverItems] = useState<DriverData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<DriverData | null>(null)
  const [selectedRows, setSelectedRows] = useState<DriverData[]>([])
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 })
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterValues>({
    licenses: [],
    statuses: [],
    assignmentStatus: 'all'
  })

  useEffect(() => {
    loadDriversData()
  }, [])

  const loadDriversData = () => {
    setIsLoading(true)
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        
        if (parsedData.drivers && Array.isArray(parsedData.drivers)) {
          setDriverItems(parsedData.drivers)
          setDeletedIds(parsedData.deletedIds || [])
        } else {
          setDriverItems(parsedData)
        }
      } else {
        setDriverItems(initialDriverItems)
        saveToStorage(initialDriverItems, [])
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      setDriverItems(initialDriverItems)
      saveToStorage(initialDriverItems, [])
    } finally {
      setIsLoading(false)
    }
  }

  const saveToStorage = (updatedDrivers: DriverData[], updatedDeletedIds?: string[]) => {
    try {
      const dataToSave = {
        drivers: updatedDrivers,
        deletedIds: updatedDeletedIds !== undefined ? updatedDeletedIds : deletedIds
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (error) {
      console.error('Failed to save to storage:', error)
      toast.error("Failed to save data", {
        description: "Your changes may not persist after refresh"
      })
    }
  }

  const activeDriverItems = useMemo(() => {
    return driverItems.filter(item => !deletedIds.includes(item.id))
  }, [driverItems, deletedIds])

  const filteredData = useMemo(() => {
    let result = activeDriverItems

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(driver =>
        driver.id.toLowerCase().includes(query) ||
        driver.name.toLowerCase().includes(query) ||
        driver.simNumber.toLowerCase().includes(query) ||
        driver.phone.toLowerCase().includes(query)
      )
    }

    if (filters.licenses.length > 0) {
      result = result.filter(driver => filters.licenses.includes(driver.license))
    }

    if (filters.statuses.length > 0) {
      result = result.filter(driver => filters.statuses.includes(driver.status))
    }

    if (filters.assignmentStatus === 'assigned') {
      result = result.filter(driver => driver.assignedTruck !== undefined)
    } else if (filters.assignmentStatus === 'unassigned') {
      result = result.filter(driver => driver.assignedTruck === undefined)
    }

    return result
  }, [activeDriverItems, searchQuery, filters])

  const handleActionClick = (driver: DriverData, position: { top: number; left: number }) => {
    setSelectedDriver(driver)
    setActionPosition(position)
    setIsActionOpen(true)
  }

  const handleEditClick = (driver: DriverData) => {
    setSelectedDriver(driver)
    setIsEditOpen(true)
  }

  const handleToggleStatus = (driver: DriverData) => {
    const newStatus = driver.status === 'Active' ? 'Suspended' : 'Active'
    const updatedDriver = { ...driver, status: newStatus as DriverData['status'] }
    
    const updatedDrivers = driverItems.map(d => 
      d.id === driver.id ? updatedDriver : d
    )
    setDriverItems(updatedDrivers)
    saveToStorage(updatedDrivers)
    
    toast.success(`Driver ${newStatus === 'Active' ? 'activated' : 'suspended'} successfully!`, {
      description: `${driver.name} is now ${newStatus.toLowerCase()}`
    })
  }

  const handleSelectionChange = (rows: DriverData[]) => {
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

    saveToStorage(driverItems, updatedDeletedIds)

    toast.success(`${count} driver${count > 1 ? "s" : ""} deleted successfully!`, {
      description: `${count} driver${count > 1 ? "s have" : " has"} been removed from the system`
    })
  }

  const handleAddSuccess = (newDriver: DriverData) => {
    const updatedDrivers = [...driverItems, newDriver]
    setDriverItems(updatedDrivers)
    
    saveToStorage(updatedDrivers)
    
    toast.success("Driver added successfully!", {
      description: `${newDriver.id} - ${newDriver.name} has been added to the system`
    })
  }

  const handleEditSuccess = (updatedDriver: DriverData) => {
    const updatedDrivers = driverItems.map(driver => 
      driver.id === updatedDriver.id ? updatedDriver : driver
    )
    setDriverItems(updatedDrivers)
    
    saveToStorage(updatedDrivers)
    
    toast.success("Driver updated successfully!", {
      description: `${updatedDriver.id} - ${updatedDriver.name} has been updated`
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading drivers data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Driver Master</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by Driver ID, Name, SIM Number, or Phone"
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

      <ActionModal<DriverData>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedDriver}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/admin/driver"
        onToggleStatus={handleToggleStatus}
        statusKey="status"
        activeStatusValue="Active"
      />

      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        count={selectedRows.length}
      />

      <AddDriverModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={handleAddSuccess}
      />

      <EditDriverModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        driver={selectedDriver}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}